// Sends a finished custom-tee order to the FITBOX inbox via Web3Forms.
// Frontend-only: no server. Set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in .env.local.

export interface CustomOrderPayload {
  // Customer
  name: string
  email: string
  phone: string
  address: string
  quantity: number
  // Garment spec
  styleName: string
  colorName: string
  colorHex: string
  blend: 'multiply' | 'screen'
  size: string
  // Text
  textContent: string
  textColor: string
  fontLabel: string
  // Pricing
  unitPrice: string
  total: string
  // Designs (data URLs for uploads, remote URLs for AI, emoji for templates)
  front: { kind: string; value: string }
  back: { kind: string; value: string }
  /** Optional rendered composite preview (data URL). */
  previewDataUrl?: string | null
}

const ENDPOINT = 'https://api.web3forms.com/submit'
const IMGBB_ENDPOINT = 'https://api.imgbb.com/1/upload'

/**
 * Upload a data-URL image to imgbb (free image host) and return its public URL.
 * Web3Forms' free plan can't attach files, so we link hosted images instead.
 * Returns null if no key is configured or the upload fails.
 */
async function hostImage(dataUrl: string, name: string): Promise<string | null> {
  const key = process.env.NEXT_PUBLIC_IMGBB_API_KEY
  if (!key || !dataUrl.startsWith('data:')) return null
  try {
    const base64 = dataUrl.split(',')[1]
    if (!base64) return null
    const fd = new FormData()
    fd.append('image', base64)
    fd.append('name', name)
    const res = await fetch(`${IMGBB_ENDPOINT}?key=${key}`, { method: 'POST', body: fd })
    const json = await res.json()
    return json?.data?.url ?? null
  } catch {
    return null
  }
}

function describeDesign(d: { kind: string; value: string }): string {
  switch (d.kind) {
    case 'upload':
      return 'Customer-uploaded image (attached)'
    case 'ai':
      return `AI-generated: ${d.value}`
    case 'template':
      return `Template graphic: ${d.value}`
    default:
      return 'None'
  }
}

export async function sendCustomOrder(p: CustomOrderPayload): Promise<void> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
  if (!accessKey) {
    throw new Error(
      'Email is not configured yet. Add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY to project/.env.local and restart the dev server.'
    )
  }

  // Host images first (Web3Forms free plan can't attach files).
  const [previewUrl, frontUrl, backUrl] = await Promise.all([
    p.previewDataUrl ? hostImage(p.previewDataUrl, 'order-preview') : Promise.resolve(null),
    p.front.kind === 'upload' ? hostImage(p.front.value, 'front-design') : Promise.resolve(null),
    p.back.kind === 'upload' ? hostImage(p.back.value, 'back-design') : Promise.resolve(null),
  ])

  // For AI designs the value is already a public URL.
  const frontLink = frontUrl ?? (p.front.kind === 'ai' ? p.front.value : null)
  const backLink = backUrl ?? (p.back.kind === 'ai' ? p.back.value : null)
  const linkOrNote = (link: string | null, kind: string) =>
    link ?? (kind === 'upload' ? '(uploaded image — enable image hosting to receive it)' : describeDesign({ kind, value: '' }))

  const fd = new FormData()
  fd.append('access_key', accessKey)
  fd.append('subject', `New custom ${p.styleName} order — ${p.name}`)
  fd.append('from_name', 'FITBOX Custom Studio')
  if (p.email) fd.append('replyto', p.email)

  // Structured, human-readable body.
  const message = [
    '🧵 NEW CUSTOM ORDER',
    '',
    '— CUSTOMER —',
    `Name:     ${p.name}`,
    `Email:    ${p.email}`,
    `Phone:    ${p.phone}`,
    `Address:  ${p.address}`,
    `Quantity: ${p.quantity}`,
    '',
    '— GARMENT —',
    `Style:    ${p.styleName}`,
    `Colour:   ${p.colorName} (${p.colorHex}, blend: ${p.blend})`,
    `Size:     ${p.size}`,
    '',
    '— DESIGN —',
    `Front:    ${describeDesign(p.front)}`,
    `Back:     ${describeDesign(p.back)}`,
    `Text:     ${p.textContent ? `“${p.textContent}” (${p.fontLabel}, ${p.textColor})` : 'None'}`,
    '',
    '— IMAGES —',
    `Preview:      ${previewUrl ?? '(enable image hosting to receive the rendered preview)'}`,
    `Front design: ${linkOrNote(frontLink, p.front.kind)}`,
    `Back design:  ${linkOrNote(backLink, p.back.kind)}`,
    '',
    '— PRICING —',
    `Unit price: ${p.unitPrice}`,
    `Quantity:   ${p.quantity}`,
    `Total:      ${p.total} (× quantity)`,
  ].join('\n')
  fd.append('message', message)

  // Individual fields (also surface in the Web3Forms dashboard).
  fd.append('Customer name', p.name)
  fd.append('Email', p.email)
  fd.append('Phone', p.phone)
  fd.append('Address', p.address)
  fd.append('Quantity', String(p.quantity))
  fd.append('Style', p.styleName)
  fd.append('Colour', `${p.colorName} (${p.colorHex})`)
  fd.append('Size', p.size)
  fd.append('Unit price', p.unitPrice)
  fd.append('Total', p.total)
  if (previewUrl) fd.append('Preview image', previewUrl)
  if (frontLink) fd.append('Front design image', frontLink)
  if (backLink) fd.append('Back design image', backLink)

  const res = await fetch(ENDPOINT, { method: 'POST', body: fd })
  const json = await res.json().catch(() => ({ success: false, message: 'Bad response' }))
  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Failed to send the order email.')
  }
}

/**
 * Best-effort composite preview of the FRONT face: tinted garment mockup +
 * uploaded design + text, rendered to a PNG data URL. Returns null on any
 * failure (e.g. a cross-origin AI image taints the canvas).
 */
export async function renderFrontPreview(opts: {
  mockFront: string
  colorHex: string
  blend: 'multiply' | 'screen'
  frontDesign: { kind: string; value: string }
  text: { content: string; color: string; fontCss: string }
}): Promise<string | null> {
  try {
    const load = (src: string) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = src
      })

    const mock = await load(opts.mockFront)
    const W = Math.min(mock.naturalWidth || 600, 700)
    const scale = W / (mock.naturalWidth || 600)
    const H = Math.round((mock.naturalHeight || 750) * scale)

    const canvas = document.createElement('canvas')
    canvas.width = W
    canvas.height = H
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    // Garment base.
    ctx.drawImage(mock, 0, 0, W, H)
    // Tint clipped to the garment silhouette.
    ctx.globalCompositeOperation = opts.blend
    ctx.fillStyle = opts.colorHex
    ctx.fillRect(0, 0, W, H)
    ctx.globalCompositeOperation = 'destination-in'
    ctx.drawImage(mock, 0, 0, W, H)
    ctx.globalCompositeOperation = 'source-over'

    // Uploaded design centred on the chest.
    if (opts.frontDesign.kind === 'upload' || opts.frontDesign.kind === 'ai') {
      const d = await load(opts.frontDesign.value)
      const dw = W * 0.42
      const dh = (d.naturalHeight / d.naturalWidth) * dw || dw
      ctx.drawImage(d, (W - dw) / 2, H * 0.3, dw, dh)
    } else if (opts.frontDesign.kind === 'template') {
      ctx.font = `${Math.round(W * 0.18)}px serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(opts.frontDesign.value, W / 2, H * 0.42)
    }

    // Text.
    if (opts.text.content) {
      ctx.fillStyle = opts.text.color
      ctx.font = `700 ${Math.round(W * 0.07)}px ${opts.text.fontCss}`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(opts.text.content, W / 2, H * 0.6)
    }

    return canvas.toDataURL('image/png')
  } catch {
    return null
  }
}

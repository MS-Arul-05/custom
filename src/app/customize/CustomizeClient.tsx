'use client'
import { useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  Sparkles, Upload, Type, Eye, Check, ChevronLeft, ChevronRight, Shirt, Wand2, Loader2, Trash2, RotateCw, Send, Mail,
} from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { useAdminStore } from '@/store/admin'
import { formatPrice } from '@/lib/utils'
import { sendCustomOrder, renderFrontPreview } from '@/lib/order'
import {
  BUILDER_STYLES, BUILDER_COLORS, BUILDER_FONTS, DESIGN_TEMPLATES, TEXT_ALIGN, generateAIDesign,
  type BuilderStyle, type BuilderColor, type BuilderFontId, type TextAlign,
} from '@/lib/builder'

type Side = 'front' | 'back' | '360'
type Face = 'front' | 'back'
interface Design { kind: 'none' | 'upload' | 'ai' | 'template'; value: string }
interface Pos { x: number; y: number }

const STEPS = ['Style', 'Colour', 'Design', 'Text', 'Preview', 'Add to cart']
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
const NONE: Design = { kind: 'none', value: '' }

const HEX_RE = /^#([0-9a-fA-F]{6})$/

/** Pick a readable print colour (black/white) for a given garment hex. */
function contrastFor(hex: string): string {
  const m = HEX_RE.exec(hex)
  if (!m) return '#FFFFFF'
  const n = parseInt(m[1], 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  // Perceived luminance (0–255); light garments get dark text and vice-versa.
  const lum = 0.299 * r + 0.587 * g + 0.114 * b
  return lum > 150 ? '#1A1A1A' : '#FFFFFF'
}

export default function CustomizeClient() {
  const router = useRouter()
  const addItem = useCartStore((s) => s.addItem)
  const addOrder = useAdminStore((s) => s.addOrder)

  const [step, setStep] = useState(0)
  const [style, setStyle] = useState<BuilderStyle>(BUILDER_STYLES[0])
  const [color, setColor] = useState<BuilderColor>(BUILDER_COLORS[1]) // Black
  const [frontDesign, setFrontDesign] = useState<Design>(NONE)
  const [backDesign, setBackDesign] = useState<Design>(NONE)
  const [designTarget, setDesignTarget] = useState<Face>('front') // for AI + templates
  const [aiPrompt, setAiPrompt] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [text, setText] = useState({ content: '', fontId: 'heading' as BuilderFontId, color: '#FFFFFF', align: 'center' as TextAlign })
  const [garmentHexInput, setGarmentHexInput] = useState(color.hex)
  const [textHexInput, setTextHexInput] = useState(text.color)

  // Apply a free-form garment colour (from picker or hex field).
  const applyGarmentColor = (hex: string) => {
    setGarmentHexInput(hex)
    if (!HEX_RE.test(hex)) return
    const contrast = contrastFor(hex)
    setColor({ name: hex.toUpperCase(), hex, contrast })
    setText((t) => ({ ...t, color: contrast }))
    setTextHexInput(contrast)
  }

  // Apply a free-form text colour.
  const applyTextColor = (hex: string) => {
    setTextHexInput(hex)
    if (!HEX_RE.test(hex)) return
    setText((t) => ({ ...t, color: hex }))
  }
  const [side, setSide] = useState<Side>('front')
  const [rotation, setRotation] = useState(0)
  const [size, setSize] = useState('M')
  const [added, setAdded] = useState(false)

  // Custom-order email form
  const [order, setOrder] = useState({ name: '', email: '', phone: '', address: '', quantity: 1 })
  const [sending, setSending] = useState(false)
  const [sendStatus, setSendStatus] = useState<{ ok: boolean; msg: string } | null>(null)

  const [frontPos, setFrontPos] = useState<Pos>({ x: 50, y: 42 })
  const [backPos, setBackPos] = useState<Pos>({ x: 50, y: 42 })
  const [textPos, setTextPos] = useState<Pos>({ x: 50, y: 70 })
  const canvasRef = useRef<HTMLDivElement>(null)
  const dragLayer = useRef<'design' | 'text' | 'rotate' | null>(null)
  const rotateRef = useRef<{ startX: number; startRot: number }>({ startX: 0, startRot: 0 })

  const hasFront = frontDesign.kind !== 'none'
  const hasBack = backDesign.kind !== 'none'
  const hasText = text.content.trim().length > 0
  const price = style.basePrice

  const setDesignFor = (target: Face, d: Design) => (target === 'front' ? setFrontDesign(d) : setBackDesign(d))

  // ---- dragging / rotating ----
  const onPointerMove = useCallback((e: PointerEvent) => {
    if (dragLayer.current === 'rotate') {
      const dx = e.clientX - rotateRef.current.startX
      setRotation(rotateRef.current.startRot + dx * 0.8)
      return
    }
    if (!dragLayer.current || !canvasRef.current) return
    const r = canvasRef.current.getBoundingClientRect()
    const x = Math.min(92, Math.max(8, ((e.clientX - r.left) / r.width) * 100))
    const y = Math.min(92, Math.max(8, ((e.clientY - r.top) / r.height) * 100))
    if (dragLayer.current === 'design') (side === 'back' ? setBackPos : setFrontPos)({ x, y })
    else if (dragLayer.current === 'text') setTextPos({ x, y })
  }, [side])

  const stopDrag = useCallback(() => {
    dragLayer.current = null
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', stopDrag)
  }, [onPointerMove])

  const startDrag = (layer: 'design' | 'text') => (e: React.PointerEvent) => {
    if (side === '360') return
    e.preventDefault()
    e.stopPropagation()
    dragLayer.current = layer
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', stopDrag)
  }

  const startRotate = (e: React.PointerEvent) => {
    if (side !== '360') return
    e.preventDefault()
    dragLayer.current = 'rotate'
    rotateRef.current = { startX: e.clientX, startRot: rotation }
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', stopDrag)
  }

  const onUploadFor = (target: Face) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setDesignFor(target, { kind: 'upload', value: reader.result as string })
      setSide(target)
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const runAI = async () => {
    if (!aiPrompt.trim()) return
    setAiLoading(true)
    const url = await generateAIDesign(aiPrompt)
    setDesignFor(designTarget, { kind: 'ai', value: url })
    setSide(designTarget)
    setAiLoading(false)
  }

  const handleAddToCart = () => {
    const bits = [style.name, color.name]
    if (hasFront) bits.push('front print')
    if (hasBack) bits.push('back print')
    if (hasText) bits.push(`“${text.content}”`)
    addItem({
      kind: 'custom',
      productId: `custom-${style.id}-${color.name}`.toLowerCase(),
      name: `Custom ${style.name}`,
      price,
      size,
      color: color.name,
      image: frontDesign.kind === 'upload' || frontDesign.kind === 'ai' ? frontDesign.value : style.mockFront,
      meta: { summary: bits.join(' · ') },
    })
    setAdded(true)
    setTimeout(() => router.push('/cart'), 900)
  }

  const handleSendOrder = async () => {
    if (!order.name || !order.phone || !order.address) {
      setSendStatus({ ok: false, msg: 'Please fill in name, phone and address.' })
      return
    }
    setSending(true)
    setSendStatus(null)
    try {
      const previewDataUrl = await renderFrontPreview({
        mockFront: style.mockFront,
        colorHex: color.hex,
        blend: style.blend,
        frontDesign,
        text: { content: text.content, color: text.color, fontCss: BUILDER_FONTS.find((f) => f.id === text.fontId)?.css ?? 'sans-serif' },
      })
      await sendCustomOrder({
        name: order.name,
        email: order.email,
        phone: order.phone,
        address: order.address,
        quantity: order.quantity,
        styleName: style.name,
        colorName: color.name,
        colorHex: color.hex,
        blend: style.blend,
        size,
        textContent: text.content,
        textColor: text.color,
        fontLabel: BUILDER_FONTS.find((f) => f.id === text.fontId)?.label ?? '',
        unitPrice: formatPrice(price),
        total: formatPrice(price * order.quantity),
        front: frontDesign,
        back: backDesign,
        previewDataUrl,
      })
      // Record for the admin dashboard.
      addOrder({
        source: 'custom',
        customer: { name: order.name, email: order.email, phone: order.phone, address: order.address },
        summary: `Custom ${style.name} · ${color.name}${text.content ? ` · “${text.content}”` : ''} · ${size}`,
        quantity: order.quantity,
        total: price * order.quantity,
        preview: previewDataUrl ?? undefined,
      })
      setSendStatus({ ok: true, msg: 'Order sent! We’ll get back to you shortly.' })
    } catch (err) {
      setSendStatus({ ok: false, msg: err instanceof Error ? err.message : 'Could not send the order.' })
    } finally {
      setSending(false)
    }
  }

  // ---- garment preview ----
  const maskStyle = (src: string): React.CSSProperties => ({
    WebkitMaskImage: `url("${src}")`,
    maskImage: `url("${src}")`,
    WebkitMaskSize: 'contain',
    maskSize: 'contain',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
  })

  const renderFace = (face: Face, interactive: boolean) => {
    const src = face === 'front' ? style.mockFront : style.mockBack
    const design = face === 'front' ? frontDesign : backDesign
    const pos = face === 'front' ? frontPos : backPos
    return (
      <div className="absolute inset-0" style={{ isolation: 'isolate' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={`${style.name} ${face}`} className="absolute inset-0 w-full h-full object-contain" draggable={false} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: color.hex, mixBlendMode: style.blend, ...maskStyle(src) }} />

        {design.kind !== 'none' && (
          <div
            onPointerDown={interactive ? startDrag('design') : undefined}
            className={`absolute w-[34%] aspect-square -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${interactive ? 'cursor-grab active:cursor-grabbing' : ''}`}
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          >
            {design.kind === 'template' ? (
              <span className="text-6xl leading-none" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))' }}>{design.value}</span>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={design.value} alt="Your design" className="w-full h-full object-contain pointer-events-none" draggable={false} />
            )}
          </div>
        )}

        {face === 'front' && hasText && (
          <div
            onPointerDown={interactive ? startDrag('text') : undefined}
            className={`absolute -translate-x-1/2 -translate-y-1/2 px-2 max-w-[80%] ${interactive ? 'cursor-grab active:cursor-grabbing' : ''}`}
            style={{ left: `${textPos.x}%`, top: `${textPos.y}%` }}
          >
            <p className="font-extrabold leading-tight break-words" style={{ color: text.color, fontFamily: BUILDER_FONTS.find((f) => f.id === text.fontId)?.css, textAlign: text.align, fontSize: '22px' }}>
              {text.content}
            </p>
          </div>
        )}
      </div>
    )
  }

  const staticFace: Face = side === 'back' ? 'back' : 'front'

  const Garment = (
    <div
      ref={canvasRef}
      onPointerDown={side === '360' ? startRotate : undefined}
      className={`relative w-full max-w-[360px] aspect-[4/5] mx-auto select-none touch-none ${side === '360' ? 'cursor-ew-resize' : ''}`}
      style={{ perspective: '1100px' }}
    >
      <span className="absolute top-2 left-2 z-10 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-badge" style={{ background: 'var(--bg-dark)', color: '#fff' }}>
        {side === '360' ? `360° · ${Math.round(((rotation % 360) + 360) % 360)}°` : side}
      </span>

      {side === '360' ? (
        <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d', transform: `rotateY(${rotation}deg)` }}>
          <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>{renderFace('front', false)}</div>
          <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>{renderFace('back', false)}</div>
        </div>
      ) : (
        renderFace(staticFace, true)
      )}
    </div>
  )

  // Reusable front/back/360 switcher
  const ViewToggle = (
    <div className="flex gap-2 justify-center">
      {(['front', 'back', '360'] as Side[]).map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => setSide(s)}
          className="flex items-center gap-1.5 px-4 h-9 rounded-btn text-sm font-bold capitalize transition-colors"
          style={{
            border: `2px solid ${side === s ? 'var(--accent)' : 'var(--border)'}`,
            background: side === s ? 'var(--accent-light)' : 'var(--bg-surface)',
            color: side === s ? 'var(--accent)' : 'var(--text-primary)',
          }}
        >
          {s === '360' && <RotateCw size={14} />} {s}
        </button>
      ))}
    </div>
  )

  const canNext = step === 0 ? !!style : true

  // ---- upload dropzone ----
  const renderUploadZone = (face: Face, design: Design) => (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-semibold capitalize" style={{ color: 'var(--text-primary)' }}>{face} design</p>
        {design.kind !== 'none' && (
          <button type="button" onClick={() => setDesignFor(face, NONE)} className="flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--error)' }}>
            <Trash2 size={12} /> Remove
          </button>
        )}
      </div>
      <label className="flex items-center justify-center gap-2 h-20 rounded-card border-2 border-dashed cursor-pointer text-sm font-semibold overflow-hidden relative" style={{ borderColor: design.kind !== 'none' ? 'var(--accent)' : 'var(--border)', color: 'var(--text-secondary)' }}>
        {design.kind === 'upload' || design.kind === 'ai' ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={design.value} alt={`${face} design`} className="h-full object-contain" />
        ) : design.kind === 'template' ? (
          <span className="text-3xl">{design.value}</span>
        ) : (
          <><Upload size={16} /> Upload {face} image</>
        )}
        <input type="file" accept="image/*" onChange={onUploadFor(face)} className="hidden" />
      </label>
    </div>
  )

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] mb-2" style={{ color: 'var(--accent)' }}>
          <Sparkles size={14} /> Custom builder
        </span>
        <h1 className="font-heading font-extrabold tracking-tight" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--text-primary)' }}>
          Design your own fit
        </h1>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-1 sm:gap-2 mb-8 overflow-x-auto no-scrollbar pb-1">
        {STEPS.map((label, i) => (
          <button key={label} type="button" onClick={() => i <= step && setStep(i)} className="flex items-center gap-2 shrink-0" disabled={i > step}>
            <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors" style={{ background: i < step ? 'var(--success)' : i === step ? 'var(--accent)' : 'var(--bg-surface)', color: i <= step ? '#fff' : 'var(--text-tertiary)', border: i > step ? '1px solid var(--border)' : 'none' }}>
              {i < step ? <Check size={14} /> : i + 1}
            </span>
            <span className="text-sm font-semibold hidden sm:inline" style={{ color: i === step ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{label}</span>
            {i < STEPS.length - 1 && <ChevronRight size={14} className="hidden sm:inline" style={{ color: 'var(--text-tertiary)' }} />}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_440px] gap-10">
        {/* Controls */}
        <div className="order-2 lg:order-1">
          {/* Step 0 — Style */}
          {step === 0 && (
            <Panel title="Pick a style" icon={Shirt}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {BUILDER_STYLES.map((s) => (
                  <button key={s.id} type="button" onClick={() => setStyle(s)} className="rounded-card p-4 text-left transition-all" style={{ border: `2px solid ${style.id === s.id ? 'var(--accent)' : 'var(--border)'}`, background: style.id === s.id ? 'var(--accent-light)' : 'var(--bg-surface)' }}>
                    <Shirt size={22} style={{ color: 'var(--accent)' }} />
                    <p className="text-sm font-bold mt-2" style={{ color: 'var(--text-primary)' }}>{s.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{s.fabric}</p>
                    <p className="text-sm font-bold mt-1" style={{ color: 'var(--accent)' }}>{formatPrice(s.basePrice)}</p>
                  </button>
                ))}
              </div>
            </Panel>
          )}

          {/* Step 1 — Colour */}
          {step === 1 && (
            <Panel title="Choose a colour" icon={Sparkles}>
              <div className="flex flex-wrap gap-3">
                {BUILDER_COLORS.map((c) => (
                  <button key={c.name} type="button" onClick={() => { setColor(c); setGarmentHexInput(c.hex); setText((t) => ({ ...t, color: c.contrast })); setTextHexInput(c.contrast) }} className="flex flex-col items-center gap-2">
                    <span className="w-14 h-14 rounded-full" style={{ background: c.hex, border: '1px solid rgba(0,0,0,0.15)', outline: color.hex.toLowerCase() === c.hex.toLowerCase() ? '2px solid var(--accent)' : '2px solid transparent', outlineOffset: '2px' }} />
                    <span className="text-xs font-semibold" style={{ color: color.hex.toLowerCase() === c.hex.toLowerCase() ? 'var(--accent)' : 'var(--text-secondary)' }}>{c.name}</span>
                  </button>
                ))}
              </div>

              {/* Custom garment colour */}
              <div className="mt-6 pt-5 border-t" style={{ borderColor: 'var(--border)' }}>
                <p className="text-xs font-bold uppercase tracking-wide mb-2.5" style={{ color: 'var(--text-secondary)' }}>Custom colour</p>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    aria-label="Pick a custom garment colour"
                    value={HEX_RE.test(garmentHexInput) ? garmentHexInput : color.hex}
                    onChange={(e) => applyGarmentColor(e.target.value)}
                    className="w-12 h-12 rounded-btn cursor-pointer bg-transparent p-0"
                    style={{ border: '1px solid var(--border)' }}
                  />
                  <input
                    type="text"
                    aria-label="Garment colour hex code"
                    value={garmentHexInput}
                    onChange={(e) => applyGarmentColor(e.target.value.startsWith('#') ? e.target.value : `#${e.target.value}`)}
                    placeholder="#633E33"
                    maxLength={7}
                    className="w-32 h-12 px-3 rounded-btn text-sm font-mono uppercase outline-none"
                    style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                  />
                  <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Enter any hex, e.g. #1A1A1A</span>
                </div>
              </div>
            </Panel>
          )}

          {/* Step 2 — Design (front + back) */}
          {step === 2 && (
            <Panel title="Add a design" icon={Upload}>
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  {renderUploadZone('front', frontDesign)}
                  {renderUploadZone('back', backDesign)}
                </div>

                {/* Target toggle for AI + templates */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>Apply AI / template to</span>
                  <div className="flex gap-2">
                    {(['front', 'back'] as Face[]).map((f) => (
                      <button key={f} type="button" onClick={() => setDesignTarget(f)} className="px-3 h-8 rounded-btn text-xs font-bold capitalize" style={{ border: `2px solid ${designTarget === f ? 'var(--accent)' : 'var(--border)'}`, background: designTarget === f ? 'var(--accent-light)' : 'var(--bg-surface)', color: designTarget === f ? 'var(--accent)' : 'var(--text-primary)' }}>
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-2 flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
                    <Wand2 size={15} style={{ color: 'var(--accent)' }} /> Generate with AI
                  </p>
                  <div className="flex gap-2">
                    <input value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} placeholder="e.g. a neon tiger in chrome" aria-label="AI design prompt" className="flex-1 h-11 px-4 rounded-btn text-sm outline-none" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                    <button type="button" onClick={runAI} disabled={aiLoading} className="h-11 px-5 rounded-btn text-white text-sm font-bold flex items-center gap-2 disabled:opacity-60" style={{ background: 'var(--accent)' }}>
                      {aiLoading ? <Loader2 size={15} className="animate-spin" /> : <Wand2 size={15} />}
                      {aiLoading ? 'Generating…' : 'Generate'}
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Or pick a template</p>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {DESIGN_TEMPLATES.map((t) => {
                      const cur = designTarget === 'front' ? frontDesign : backDesign
                      const sel = cur.kind === 'template' && cur.value === t.emoji
                      return (
                        <button key={t.id} type="button" onClick={() => { setDesignFor(designTarget, { kind: 'template', value: t.emoji }); setSide(designTarget) }} className="aspect-square rounded-card flex items-center justify-center text-2xl transition-all" style={{ background: 'var(--bg-surface)', border: `2px solid ${sel ? 'var(--accent)' : 'var(--border)'}` }} title={t.label}>
                          {t.emoji}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </Panel>
          )}

          {/* Step 3 — Text */}
          {step === 3 && (
            <Panel title="Add text" icon={Type}>
              <div className="space-y-5">
                <input value={text.content} onChange={(e) => setText((t) => ({ ...t, content: e.target.value }))} placeholder="Your text…" aria-label="Custom text" maxLength={24} className="w-full h-12 px-4 rounded-btn text-base outline-none" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: 'var(--text-secondary)' }}>Font</p>
                  <div className="flex flex-wrap gap-2">
                    {BUILDER_FONTS.map((f) => (
                      <button key={f.id} type="button" onClick={() => setText((t) => ({ ...t, fontId: f.id }))} className="px-4 h-10 rounded-btn text-sm font-bold" style={{ fontFamily: f.css, border: `2px solid ${text.fontId === f.id ? 'var(--accent)' : 'var(--border)'}`, color: 'var(--text-primary)', background: 'var(--bg-surface)' }}>
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-8">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: 'var(--text-secondary)' }}>Colour</p>
                    <div className="flex gap-2 items-center">
                      {['#FFFFFF', '#1A1A1A', '#FF6B00', '#FFB400', '#2B4C7E', '#B3261E', '#633E33'].map((c) => (
                        <button key={c} type="button" onClick={() => { setText((t) => ({ ...t, color: c })); setTextHexInput(c) }} aria-label={`Text colour ${c}`} className="w-8 h-8 rounded-full" style={{ background: c, border: '1px solid rgba(0,0,0,0.2)', outline: text.color.toLowerCase() === c.toLowerCase() ? '2px solid var(--accent)' : 'none', outlineOffset: '2px' }} />
                      ))}
                      <input
                        type="color"
                        aria-label="Pick a custom text colour"
                        value={HEX_RE.test(textHexInput) ? textHexInput : text.color}
                        onChange={(e) => applyTextColor(e.target.value)}
                        className="w-8 h-8 rounded-full cursor-pointer bg-transparent p-0"
                        style={{ border: '1px solid rgba(0,0,0,0.2)' }}
                      />
                    </div>
                    <input
                      type="text"
                      aria-label="Text colour hex code"
                      value={textHexInput}
                      onChange={(e) => applyTextColor(e.target.value.startsWith('#') ? e.target.value : `#${e.target.value}`)}
                      placeholder="#633E33"
                      maxLength={7}
                      className="w-28 h-9 px-3 mt-2 rounded-btn text-xs font-mono uppercase outline-none"
                      style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: 'var(--text-secondary)' }}>Align</p>
                    <div className="flex gap-2">
                      {TEXT_ALIGN.map((a) => (
                        <button key={a} type="button" onClick={() => setText((t) => ({ ...t, align: a }))} className="px-3 h-8 rounded-btn text-xs font-bold capitalize" style={{ border: `2px solid ${text.align === a ? 'var(--accent)' : 'var(--border)'}`, color: 'var(--text-primary)' }}>
                          {a}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Text prints on the front. Drag it on the preview to reposition.</p>
              </div>
            </Panel>
          )}

          {/* Step 4 — Preview */}
          {step === 4 && (
            <Panel title="Live preview" icon={Eye}>
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                Drag the design and text on the mockup to position them. Use the <b>Front / Back / 360°</b> switch under
                the preview — in 360° mode, drag the garment left/right or use the slider to rotate it manually.
              </p>
              {ViewToggle}
            </Panel>
          )}

          {/* Step 5 — Add to cart */}
          {step === 5 && (
            <Panel title="Pick size & add to cart" icon={Check}>
              <p className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: 'var(--text-secondary)' }}>Size</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {SIZES.map((s) => (
                  <button key={s} type="button" onClick={() => setSize(s)} className="h-11 min-w-[48px] px-3 rounded-btn text-sm font-bold" style={{ border: `2px solid ${size === s ? 'var(--accent)' : 'var(--border)'}`, background: size === s ? 'var(--accent-light)' : 'var(--bg-surface)', color: size === s ? 'var(--accent)' : 'var(--text-primary)' }}>
                    {s}
                  </button>
                ))}
              </div>
              <div className="rounded-card p-4 mb-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
                <Row label="Style" value={style.name} />
                <Row label="Colour" value={color.name} />
                <Row label="Front print" value={hasFront ? (frontDesign.kind === 'template' ? `${frontDesign.value} graphic` : 'Custom image') : 'None'} />
                <Row label="Back print" value={hasBack ? (backDesign.kind === 'template' ? `${backDesign.value} graphic` : 'Custom image') : 'None'} />
                <Row label="Text" value={hasText ? `“${text.content}”` : 'None'} />
                <Row label="Size" value={size} />
                <div className="flex justify-between pt-3 mt-1 border-t text-base font-bold" style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
                  <span>Total</span><span>{formatPrice(price)}</span>
                </div>
              </div>
              <button type="button" onClick={handleAddToCart} className="w-full h-12 rounded-btn text-white text-sm font-bold flex items-center justify-center gap-2" style={{ background: added ? 'var(--success)' : 'var(--accent)' }}>
                {added ? <><Check size={16} /> Added! Taking you to cart…</> : <>Add to cart · {formatPrice(price)}</>}
              </button>

              {/* Email this custom order to FITBOX */}
              <div className="mt-7 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
                <p className="text-sm font-bold flex items-center gap-2 mb-1" style={{ color: 'var(--text-primary)' }}>
                  <Mail size={16} style={{ color: 'var(--accent)' }} /> Order direct (email us your design)
                </p>
                <p className="text-xs mb-4" style={{ color: 'var(--text-tertiary)' }}>
                  Send your design, preview and details straight to our studio and we’ll confirm by email.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input value={order.name} onChange={(e) => setOrder((o) => ({ ...o, name: e.target.value }))} placeholder="Full name *" aria-label="Full name" className="h-11 px-4 rounded-btn text-sm outline-none" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                  <input value={order.phone} onChange={(e) => setOrder((o) => ({ ...o, phone: e.target.value }))} placeholder="Phone number *" aria-label="Phone number" inputMode="tel" className="h-11 px-4 rounded-btn text-sm outline-none" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                  <input value={order.email} onChange={(e) => setOrder((o) => ({ ...o, email: e.target.value }))} placeholder="Your email (for reply)" aria-label="Your email" type="email" className="h-11 px-4 rounded-btn text-sm outline-none" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                  <input value={order.quantity} onChange={(e) => setOrder((o) => ({ ...o, quantity: Math.max(1, Number(e.target.value) || 1) }))} placeholder="Quantity" aria-label="Quantity" type="number" min={1} className="h-11 px-4 rounded-btn text-sm outline-none" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                  <textarea value={order.address} onChange={(e) => setOrder((o) => ({ ...o, address: e.target.value }))} placeholder="Delivery address *" aria-label="Delivery address" rows={2} className="sm:col-span-2 px-4 py-3 rounded-btn text-sm outline-none resize-none" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
                </div>
                {sendStatus && (
                  <p className="text-xs font-semibold rounded-btn px-3 py-2 mt-3" style={{ background: sendStatus.ok ? 'rgba(46,158,58,0.1)' : 'rgba(179,38,30,0.1)', color: sendStatus.ok ? 'var(--success)' : '#B3261E' }}>
                    {sendStatus.msg}
                  </p>
                )}
                <button type="button" onClick={handleSendOrder} disabled={sending} className="w-full h-12 mt-3 rounded-btn text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-60" style={{ background: 'var(--bg-dark)', color: '#fff' }}>
                  {sending ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : <><Send size={16} /> Email my order to FITBOX</>}
                </button>
              </div>
            </Panel>
          )}

          {/* Nav */}
          <div className="flex items-center justify-between mt-8">
            <button type="button" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="flex items-center gap-1.5 h-11 px-5 rounded-btn text-sm font-bold disabled:opacity-40" style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
              <ChevronLeft size={16} /> Back
            </button>
            {step < STEPS.length - 1 && (
              <button type="button" onClick={() => canNext && setStep((s) => Math.min(STEPS.length - 1, s + 1))} className="flex items-center gap-1.5 h-11 px-6 rounded-btn text-white text-sm font-bold" style={{ background: 'var(--accent)' }}>
                Next <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Preview */}
        <div className="order-1 lg:order-2">
          <div className="lg:sticky lg:top-20 rounded-modal p-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
            <div className="rounded-card py-6" style={{ background: 'var(--bg-primary)' }}>
              {Garment}
            </div>

            {/* Always-visible view controls */}
            <div className="mt-4">{ViewToggle}</div>
            {side === '360' && (
              <div className="mt-3 flex items-center gap-3">
                <RotateCw size={15} style={{ color: 'var(--text-secondary)' }} />
                <input type="range" min={0} max={360} value={Math.round(((rotation % 360) + 360) % 360)} onChange={(e) => setRotation(Number(e.target.value))} className="flex-1 accent-[var(--accent)]" aria-label="Rotate garment" />
                <span className="text-xs font-semibold w-9 text-right" style={{ color: 'var(--text-secondary)' }}>{Math.round(((rotation % 360) + 360) % 360)}°</span>
              </div>
            )}

            <div className="flex items-center justify-between mt-4 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
              <div>
                <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Custom {style.name}</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{color.name} · {style.fabric}</p>
              </div>
              <p className="font-heading font-extrabold text-2xl" style={{ color: 'var(--accent)' }}>{formatPrice(price)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Panel({ title, icon: Icon, children }: { title: string; icon: typeof Shirt; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-heading font-bold text-xl mb-5 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
        <Icon size={20} style={{ color: 'var(--accent)' }} /> {title}
      </h2>
      {children}
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm py-1">
      <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
      <span className="font-semibold text-right max-w-[60%] truncate" style={{ color: 'var(--text-primary)' }}>{value}</span>
    </div>
  )
}

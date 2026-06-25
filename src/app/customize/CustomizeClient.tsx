'use client'
import { useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  Sparkles, Upload, Type, Eye, Check, ChevronLeft, ChevronRight, Shirt, Wand2, Loader2, Trash2, RotateCw,
} from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { formatPrice } from '@/lib/utils'
import {
  BUILDER_STYLES, BUILDER_COLORS, BUILDER_FONTS, DESIGN_TEMPLATES, TEXT_ALIGN, CUSTOM_PRINT_FEE, generateAIDesign,
  type BuilderStyle, type BuilderColor, type BuilderFontId, type TextAlign,
} from '@/lib/builder'

type Side = 'front' | 'back' | '360'
interface Design { kind: 'none' | 'upload' | 'ai' | 'template'; value: string }
interface Pos { x: number; y: number }

const STEPS = ['Style', 'Colour', 'Design', 'Text', 'Preview', 'Add to cart']
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

export default function CustomizeClient() {
  const router = useRouter()
  const addItem = useCartStore((s) => s.addItem)

  const [step, setStep] = useState(0)
  const [style, setStyle] = useState<BuilderStyle>(BUILDER_STYLES[0])
  const [color, setColor] = useState<BuilderColor>(BUILDER_COLORS[1]) // Black
  const [design, setDesign] = useState<Design>({ kind: 'none', value: '' })
  const [aiPrompt, setAiPrompt] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [text, setText] = useState({ content: '', fontId: 'heading' as BuilderFontId, color: '#FFFFFF', align: 'center' as TextAlign })
  const [side, setSide] = useState<Side>('front')
  const [size, setSize] = useState('M')
  const [added, setAdded] = useState(false)

  const [designPos, setDesignPos] = useState<Pos>({ x: 50, y: 42 })
  const [textPos, setTextPos] = useState<Pos>({ x: 50, y: 70 })
  const canvasRef = useRef<HTMLDivElement>(null)
  const dragLayer = useRef<'design' | 'text' | null>(null)

  const hasDesign = design.kind !== 'none'
  const hasText = text.content.trim().length > 0
  const printFee = hasDesign || hasText ? CUSTOM_PRINT_FEE : 0
  const price = style.basePrice + printFee

  // ---- dragging ----
  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!dragLayer.current || !canvasRef.current) return
    const r = canvasRef.current.getBoundingClientRect()
    const x = Math.min(92, Math.max(8, ((e.clientX - r.left) / r.width) * 100))
    const y = Math.min(92, Math.max(8, ((e.clientY - r.top) / r.height) * 100))
    if (dragLayer.current === 'design') setDesignPos({ x, y })
    else setTextPos({ x, y })
  }, [])

  const stopDrag = useCallback(() => {
    dragLayer.current = null
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', stopDrag)
  }, [onPointerMove])

  const startDrag = (layer: 'design' | 'text') => (e: React.PointerEvent) => {
    if (side === '360') return
    e.preventDefault()
    dragLayer.current = layer
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', stopDrag)
  }

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setDesign({ kind: 'upload', value: reader.result as string })
    reader.readAsDataURL(file)
  }

  const runAI = async () => {
    if (!aiPrompt.trim()) return
    setAiLoading(true)
    const url = await generateAIDesign(aiPrompt)
    setDesign({ kind: 'ai', value: url })
    setAiLoading(false)
  }

  const handleAddToCart = () => {
    const summaryBits = [style.name, color.name]
    if (hasDesign) summaryBits.push(design.kind === 'template' ? `${design.value} graphic` : 'custom print')
    if (hasText) summaryBits.push(`“${text.content}”`)
    addItem({
      kind: 'custom',
      productId: `custom-${style.id}-${color.name}`.toLowerCase(),
      name: `Custom ${style.name}`,
      price,
      size,
      color: color.name,
      image: design.kind === 'upload' || design.kind === 'ai' ? design.value : style.image,
      meta: { summary: summaryBits.join(' · ') },
    })
    setAdded(true)
    setTimeout(() => router.push('/cart'), 900)
  }

  const canNext = step === 0 ? !!style : true

  // ---- garment preview ----
  const Garment = (
    <div
      ref={canvasRef}
      className="relative w-full max-w-[360px] aspect-[4/5] mx-auto select-none touch-none"
      style={side === '360' ? { animation: 'fitbox-spin-y 6s linear infinite', transformStyle: 'preserve-3d' } : undefined}
    >
      {/* Shirt body */}
      <div className="absolute inset-x-[10%] top-[12%] bottom-[4%] rounded-[28px] shadow-inner" style={{ background: color.hex, border: '1px solid rgba(0,0,0,0.12)' }} />
      {/* Sleeves */}
      <div className="absolute left-0 top-[12%] w-[20%] h-[26%] rounded-l-[20px] rounded-tr-[10px]" style={{ background: color.hex, border: '1px solid rgba(0,0,0,0.12)' }} />
      <div className="absolute right-0 top-[12%] w-[20%] h-[26%] rounded-r-[20px] rounded-tl-[10px]" style={{ background: color.hex, border: '1px solid rgba(0,0,0,0.12)' }} />
      {/* Collar */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[10%] w-[26%] h-[7%] rounded-b-full" style={{ background: 'rgba(0,0,0,0.12)' }} />

      {/* Side tag */}
      <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-badge" style={{ background: 'var(--bg-dark)', color: '#fff' }}>
        {side === '360' ? '360°' : side}
      </span>

      {/* Design layer (front only, or back) */}
      {hasDesign && side !== 'back' && (
        <div
          onPointerDown={startDrag('design')}
          className="absolute w-[34%] aspect-square -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing flex items-center justify-center"
          style={{ left: `${designPos.x}%`, top: `${designPos.y}%` }}
        >
          {design.kind === 'template' ? (
            <span className="text-6xl leading-none" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))' }}>{design.value}</span>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={design.value} alt="Your design" className="w-full h-full object-contain pointer-events-none" />
          )}
        </div>
      )}

      {/* Text layer */}
      {hasText && side !== 'back' && (
        <div
          onPointerDown={startDrag('text')}
          className="absolute -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing px-2 max-w-[80%]"
          style={{ left: `${textPos.x}%`, top: `${textPos.y}%` }}
        >
          <p
            className="font-extrabold leading-tight break-words"
            style={{ color: text.color, fontFamily: BUILDER_FONTS.find((f) => f.id === text.fontId)?.css, textAlign: text.align, fontSize: '22px' }}
          >
            {text.content}
          </p>
        </div>
      )}

      {side === 'back' && (hasDesign || hasText) && (
        <p className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-xs" style={{ color: color.contrast, opacity: 0.5 }}>
          Back · add a back print on the design step
        </p>
      )}
    </div>
  )

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
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
          <button
            key={label}
            type="button"
            onClick={() => i <= step && setStep(i)}
            className="flex items-center gap-2 shrink-0"
            disabled={i > step}
          >
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors"
              style={{
                background: i < step ? 'var(--success)' : i === step ? 'var(--accent)' : 'var(--bg-surface)',
                color: i <= step ? '#fff' : 'var(--text-tertiary)',
                border: i > step ? '1px solid var(--border)' : 'none',
              }}
            >
              {i < step ? <Check size={14} /> : i + 1}
            </span>
            <span className="text-sm font-semibold hidden sm:inline" style={{ color: i === step ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
              {label}
            </span>
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
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setStyle(s)}
                    className="rounded-card p-4 text-left transition-all"
                    style={{
                      border: `2px solid ${style.id === s.id ? 'var(--accent)' : 'var(--border)'}`,
                      background: style.id === s.id ? 'var(--accent-light)' : 'var(--bg-surface)',
                    }}
                  >
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
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => { setColor(c); setText((t) => ({ ...t, color: c.contrast })) }}
                    className="flex flex-col items-center gap-2"
                  >
                    <span
                      className="w-14 h-14 rounded-full"
                      style={{ background: c.hex, border: '1px solid rgba(0,0,0,0.15)', outline: color.name === c.name ? '2px solid var(--accent)' : '2px solid transparent', outlineOffset: '2px' }}
                    />
                    <span className="text-xs font-semibold" style={{ color: color.name === c.name ? 'var(--accent)' : 'var(--text-secondary)' }}>{c.name}</span>
                  </button>
                ))}
              </div>
            </Panel>
          )}

          {/* Step 2 — Design */}
          {step === 2 && (
            <Panel title="Add a design" icon={Upload}>
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Upload art or logo</p>
                  <label className="flex items-center justify-center gap-2 h-24 rounded-card border-2 border-dashed cursor-pointer text-sm font-semibold" style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                    <Upload size={18} /> Drop an image or click to upload
                    <input type="file" accept="image/*" onChange={onUpload} className="hidden" />
                  </label>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-2 flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
                    <Wand2 size={15} style={{ color: 'var(--accent)' }} /> Generate with AI
                  </p>
                  <div className="flex gap-2">
                    <input
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="e.g. a neon tiger in chrome"
                      aria-label="AI design prompt"
                      className="flex-1 h-11 px-4 rounded-btn text-sm outline-none"
                      style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                    />
                    <button type="button" onClick={runAI} disabled={aiLoading} className="h-11 px-5 rounded-btn text-white text-sm font-bold flex items-center gap-2 disabled:opacity-60" style={{ background: 'var(--accent)' }}>
                      {aiLoading ? <Loader2 size={15} className="animate-spin" /> : <Wand2 size={15} />}
                      {aiLoading ? 'Generating…' : 'Generate'}
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Or pick a template</p>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {DESIGN_TEMPLATES.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setDesign({ kind: 'template', value: t.emoji })}
                        className="aspect-square rounded-card flex items-center justify-center text-2xl transition-all"
                        style={{ background: 'var(--bg-surface)', border: `2px solid ${design.kind === 'template' && design.value === t.emoji ? 'var(--accent)' : 'var(--border)'}` }}
                        title={t.label}
                      >
                        {t.emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {hasDesign && (
                  <button type="button" onClick={() => setDesign({ kind: 'none', value: '' })} className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--error)' }}>
                    <Trash2 size={14} /> Remove design
                  </button>
                )}
              </div>
            </Panel>
          )}

          {/* Step 3 — Text */}
          {step === 3 && (
            <Panel title="Add text" icon={Type}>
              <div className="space-y-5">
                <input
                  value={text.content}
                  onChange={(e) => setText((t) => ({ ...t, content: e.target.value }))}
                  placeholder="Your text…"
                  aria-label="Custom text"
                  maxLength={24}
                  className="w-full h-12 px-4 rounded-btn text-base outline-none"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                />
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
                    <div className="flex gap-2">
                      {['#FFFFFF', '#1A1A1A', '#FF6B00', '#FFB400', '#2B4C7E', '#B3261E'].map((c) => (
                        <button key={c} type="button" onClick={() => setText((t) => ({ ...t, color: c }))} aria-label={`Text colour ${c}`} className="w-8 h-8 rounded-full" style={{ background: c, border: '1px solid rgba(0,0,0,0.2)', outline: text.color === c ? '2px solid var(--accent)' : 'none', outlineOffset: '2px' }} />
                      ))}
                    </div>
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
              </div>
            </Panel>
          )}

          {/* Step 4 — Preview controls */}
          {step === 4 && (
            <Panel title="Live preview" icon={Eye}>
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                Drag the design and text on the mockup to position them. Switch views below.
              </p>
              <div className="flex gap-2">
                {(['front', 'back', '360'] as Side[]).map((s) => (
                  <button key={s} type="button" onClick={() => setSide(s)} className="flex items-center gap-1.5 px-4 h-10 rounded-btn text-sm font-bold capitalize" style={{ border: `2px solid ${side === s ? 'var(--accent)' : 'var(--border)'}`, background: side === s ? 'var(--accent-light)' : 'var(--bg-surface)', color: side === s ? 'var(--accent)' : 'var(--text-primary)' }}>
                    {s === '360' && <RotateCw size={14} />} {s}
                  </button>
                ))}
              </div>
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
                <Row label="Design" value={hasDesign ? (design.kind === 'template' ? `${design.value} graphic` : 'Custom print') : 'None'} />
                <Row label="Text" value={hasText ? `“${text.content}”` : 'None'} />
                <Row label="Size" value={size} />
                <div className="flex justify-between pt-3 mt-1 border-t text-base font-bold" style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
                  <span>Total</span><span>{formatPrice(price)}</span>
                </div>
              </div>
              <button type="button" onClick={handleAddToCart} className="w-full h-12 rounded-btn text-white text-sm font-bold flex items-center justify-center gap-2" style={{ background: added ? 'var(--success)' : 'var(--accent)' }}>
                {added ? <><Check size={16} /> Added! Taking you to cart…</> : <>Add to cart · {formatPrice(price)}</>}
              </button>
            </Panel>
          )}

          {/* Nav */}
          <div className="flex items-center justify-between mt-8">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="flex items-center gap-1.5 h-11 px-5 rounded-btn text-sm font-bold disabled:opacity-40"
              style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
            >
              <ChevronLeft size={16} /> Back
            </button>
            {step < STEPS.length - 1 && (
              <button
                type="button"
                onClick={() => canNext && setStep((s) => Math.min(STEPS.length - 1, s + 1))}
                className="flex items-center gap-1.5 h-11 px-6 rounded-btn text-white text-sm font-bold"
                style={{ background: 'var(--accent)' }}
              >
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
            <div className="flex items-center justify-between mt-4">
              <div>
                <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Custom {style.name}</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{color.name} · {style.fabric}</p>
              </div>
              <p className="font-heading font-extrabold text-xl" style={{ color: 'var(--accent)' }}>{formatPrice(price)}</p>
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

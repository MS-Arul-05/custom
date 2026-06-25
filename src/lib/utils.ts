/**
 * Format integer INR paise as a rupee string. ₹1 = 100 paise.
 * formatPrice(49900) → "₹499"
 */
export function formatPrice(paise: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(paise / 100)
}

/** Free shipping over ₹1499 (149900 paise); otherwise ₹79 (7900 paise). */
export const FREE_SHIPPING_THRESHOLD = 149900
export const STANDARD_SHIPPING = 7900

export function shippingFor(subtotalPaise: number): number {
  return subtotalPaise >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/** Cart line-item key: product + size + color uniquely identifies a line. */
export function cartKey(productId: string, size: string, color: string): string {
  return `${productId}|${size}|${color}`
}

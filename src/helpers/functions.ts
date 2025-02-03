export const getUid = (prefix = '') => {
  const id = Date.now().toString(36) + Math.random().toString(36).substring(2)
  return prefix ? `${prefix}-${id}` : id
}
export const parseJSON = (value: string) => {
  try {
    return JSON.parse(value) as unknown
  } catch (e) {
    return false
  }
}
export const cleanString = (str: string /* '1 .4 s' => '1.4s' */) => {
  return str.replace(/\s+/g, '')
}
export const cleanNumber = (stringNumber: string /* '01234' */): string => {
  return stringNumber
    .replace(/\s+/g, '')
    .replace(/[^\d.]/g, '')
    .replace(/^\./, '')
    .replace(/^(\d*\.\d*)\..*/, '$1')
    .replace(/,/, '')
}
export const beautifyNumber = (input: string, x = 3, s = ' ', decimalPlaces = 2): string => {
  let cleanInput = cleanNumber(input)
  let [integerPart, decimalPart] = cleanInput.split('.')

  if (decimalPlaces === 0) {
    decimalPart = ''
  } else if (decimalPart && decimalPlaces > 0) {
    decimalPart = decimalPart.slice(0, decimalPlaces)
  }

  const formatWholePart = (number: string) => number.replace(new RegExp(`\\B(?=(\\d{${x}})+(?!\\d))`, 'g'), s)

  const lastValue: string = input[input.length - 1]
  const hasSingleDot = input.match(/\./g)?.length === 1

  return hasSingleDot && lastValue === '.' && decimalPlaces > 0
    ? `${formatWholePart(integerPart)}${decimalPart ? `.${decimalPart}` : ''}.`
    : `${formatWholePart(integerPart)}${decimalPart ? `.${decimalPart}` : ''}`
}
export const checkValueAndBeautifyNumber = (
  value: string | number | null | undefined,
  x = 3,
  s = ' ',
  decimalPlaces = 2,
): string => {
  if (!value && value !== 0) {
    return ''
  }

  return typeof value === 'string'
    ? beautifyNumber(value, x, s, decimalPlaces)
    : beautifyNumber(`${value}`, x, s, decimalPlaces)
}
export const beautifyPhoneNumber = (phone: unknown, useSymbols: boolean = false) => {
  if (!phone || typeof phone !== 'string') return ''
  const cleaned = cleanNumber(phone)
  const match = cleaned.match(/^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/)
  if (!match) return ''
  return useSymbols
    ? `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`
    : `+${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`
}
export const wait = <T>(time: number) => {
  return new Promise<T>((resolve) => setTimeout(resolve, time))
}
export const getBasePath = function (url: string, seperator: string = '/') {
  const parts = url.split(seperator)
  parts.pop()

  return parts.join(seperator)
}
export const sortArray = (arr: any[], key: 'sequence' | 'order' = 'sequence') => {
  if (!Array.isArray(arr)) return []

  return arr.sort((a, b) => {
    if (a[key] === null && b[key] === null) return 0
    if (a[key] === null) return 1
    if (b[key] === null) return -1
    return a[key] - b[key]
  })
}
const charMap: { [key: string]: string } = {
  a: '3',
  b: 'w',
  c: '@',
  d: 'e',
  e: '1',
  f: 'y',
  g: 'u',
  h: '%',
  i: '!',
  j: 'p',
  k: '#',
  l: 's',
  m: 'd',
  n: 'f',
  o: '&',
  p: 'h',
  q: 'j',
  r: 'k',
  s: 'l',
  t: 'z',
  u: 'x',
  v: '$',
  w: 'v',
  x: 'b',
  y: 'n',
  z: 'm',
  A: '4',
  B: 'W',
  C: '*',
  D: 'R',
  E: '2',
  F: 'Y',
  G: 'U',
  H: '^',
  I: '(',
  J: 'P',
  K: 'A',
  L: 'S',
  M: 'D',
  N: 'F',
  O: ')',
  P: 'H',
  Q: 'J',
  R: 'K',
  S: 'L',
  T: 'Z',
  U: 'X',
  V: 'C',
  W: 'V',
  X: 'B',
  Y: 'N',
  Z: 'M',
  '0': '~',
  '1': '|',
  '2': '`',
  '3': '+',
  '4': '_',
  '5': '=',
  '6': '-',
  '7': '[',
  '8': ']',
  '9': '{',
  ' ': '}',
  '!': 'µ',
  '@': 'ß',
  '#': '©',
  $: '¥',
  '%': 'ø',
  '^': '∆',
  '&': '¶',
  '*': '§',
  '(': '•',
  ')': '™',
  _: '¨',
  '-': '≠',
  '=': '±',
  '+': '÷',
  '{': 'å',
  '[': '∑',
  ']': '†',
  '}': 'Ω',
  ';': '≈',
  ':': '∞',
  '"': '¬',
  "'": 'π',
  '\\': '√',
  '|': '≤',
  '`': '≥',
  '~': '∆',
  ',': '≈',
  '.': '≡',
  '<': '≤',
  '>': '≥',
  '/': 'ƒ',
  '?': '¿',
}
const reverseCharMap: { [key: string]: string } = Object.fromEntries(
  Object.entries(charMap).map(([key, value]) => [value, key]),
)
export function obfuscate(text: string): string {
  if (!text) return ''
  return text
    .split('')
    .map((char) => charMap[char] || char)
    .join('')
}
export function deobfuscate(obfuscatedText: string): string {
  if (!obfuscatedText) return ''
  return obfuscatedText
    .split('')
    .map((char) => reverseCharMap[char] || char)
    .join('')
}
export function objectGetAllValue(obj: Record<string, any>): string {
  const str = JSON.stringify(obj)

  if (!str) return ''

  const values = str.match(/:\s*(?:(?:"([^"]*)")|(\[[^\]]+\]))/g)?.map((match) => {
    const value = match.split(':')[1].trim()

    return value.startsWith('[')
      ? value
          .replace(/[\[\]"]/g, '')
          .split(',')
          .join(', ')
      : value.replace(/"/g, '')
  })

  return values ? values.join(', ') : ''
}

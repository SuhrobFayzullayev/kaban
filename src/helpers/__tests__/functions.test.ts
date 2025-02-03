import { getUid, parseJSON, wait, sortArray } from '../functions'

describe('getUid', () => {
  it('should generate a unique ID with default prefix', () => {
    const id = getUid()
    expect(id).toMatch(/^\w+$/)
  })

  it('should generate a unique ID with custom prefix', () => {
    const prefix = 'user'
    const id = getUid(prefix)
    expect(id).toMatch(/^user-\w+$/)
  })
})

describe('parseJSON', () => {
  it('should parse valid JSON strings', () => {
    expect(parseJSON('{"key": "value"}')).toEqual({ key: 'value' })
    expect(parseJSON('[1, 2, 3]')).toEqual([1, 2, 3])
    expect(parseJSON('"hello"')).toEqual('hello')
    expect(parseJSON('123')).toEqual(123)
    expect(parseJSON('true')).toEqual(true)
    expect(parseJSON('null')).toBe(null)
  })

  it('should return false for invalid JSON strings', () => {
    expect(parseJSON('invalid')).toBe(false)
    expect(parseJSON('{"key": "value"')).toBe(false) // missing closing brace
    expect(parseJSON('{key: "value"}')).toBe(false) // missing quotes around key
    expect(parseJSON('undefined')).toBe(false)
  })
})

describe('sortArray', () => {
  it('should sort array', () => {
    expect(sortArray([{ sequence: 2 }, { sequence: 1 }, { sequence: 3 }])).toEqual([
      { sequence: 1 },
      { sequence: 2 },
      { sequence: 3 },
    ])
    expect(sortArray([{ order: 2 }, { order: 1 }, { order: 3 }], 'order')).toEqual([
      { order: 1 },
      { order: 2 },
      { order: 3 },
    ])
  })

  it('should return false for invalid JSON strings', () => {})
})

describe('wait', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should resolve after the specified time', async () => {
    const start = Date.now()
    const delay = 1000 // 1 second

    const waitPromise = wait<number>(delay)

    vi.runAllTimers() // Skip the setTimeout delay

    await waitPromise

    const end = Date.now()
    const elapsed = end - start

    expect(elapsed).toBe(delay)
  })
})

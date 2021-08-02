export const SSE_TYPE_ENUM = {
  AES: 'AES256',
}

export type SSE_TYPE = typeof SSE_TYPE_ENUM[keyof typeof SSE_TYPE_ENUM]

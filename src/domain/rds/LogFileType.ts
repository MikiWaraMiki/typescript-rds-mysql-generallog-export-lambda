export const LOG_FILE_TYPE = {
  GENERAL: 'general',
  ERROR: 'error',
  SLOW_QUERY: 'slowquery',
}

export type LOG_FILE_TYPE = typeof LOG_FILE_TYPE[keyof typeof LOG_FILE_TYPE]

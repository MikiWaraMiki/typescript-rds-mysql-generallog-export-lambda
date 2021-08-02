import { LocalFileAccessor } from '@/domain/storage/LocalFileAccessor'
import { createLambdaLogger } from '@/shared/logger'
import * as fs from 'fs'

export class ImplLocalFileAccessor implements LocalFileAccessor {
  private logger = createLambdaLogger('ImplLocalFileAccessor')

  convertBase64DataFromFile(filePath: string): string {
    const methodName = 'convertBase64DataFromFile'
    try {
      const buffer = fs.readFileSync(filePath)
      return buffer.toString('base64')
    } catch (e) {
      this.logger.log({
        level: 'ERROR',
        message: (e as Error).message,
        method: methodName,
      })

      throw e
    }
  }
}

import { GeneralLogFileFactory } from '@/domain/rds/GeneralLogFileFactory'
import { InstanceIdentifier } from '@/domain/rds/InstanceIdentifier'
import { LogFile } from '@/domain/rds/LogFile'
import { LOG_FILE_TYPE } from '@/domain/rds/LogFileType'
import { RdsApiAccessor } from '@/domain/rds/RdsApiAccessor'
import { createLambdaLogger } from '@/shared/logger'

/**
 * RDSの一般クエリログの一覧を取得する
 */
export class ImplGeneralLogFileFactory implements GeneralLogFileFactory {
  private rdsApiAccessor: RdsApiAccessor
  private logger = createLambdaLogger('ImplGeneralLogFileFactory')

  constructor(rdsApiAccessor: RdsApiAccessor) {
    this.rdsApiAccessor = rdsApiAccessor
  }

  async execute(rdsInstanceName: string): Promise<LogFile[]> {
    const loggingMethodName = 'fetchFiles'
    try {
      this.logger.log({
        level: 'INFO',
        message: 'starting fetch all general log file list',
        method: loggingMethodName,
      })

      const identifier = new InstanceIdentifier(rdsInstanceName)
      const typeName = LOG_FILE_TYPE.GENERAL

      const logFileList = await this.rdsApiAccessor.describeLogFileListByType(
        identifier,
        typeName,
      )

      this.logger.log({
        level: 'INFO',
        message: 'finished fetch all general log file list',
        method: loggingMethodName,
      })
      return logFileList
    } catch (e) {
      const errorMessage = (e as Error).message

      this.logger.log({
        level: 'ERROR',
        message: 'failed fetch all general log file list',
        exception: errorMessage,
        methodName: loggingMethodName,
      })

      return e
    }
  }
}

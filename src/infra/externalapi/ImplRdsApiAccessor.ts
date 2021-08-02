import { InstanceIdentifier } from '@/domain/rds/InstanceIdentifier'
import { LogFile } from '@/domain/rds/LogFile'
import { LogFileName } from '@/domain/rds/LogFileName'
import { LogLastWrittenTime } from '@/domain/rds/LogLastWrittenTime'
import { RdsApiAccessor } from '@/domain/rds/RdsApiAccessor'
import { createLambdaLogger } from '@/shared/logger'
import { RDS } from 'aws-sdk'

/**
 * RDS APIを操作する実装クラス
 */
export class ImplRdsApiAccessor implements RdsApiAccessor {
  private logger = createLambdaLogger('ImplRdsApiAccessor')
  private apiClient = new RDS()

  async describeLogFileListByType(
    rdsIdentifier: InstanceIdentifier,
    typeName: string,
    minLastWritten: number | undefined,
  ): Promise<LogFile[]> {
    const loggingMethodName = 'describeLogFileListByType'
    try {
      const params: RDS.DescribeDBLogFilesMessage = {
        DBInstanceIdentifier: rdsIdentifier.name(),
        FileLastWritten: minLastWritten,
        FilenameContains: typeName,
      }
      this.logger.log({
        level: 'INFO',
        message: 'calling rds describeLogFiles API',
        params: params,
        method: loggingMethodName,
      })

      const result = await this.apiClient.describeDBLogFiles(params).promise()

      this.logger.log({
        level: 'INFO',
        message: 'called rds describeLogFiles API',
        response: result,
        method: loggingMethodName,
      })

      if (!result.DescribeDBLogFiles) {
        this.logger.log({
          level: 'WARN',
          message:
            'request is success but response is not include DescribeDBLogFiles Filed',
          method: loggingMethodName,
        })

        return []
      }

      const logFilesMetaDataList = result.DescribeDBLogFiles
      return this.convertToDomainModel(typeName, logFilesMetaDataList)
    } catch (e) {
      const errorMessage = (e as Error).message
      this.logger.log({
        level: 'ERROR',
        message: errorMessage,
        method: loggingMethodName,
      })
      throw e
    }
  }

  private convertToDomainModel(
    type: string,
    logFileMetaDataList: RDS.DescribeDBLogFilesList,
  ): LogFile[] {
    if (logFileMetaDataList.length < 1) return []

    return logFileMetaDataList.map((data) => {
      const logFileName = new LogFileName(data.LogFileName ?? '')
      const logLastWritten = new LogLastWrittenTime(data.LastWritten ?? 0)
      return new LogFile(type, logFileName, logLastWritten, data.Size ?? 0)
    })
  }
}

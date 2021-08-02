import { LogFileName } from '@/domain/rds/LogFileName'
import { LOG_FILE_TYPE } from '@/domain/rds/LogFileType'

export class LogFile {
  private type: string
  private name: LogFileName
  private size: number

  constructor(type: string, name: LogFileName, size: number) {
    this.type = type
    this.name = name
    this.size = size
  }

  static generateGeneralLog(name: LogFileName, size: number): LogFile {
    return new LogFile(LOG_FILE_TYPE.GENERAL, name, size)
  }

  fileName(): string {
    return this.name.value()
  }
}

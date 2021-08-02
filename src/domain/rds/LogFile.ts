import { LogFileName } from '@/domain/rds/LogFileName'
import { LOG_FILE_TYPE } from '@/domain/rds/LogFileType'
import { LogLastWrittenTime } from '@/domain/rds/LogLastWrittenTime'

export class LogFile {
  private type: LOG_FILE_TYPE
  private name: LogFileName
  private lastWrittenTime: LogLastWrittenTime
  private size: number

  constructor(
    type: string,
    name: LogFileName,
    lastWrittenTime: LogLastWrittenTime,
    size: number,
  ) {
    this.type = type
    this.name = name
    this.lastWrittenTime = lastWrittenTime
    this.size = size
  }

  fileName(): string {
    return this.name.value()
  }
}

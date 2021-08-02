export class LogLastWrittenTime {
  private rawPosixTime: number

  constructor(rawPosixTime: number) {
    if (rawPosixTime < 0)
      throw new Error('ログの最終書き込み日時がUNIXタイムではありません')
    this.rawPosixTime = rawPosixTime
  }

  posixTime(): number {
    return this.rawPosixTime
  }

  date(): Date {
    return new Date(this.rawPosixTime)
  }
}

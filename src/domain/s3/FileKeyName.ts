export class FileKeyName {
  private prefix: string
  private name: string

  constructor(prefix: string, name: string) {
    if (!name) throw new Error('S3にあげるファイル名は必須です')

    const prefixLastChar = prefix.substr(-1, 1)
    if (prefixLastChar == '/')
      throw new Error('prefixの最後に/を付与することはできません')

    this.prefix = prefix
    this.name = name
  }

  key(): string {
    return `${this.prefix}/${this.name}`
  }
}

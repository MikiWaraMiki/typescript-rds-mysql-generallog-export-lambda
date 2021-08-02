export class FileBody {
  private base64Data: string

  constructor(base64Data: string) {
    // TODO: BASE64ファイルの検証

    this.base64Data = base64Data
  }

  data(): string {
    return this.base64Data
  }
}

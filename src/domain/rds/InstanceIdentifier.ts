export class InstanceIdentifier {
  private val: string

  constructor(name: string) {
    if (!name) throw new Error('RDSの識別子に空文字は設定できません')
    this.val = name
  }

  name(): string {
    return this.val
  }
}

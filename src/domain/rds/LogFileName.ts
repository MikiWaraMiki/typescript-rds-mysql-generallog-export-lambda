export class LogFileName {
    private name: string

    constructor(name: string) {
        if (!name) throw new Error('ファイル名に空文字は設定できません')
        this.name = name
    }

    value(): string {
        return this.name
    }
}

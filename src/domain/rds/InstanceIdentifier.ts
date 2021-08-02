export class InstanceIdentifier {
    private name: string

    constructor(name: string) {
        if (!name) throw new Error('RDSの識別子に空文字は設定できません')
        this.name = name
    }
}

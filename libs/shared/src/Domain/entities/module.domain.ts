export class ModuleEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly ec: number,
    public readonly nlqf: number,
    public readonly theme: string,
    public readonly description: string,
    public readonly type: string,
  ) {}

  validate() {
    if (!this.name || this.ec <= 0) {
      throw new Error('Invalid module data');
    }
  }
}

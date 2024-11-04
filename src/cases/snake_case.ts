import { Case } from './case'

export class SnakeCase extends Case {
  get naturalText(): string { return super.naturalText.split('_').join(' ').toLowerCase() }

  constructor(text: string) {
    super(text)
  }

  static applyTo(text: string): boolean {
    return super.trimUnderscore(text).includes('_')
  }
}

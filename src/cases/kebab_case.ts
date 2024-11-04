import { Case } from './case'

export class KebabCase extends Case {
  get naturalText(): string { return super.naturalText.split('-').join(' ') }

  constructor(text: string) {
    super(text)
  }

  static applyTo(text: string): boolean {
    return super.trimUnderscore(text).includes('-')
  }
}

import { Case } from './case'
import { KebabCase } from './kebab_case'
import { SnakeCase } from './snake_case'

export class CamelCase extends Case {
  get naturalText(): string {
    return super.naturalText.replaceAll(/[A-Z]/g, (s) => ` ${s}`).trim().toLowerCase()
  }

  constructor(text: string) {
    super(text)
  }

  static applyTo(text: string): boolean {
    return !SnakeCase.applyTo(text) && !KebabCase.applyTo(text) && /[A-Z]/.test(super.trimUnderscore(text))
  }
}

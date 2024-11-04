import { Case } from './cases/case'
import { KebabCase } from './cases/kebab_case'
import { SnakeCase } from './cases/snake_case'
import { CamelCase } from './cases/camel_case'

export class Parser {
  #inputText: string
  #outputText: string = ''

  private set outputText(text: string) { this.#outputText = text }

  get inputText() { return this.#inputText }
  get outputText() { return this.#outputText }

  constructor(text: string) {
    if (text.length === 0) throw new Error('文字列が指定されていません。')

    this.#inputText = text
  }

  exec(): string {
    const klass = this.findClass(this.inputText)
    return new klass(this.inputText).naturalText
  }

  private findClass(inputText: string) {
    if (SnakeCase.applyTo(inputText)) return SnakeCase
    if (KebabCase.applyTo(inputText)) return KebabCase
    if (CamelCase.applyTo(inputText)) return CamelCase
    return Case
  }
}

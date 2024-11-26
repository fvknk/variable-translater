import { ICase } from './cases/case_interface'
import { Case } from './cases/case'
import { KebabCase } from './cases/kebab_case'
import { SnakeCase } from './cases/snake_case'
import { CamelCase } from './cases/camel_case'

import { ValidationError } from './errors/validation_error'

export class Parser {
  #inputText: string
  #outputText: string = ''

  private set outputText(text: string) { this.#outputText = text }

  get inputText() { return this.#inputText }
  get outputText() { return this.#outputText }

  constructor(text: string) {
    if (text.length === 0) throw new ValidationError('文字列が指定されていません。')

    this.#inputText = text
  }

  exec(): string {
    const caseInstance: ICase = this.createCase(this.inputText)
    return caseInstance.naturalText
  }

  private createCase(text: string): ICase {
    const caseClasses = [SnakeCase, KebabCase, CamelCase] as const
    const caseClass: typeof caseClasses[number] | Case = caseClasses.find((caseClass) => caseClass.applyTo(text)) || Case

    return new caseClass(this.inputText)
  }
}

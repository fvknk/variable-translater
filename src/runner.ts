import { Validator } from './validator'
import { Parser } from './parser'
import { Translator } from './translator'
import { EmptyVariableError, ValidationError } from './error'

export class Runner {
  #inputText: string
  #translatedText: string = ''

  private set translatedText(text: string) { this.#translatedText = text }

  get inputText() { return this.#inputText }
  get translatedText() { return this.#translatedText }
  get outputMessage() {
    if (!this.translatedText) throw new EmptyVariableError('結果が空です。')
    return `from: ${this.inputText} -> to: ${this.translatedText}`
  }

  constructor(text: string | undefined) {
    if (!text) throw new ValidationError('文字列が指定されていません。')
    if (text.length === 0) throw new ValidationError('文字列が指定されていません。')

    this.#inputText = text
  }

  async exec(): Promise<string> {
    new Validator(this.inputText).exec()

    const parsedText = new Parser(this.inputText).exec()

    this.translatedText = await new Translator(parsedText).exec()

    return this.outputMessage
  }
}

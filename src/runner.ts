import { Translator } from './translator'

export class Runner {
  #inputText: string
  #responseText: string = ''

  private set responseText(text: string) { this.#responseText = text }

  get inputText() { return this.#inputText }
  get responseText() { return this.#responseText }
  get outputMessage() {
    if (!this.responseText) throw new Error('結果が空です。')
    return `from: ${this.inputText} -> to: ${this.responseText}`
  }

  constructor(text: string) {
    if (text.length === 0) throw new Error('文字列が指定されていません。')

    this.#inputText = text
  }

  async exec(): Promise<string> {
    this.responseText = await new Translator(this.inputText).exec()

    return this.outputMessage
  }
}

import { translatorResponse } from '../types'
import { EmptyVariableError, NotImplementedError, ValidationError } from '../error'

export class Translator {
  #inputText: string
  #response: translatorResponse | null = null

  protected set response(res) { this.#response = res }

  get inputText(): string { return this.#inputText }
  get response(): translatorResponse | null { return this.#response }
  get outputText(): string | null { return this.response?.text || null }

  constructor(text: string) {
    if (text.length === 0) throw new ValidationError('文字列が指定されていません。')

    this.#inputText = text
  }

  async exec(): Promise<string> {
    this.response = await this.request()

    if (!this.response || !this.outputText) throw new EmptyVariableError('結果が空です。')

    return this.outputText
  }

  request(): Promise<translatorResponse> {
    throw new NotImplementedError('許可されていない呼び出しです。')
  }
}

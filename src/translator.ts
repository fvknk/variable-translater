import * as vscode from 'vscode'

import { response } from './types'

export class Translator {
  #inputText: string
  #response: response | null = null

  private set response(res) { this.#response = res }

  get inputText(): string { return this.#inputText }
  get response(): response | null { return this.#response }
  get outputText(): string | null { return this.response?.text || null }

  constructor(text: string) {
    if (text.length === 0) throw new Error('文字列が指定されていません。')

    this.#inputText = text
  }

  async exec(): Promise<string> {
    this.response = await this.request(this.inputText)

    if (!this.response || !this.outputText) throw new Error('結果が空です。')

    return this.outputText
  }

  async request(text: string): Promise<response> {
    const params = { text }
    const query = new URLSearchParams(params)
    const endpoint = vscode.workspace.getConfiguration('variableTranslator').get<string>('apiEndPoint')

    const url = `${endpoint}?${query}`
    return await fetch(url).then(data => data.json()) as response
  }
}

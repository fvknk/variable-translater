import * as vscode from 'vscode'

import { Validator } from './validator'
import { Parser } from './parser'

import { ITranslator } from './translators/translator_interface'
import { Translator } from './translators/translator'
import { GasTranslator } from './translators/gas_translator'
import { TextraTranslator } from './translators/textra_translator'

import { ValidationError } from './errors/validation_error'
import { EmptyVariableError } from './errors/empty_variable_error'

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

    const translator = this.selectedTranslator(parsedText)
    this.translatedText = await translator.exec()

    return this.outputMessage
  }

  private selectedTranslator(text: string): ITranslator {
    const translatorName = vscode.workspace.getConfiguration('variableTranslator').get<string>('selectedTranslator')
    switch (translatorName) {
      case 'GasTranslator':
        return new GasTranslator(text)
      case 'TextraTranslator':
        return new TextraTranslator(text)
      default:
        return new Translator(text)
    }
  }
}

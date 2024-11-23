import * as vscode from 'vscode'
import { Translator } from './translator'

import { EmptyVariableError } from '../errors/empty_variable_error'

import { translatorResponse, gasResponse } from '../types'
import { Translator } from './translator'
import { EmptyVariableError } from '../error'

export class GasTranslator extends Translator {
  async request(): Promise<translatorResponse> {
    const res: gasResponse = await this.fetch()
    console.log(res)

    if (!res || !res.text) throw new EmptyVariableError('結果が空です。')

    return { text: res.text }
  }

  private async fetch(): Promise<gasResponse> {
    const params = { text: super.inputText }
    const query = new URLSearchParams(params)
    const endpoint = vscode.workspace.getConfiguration('variableTranslator').get<string>('gasApiEndPoint')

    const url = `${endpoint}?${query}`
    return await fetch(url).then(data => data.json()) as gasResponse
  }
}

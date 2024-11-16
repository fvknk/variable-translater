import * as vscode from 'vscode'

import { response } from '../types'
import { Translator } from './translator'

export class GasTranslator extends Translator {
  async request(text: string): Promise<response> {
    const params = { text }
    const query = new URLSearchParams(params)
    const endpoint = vscode.workspace.getConfiguration('variableTranslator').get<string>('gasApiEndPoint')

    const url = `${endpoint}?${query}`
    return await fetch(url).then(data => data.json()) as response
  }
}

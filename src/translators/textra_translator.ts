import * as vscode from 'vscode'

import { translatorResponse, textraResponse, tokenResponse } from '../types'
import { Translator } from './translator'
import { EmptyVariableError, UncallableError } from '../error'

export class TextraTranslator extends Translator {
  private access_token: string | null = null

  set URL(_: any) { throw new UncallableError('許可されていない呼び出しです。') }
  set API_NAME(_: any) { throw new UncallableError('許可されていない呼び出しです。') }
  set API_PARAM(_: any) { throw new UncallableError('許可されていない呼び出しです。') }

  get URL(): string { return 'https://mt-auto-textra-mlt.ucri.jgn-x.jp' }
  get API_NAME(): string { return 'mt' }
  get API_PARAM(): string { return 'generalNT_en_ja' }

  async request(): Promise<translatorResponse> {
    if (!this.apiKey) throw new Error('API キーが未登録です。')
    if (!this.apiSecret) throw new Error('API シークレットが未登録です。')

    this.access_token = await this.fetchToken()

    if (!this.access_token) throw new EmptyVariableError('アクセストークンが空です。')

    const text: string = await this.fetch()

    if (!text) throw new EmptyVariableError('結果が空です。')

    return { text }
  }

  private async fetchToken(): Promise<string> {
    const res: tokenResponse = await fetch(`${this.URL}/oauth2/token.php`, {
      method: 'POST',
      body: this.createTokenRequestBody()
    }).then(data => data.json()) as tokenResponse

    return res.access_token
  }

  private createTokenRequestBody(): FormData {
    const body = new FormData()
    body.append('grant_type', 'client_credentials')
    body.append('client_id', this.apiKey)
    body.append('client_secret', this.apiSecret)
    body.append('urlAccessToken', `${this.URL}/oauth2/token.php`)

    return body
  }

  private async fetch(): Promise<string> {
    const res: textraResponse = await fetch(`${this.URL}/api/`, {
      method: 'POST',
      body: this.createTranslateRequestBody()
    }).then(data => data.json()) as textraResponse

    return res.resultset.result.text
  }

  private createTranslateRequestBody(): FormData {
    const loginId = vscode.workspace.getConfiguration('variableTranslator').get<string>('textraLoginId')

    const body = new FormData()
    body.append('access_token', this.access_token)
    body.append('key', this.apiKey)
    body.append('api_name', this.API_NAME)
    body.append('api_param', this.API_PARAM)
    body.append('name', loginId)
    body.append('type', 'json')
    body.append('text', super.inputText)

    return body
  }

  private apiKey(): string | undefined { return vscode.workspace.getConfiguration('variableTranslator').get<string>('textraApiKey') }
  private apiSecret(): string | undefined { return vscode.workspace.getConfiguration('variableTranslator').get<string>('textraApiSecret') }
}

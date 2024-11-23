import { translatorResponse } from '../types'

export interface ITranslator {
  inputText: string
  response: translatorResponse | null

  exec(): Promise<string>
  request(): Promise<translatorResponse>
}

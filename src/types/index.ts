export interface translatorResponse {
  text: string
}

export interface gasResponse {
  text?: string
}

export interface tokenResponse {
  access_token: string
  expire_in: number
  scope: string | null
  token_type: string
}

export interface textraResponse {
  resultset: {
    result: {
      text: string
    }
  }
}

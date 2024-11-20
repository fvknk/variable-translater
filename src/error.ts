export class ValidationError extends Error {
  name: string = 'ValidationError'

  constructor(message: string = '不正な値です。') {
    super(message)
  }
}
export class EmptyVariableError extends Error {
  name: string = 'EmptyVariableError'

  constructor(message: string = '空の変数です。') {
    super(message)
  }
}

export class NotImplementedError extends Error {
  name: string = 'NotImplementedError'

  constructor(message: string = '実装されていません。') {
    super(message)
  }
}

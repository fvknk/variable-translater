export class EmptyVariableError extends Error {
  name: string = 'EmptyVariableError'

  constructor(message: string = '空の変数です。') {
    super(message)
  }
}

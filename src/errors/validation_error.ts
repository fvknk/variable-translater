export class ValidationError extends Error {
  name: string = 'ValidationError'

  constructor(message: string = '不正な値です。') {
    super(message)
  }
}

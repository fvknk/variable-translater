export class ValidationError extends Error {
  name: string = 'ValidationError'

  constructor(message: string) {
    super(message)
  }
}

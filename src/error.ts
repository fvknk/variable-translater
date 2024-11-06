export class ValidationError extends Error {
  name: string = 'ValidationError'

  constructor(message: string) {
    super(message)
  }
}
export class EmptyVariableError extends Error {
  name: string = 'EmptyVariableError'

  constructor(message: string) {
    super(message)
  }

}

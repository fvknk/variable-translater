export class NotImplementedError extends Error {
  name: string = 'NotImplementedError'

  constructor(message: string = '実装されていません。') {
    super(message)
  }
}

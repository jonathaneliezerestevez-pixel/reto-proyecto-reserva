export class AppError extends Error {
  constructor(
    public readonly status: 400 | 401 | 404 | 409 | 500,
    message: string,
  ) {
    super(message)
    this.name = 'AppError'
  }
}

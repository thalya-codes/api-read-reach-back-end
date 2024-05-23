export class HttpError extends Error {
  status;

  constructor(message: string, code: number) {
    super(message);
    this.status = code;
  }
}

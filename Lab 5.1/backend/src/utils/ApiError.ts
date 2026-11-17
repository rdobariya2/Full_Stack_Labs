export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }

  static badRequest(message: string, details?: unknown): ApiError {
    return new ApiError(400, message, details);
  }

  static notFound(message: string): ApiError {
    return new ApiError(404, message);
  }

  static unauthorized(message: string): ApiError {
    return new ApiError(401, message);
  }
}

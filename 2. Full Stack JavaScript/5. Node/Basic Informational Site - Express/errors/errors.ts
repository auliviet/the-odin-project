class CustomError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class NotFoundError extends CustomError {
  statusCode = 404;
  name = "notFound";

  constructor(message?: string) {
    super(message ?? "Page not found");
  }
}

export class ServerError extends CustomError {
  statusCode = 500;
  name = "serverError";

  constructor(message?: string) {
    super(message ?? "Server unavailable");
  }
}

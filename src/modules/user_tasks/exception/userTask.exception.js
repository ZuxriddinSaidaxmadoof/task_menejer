export class UserTaskNotFoundException extends Error {
  constructor() {
    super("user task not found");

    this.statusCode = 404;
  }
}

export class UserTaskException extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}
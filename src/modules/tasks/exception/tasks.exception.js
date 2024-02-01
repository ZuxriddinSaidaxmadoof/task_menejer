export class TaskNotFoundException extends Error {
  constructor() {
    super("task not found");

    this.statusCode = 404;
  }
}

export class TaskException extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

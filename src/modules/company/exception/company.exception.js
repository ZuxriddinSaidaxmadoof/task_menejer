export class CompanyNotFoundException extends Error {
  constructor() {
    super("Company not found By Id");

    this.statusCode = 404;
  }
}

export class CompanyException extends Error {
  constructor(message) {
    super(message);

    this.statusCode = 400;
  }
}

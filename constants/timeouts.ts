export enum Timeouts {
  Action = 15_000,
  Navigation = 30_000,
  Assertion = 15_000,
  Toast = 15_000,
  OrderSuccess = 45_000,
  EmailFlow = 120_000,
  PasswordResetFlow = 180_000,
  PayHereCheckout = 90_000,
  PayHereFrame = 30_000,
  PayHereIpg = 20_000,
  PayHereResult = 45_000,
  MailPollDefault = 90_000,
  MailPollInterval = 3_000,
  MailPollFallback = 30_000,
  ShortUi = 10_000,
  MediumUi = 20_000,
}

export enum StatusCodes {
  Ok = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  TooManyRequests = 429,
  InternalServerError = 500,
}

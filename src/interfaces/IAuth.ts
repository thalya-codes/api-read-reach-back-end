import { Response } from 'express';

export interface IGenerateJWTPayload {
  id: number;
}

export interface IVerifyTokens {
  token: string;
  response: Response;
  errorMsg?: string;
}

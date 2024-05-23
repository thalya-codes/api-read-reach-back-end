import { Request } from 'express';
import { IUserBaseInfos } from './IUser';

export interface IUserRequest<T = ''> extends Request {
  body: IUserBaseInfos & T;
}

export interface IReadingsRequest {
  params: {
    userId: string | number;
    id?: string | number;
  };
}

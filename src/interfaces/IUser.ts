export type IUserBaseInfos<T = {}> = Record<'email' | 'password', string> & T;
export interface IUser extends IUserBaseInfos {
  name: string;
}

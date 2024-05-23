import bcrypt from 'bcrypt';
import { UserModel } from '../../models/UserModel';
import { IUser, IUserBaseInfos } from '../../interfaces';
import { HttpError, INVALID_PASSWORD, INVALID_USER_EMAIL } from '../../errors';

export async function validateCredentials({ email, password }: IUserBaseInfos) {
  const user = (await UserModel.findOne(email)) as any;

  if (!user.email) throw new HttpError(INVALID_USER_EMAIL, 401);

  const passwordIsValid = bcrypt.compareSync(password, user.password);

  if (!passwordIsValid) throw new HttpError(INVALID_PASSWORD, 401);

  return user;
}

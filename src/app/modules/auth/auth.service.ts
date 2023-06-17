import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";

const signUp = async (user: IUser): Promise<IUser | null> => {
  const createUser = await User.create(user);

  return createUser;
};

export const AuthService = {
  signUp,
};

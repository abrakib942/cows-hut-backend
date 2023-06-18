import { IGenericResponse } from "../../../interfaces/common";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const getAllUsers = async () => {
  const result = await User.find();

  return result;
};
const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);

  return result;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
};

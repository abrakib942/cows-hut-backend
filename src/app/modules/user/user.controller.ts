import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.getAllUsers();

    res.status(200).json({
      success: true,
      message: "users retrieved successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const result = await UserService.getSingleUser(id);

    res.status(200).json({
      success: true,
      message: "user retrieved successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  getAllUsers,
  getSingleUser,
};

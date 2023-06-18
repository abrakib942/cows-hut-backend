import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.getAllUsers();

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
};

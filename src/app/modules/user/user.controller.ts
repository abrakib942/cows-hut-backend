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
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await UserService.updateUser(id, updatedData);

    res.status(200).json({
      success: true,
      message: "user updated successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await UserService.deleteUser(id);

    res.status(200).json({
      success: true,
      message: "user deleted successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};

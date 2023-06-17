import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ...user } = req.body;

    const result = await AuthService.signUp(user);

    res.status(200).json({
      success: true,
      message: "user created successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AuthController = {
  signUp,
};

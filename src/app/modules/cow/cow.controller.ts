import { NextFunction, Request, Response } from "express";
import { CowService } from "./cow.service";

const createCow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ...cow } = req.body;
    const result = await CowService.createCow(cow);

    res.status(200).json({
      success: true,
      message: "cow created successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCows = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await CowService.getAllCows();

    res.status(200).json({
      success: true,
      message: "Cows retrieved successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleCow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const result = await CowService.getSingleCow(id);

    res.status(200).json({
      success: true,
      message: "Cow retrieved successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const CowController = {
  createCow,
  getAllCows,
  getSingleCow,
};

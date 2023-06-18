import { NextFunction, Request, Response } from "express";
import { CowService } from "./cow.service";
import pick from "../../../shared/pick";
import { cowsFilterableFields, paginationFields } from "./cow.constants";
import { IPaginationOptions } from "../../../interfaces/pagination";

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
    const filters = pick(req.query, cowsFilterableFields);

    const paginationOptions: Partial<IPaginationOptions> = pick(
      req.query,
      paginationFields
    );

    const result = await CowService.getAllCows(
      filters,
      paginationOptions as IPaginationOptions
    );

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

const updateCow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await CowService.updateCow(id, updatedData);

    res.status(200).json({
      success: true,
      message: "Cow updated successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await CowService.deleteCow(id);

    res.status(200).json({
      success: true,
      message: "Cow deleted successfully!",
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
  updateCow,
  deleteCow,
};

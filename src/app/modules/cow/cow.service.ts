import { SortOrder } from "mongoose";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { ICow, ICowFilters } from "./cow.interface";
import { Cow } from "./cow.model";
import { cowsSearchableFields } from "./cow.constants";

const createCow = async (cow: ICow): Promise<ICow> => {
  const result = (await Cow.create(cow)).populate("seller");

  return result;
};

const getAllCows = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions
) => {
  const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: cowsSearchableFields.map((field) => ({
        [field]: { $regex: searchTerm, $options: "i" },
      })),
    });
  }

  if (minPrice) {
    andConditions.push({
      price: {
        $gte: minPrice,
      },
    });
  }

  if (maxPrice) {
    andConditions.push({
      price: {
        $lte: maxPrice,
      },
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: { $regex: value, $options: "i" },
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Cow.find(whereCondition)
    .populate("seller")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const count = await Cow.countDocuments();

  return {
    meta: {
      page,
      limit,
      count,
    },
    data: result,
  };
};

const getSingleCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findById(id).populate("seller");

  return result;
};

const updateCow = async (id: string, payload: ICow): Promise<ICow | null> => {
  const result = await Cow.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  }).populate("seller");

  return result;
};

const deleteCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findByIdAndDelete(id);

  return result;
};

export const CowService = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};

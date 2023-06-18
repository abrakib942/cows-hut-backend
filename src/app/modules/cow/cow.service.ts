import { ICow } from "./cow.interface";
import { Cow } from "./cow.model";

const createCow = async (cow: ICow): Promise<ICow> => {
  const result = (await Cow.create(cow)).populate("seller");

  return result;
};

const getAllCows = async () => {
  const result = await Cow.find().populate("seller");

  return result;
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

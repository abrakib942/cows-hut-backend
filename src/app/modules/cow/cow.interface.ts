import { Model, Types } from "mongoose";

export type ICowLocation =
  | "Dhaka"
  | "Chattogram"
  | "Barishal"
  | "Rajshahi"
  | "Sylhet"
  | "Comilla"
  | "Rangpur"
  | "Mymensingh";

export type ICowBreed =
  | "Brahman"
  | "Nellore"
  | "Sahiwal"
  | "Gir"
  | "Indigenous"
  | "Tharparkar"
  | "Kankrej";

export type ICow = {
  name: string;
  age: number;
  price: number;
  location: ICowLocation;
  breed: ICowBreed;
  weight: string;
  label: "for sale" | "sold out";
  category: "Dairy" | "Beef" | "DualPurpose";
};
export type CowModel = Model<ICow, Record<string, unknown>>;

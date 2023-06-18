import { Schema, model } from "mongoose";
import { CowModel, ICow } from "./cow.interface";
import { breed, location } from "./cow.constants";

const cowSchema = new Schema<ICow>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      enum: location,
      required: true,
    },
    breed: {
      type: String,
      enum: breed,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      enum: ["for sale", "sold out"],
      default: "for sale",
    },
    category: {
      type: String,
      enum: ["Dairy", "Beef", "DualPurpose"],
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Cow = model<ICow, CowModel>("Cow", cowSchema);

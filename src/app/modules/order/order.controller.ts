import { NextFunction, Request, Response } from "express";
import mongoose, { startSession } from "mongoose";
import { Cow } from "../cow/cow.model";
import { User } from "../user/user.model";
import ApiError from "../../../errors/ApiError";
import { Order } from "./order.model";
import { IUser } from "../user/user.interface";

const buyCow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cow, buyer } = req.body;

    const session = await startSession();
    session.startTransaction();

    try {
      // Retrieve the cow and buyer from the database
      const selectedCow = await Cow.findById(cow).session(session);
      const buyerUser = await User.findById(buyer).session(session);

      if (!selectedCow || !buyerUser) {
        throw new ApiError(404, "Cow or buyer not found");
      }

      // Check if the cow is already sold
      if (selectedCow.label === "sold out") {
        throw new ApiError(400, "The cow is already sold");
      }

      // Check if the buyer has enough budget
      if (buyerUser.budget < selectedCow.price) {
        throw new ApiError(400, "Insufficient budget to buy the cow");
      }

      // Update the cow's label to 'sold out'
      selectedCow.label = "sold out";
      await selectedCow.save({ session });

      // Deduct the cow's price from the buyer's budget
      buyerUser.budget -= selectedCow.price;
      await buyerUser.save({ session });

      // Increment the cow's price to the seller's income
      const sellerUser = await User.findById(selectedCow.seller).session(
        session
      );

      if (!sellerUser) {
        throw new ApiError(404, "Seller not found");
      }

      sellerUser.income += selectedCow.price;
      await sellerUser.save({ session });

      // Create an entry in the orders collection
      const order = new Order({
        cow: selectedCow._id,
        buyer: buyerUser._id,
      });
      await order.save({ session });

      // Commit the transaction
      await session.commitTransaction();

      res.status(200).json({
        success: true,
        message: "Cow purchase successful",
        data: order,
      });
    } catch (error) {
      // If any error occurs, abort the transaction
      await session.abortTransaction();
      throw error;
    } finally {
      // End the session
      session.endSession();
    }
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  const result = await Order.find();

  res.status(200).json({
    success: true,
    messages: "orders retrieved successfully",
    data: result,
  });
};

export const OrderController = {
  buyCow,
  getOrders,
};

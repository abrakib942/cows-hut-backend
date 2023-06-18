"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const mongoose_1 = require("mongoose");
const cow_model_1 = require("../cow/cow.model");
const user_model_1 = require("../user/user.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const order_model_1 = require("./order.model");
const buyCow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cow, buyer } = req.body;
        const session = yield (0, mongoose_1.startSession)();
        session.startTransaction();
        try {
            // Retrieve the cow and buyer from the database
            const selectedCow = yield cow_model_1.Cow.findById(cow).session(session);
            const buyerUser = yield user_model_1.User.findById(buyer).session(session);
            if (!selectedCow || !buyerUser) {
                throw new ApiError_1.default(404, "Cow or buyer not found");
            }
            // Check if the cow is already sold
            if (selectedCow.label === "sold out") {
                throw new ApiError_1.default(400, "The cow is already sold");
            }
            // Check if the buyer has enough budget
            if (buyerUser.budget < selectedCow.price) {
                throw new ApiError_1.default(400, "Insufficient budget to buy the cow");
            }
            // Update the cow's label to 'sold out'
            selectedCow.label = "sold out";
            yield selectedCow.save({ session });
            // Deduct the cow's price from the buyer's budget
            buyerUser.budget -= selectedCow.price;
            yield buyerUser.save({ session });
            // Increment the cow's price to the seller's income
            const sellerUser = yield user_model_1.User.findById(selectedCow.seller).session(session);
            if (!sellerUser) {
                throw new ApiError_1.default(404, "Seller not found");
            }
            sellerUser.income += selectedCow.price;
            yield sellerUser.save({ session });
            // Create an entry in the orders collection
            const order = new order_model_1.Order({
                cow: selectedCow._id,
                buyer: buyerUser._id,
            });
            yield order.save({ session });
            // Commit the transaction
            yield session.commitTransaction();
            res.status(200).json({
                success: true,
                message: "Cow purchase successful",
                data: order,
            });
        }
        catch (error) {
            // If any error occurs, abort the transaction
            yield session.abortTransaction();
            throw error;
        }
        finally {
            // End the session
            session.endSession();
        }
    }
    catch (error) {
        next(error);
    }
});
const getOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find();
    res.status(200).json({
        success: true,
        messages: "orders retrieved successfully",
        data: result,
    });
});
exports.OrderController = {
    buyCow,
    getOrders,
};

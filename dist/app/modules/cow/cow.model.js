"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cow = void 0;
const mongoose_1 = require("mongoose");
const cow_constants_1 = require("./cow.constants");
const cowSchema = new mongoose_1.Schema({
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
        enum: cow_constants_1.location,
        required: true,
    },
    breed: {
        type: String,
        enum: cow_constants_1.breed,
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});
exports.Cow = (0, mongoose_1.model)("Cow", cowSchema);

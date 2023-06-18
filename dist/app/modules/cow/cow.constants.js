"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowsFilterableFields = exports.cowsSearchableFields = exports.paginationFields = exports.breed = exports.location = void 0;
exports.location = [
    "Dhaka",
    "Chattogram",
    "Barishal",
    "Rajshahi",
    "Sylhet",
    "Comilla",
    "Rangpur",
    "Mymensingh",
];
exports.breed = [
    "Brahman",
    "Nellore",
    "Sahiwal",
    "Gir",
    "Indigenous",
    "Tharparkar",
    "Kankrej",
];
exports.paginationFields = ["page", "limit", "sortBy", "sortOrder"];
exports.cowsSearchableFields = ["location", "breed", "category"];
exports.cowsFilterableFields = [
    "searchTerm",
    "minPrice",
    "maxPrice",
    "location",
    "breed",
    "category",
];

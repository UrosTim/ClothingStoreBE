const mongoose = require('mongoose');
const {Schema} = require("mongoose");
const productSchema = new mongoose.Schema({
    name: String,
    shortDescription: String,
    description: String,
    price: Number,
    discount: Number,
    images: Array(String),
    categoryId: {type: Schema.Types.ObjectId, ref: 'categories'},
    brandId: {type: Schema.Types.ObjectId, ref: 'brands'},
    isFeatured: {type: Boolean, default: false},
    isFresh: {type: Boolean, default: false},
});

const Product = mongoose.model("products", productSchema);
module.exports = Product;
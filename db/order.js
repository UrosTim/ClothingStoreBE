const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const ProductSchema = new Schema({
    _id: Schema.Types.ObjectId,
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

const ItemSchema = new Schema({
    quantity: Number,
    product: ProductSchema
});

const orderSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    date: Date,
    items: [ItemSchema],
    paymentType: String,
    address: Schema.Types.Mixed,
    status: String,
});

const Order = mongoose.model("orders", orderSchema);
module.exports = Order;
const mongoose = require('mongoose');
const {Schema} = require("mongoose");
const cartSchema = new mongoose.Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'users'},
    productId: {type: Schema.Types.ObjectId, ref: 'products'},
    quantity: {type: Number},
});

const Cart = mongoose.model("carts", cartSchema);
module.exports = Cart;
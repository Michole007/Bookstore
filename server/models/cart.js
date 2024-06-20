import mongoose from "mongoose";

const cart_schema = new mongoose.Schema({
    name: String,
    color: {
        type: Array,
        default: []
    },
    price: Number,
    category: String,
    src: String,
    productId: String,
    quantity: Number,
    userId: String
});

const cart_model = mongoose.model('carts', cart_schema);

export default cart_model;
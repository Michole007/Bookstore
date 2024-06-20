import mongoose from "mongoose";

const product_schema = new mongoose.Schema({
    name: String,
    color: {
        type: Array,
        default: []
    },
    price: Number,
    category: String,
    src: String
});

const product_model = mongoose.model('products', product_schema);

export default product_model;
import mongoose from 'mongoose';

const order_schema = new mongoose.Schema({
    userId: String,
    placed_on: {
        type: Date,
        default: new Date
    },
    name: String,
    number: String,
    email: String,
    address: String,
    payment_method: String,
    your_orders: {
        type: Array,
        default: []
    },
    total_price: Number,
    payment_status: {
        type: String,
        default: 'pending'
    },
    city: String,
    country: String,
    state: String,
    pin_code: Number,
    address_2: String
});

const order_model = mongoose.model('order', order_schema);

export default order_model;
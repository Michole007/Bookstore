import Order_Model from "../models/order.js";
import Cart_Model from "../models/cart.js";
import mongoose from 'mongoose'

export const place_order = async (req, res) => {
    try {
        if (!req.id) return res.status(401).json({ msg: 'Unauthorized!' });
        
        // Provide the user ID as an ObjectId
        const userId = new mongoose.Types.ObjectId(req.body.userId);

        // Use userId for querying
        const order = await Order_Model.findOneAndUpdate({ userId }, req.body, { upsert: true, new: true });

        if (!order) res.status(400).json({ msg: 'Invalid order' });

        await Cart_Model.deleteMany({ userId: req.id });

        res.status(200).json({ order, msg: 'Order placed successfully....Your Cart list is now empty!' });
    } catch (error) {
        console.log(error);
    }
}

export const get_order = async (req, res) => {
    try {
        if (!req.id) return res.status(401).json({ msg: 'Unauthorized!' });

        const order = await Order_Model.findOne({ userId: req.id });

        res.status(200).json(order);
    } catch (error) {
        console.log(error);
    }
}
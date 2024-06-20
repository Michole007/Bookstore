import Cart_Model from "../models/cart.js";
import UserModel from "../models/index.js";

export const add_to_cart = async (req, res) => {
    try {
        if (!req.id) return res.status(401).json({ msg: 'Unauthorized' });
        
        const cart = await Cart_Model.create({ ...req.body });

        if (req.token) {
            const update_user_token = await UserModel.findByIdAndUpdate(req.id, { accessToken: req.token });

            res.status(200).json({ data: cart, msg: 'product added to cart!', result: update_user_token });
        } else {
            res.status(200).json({ data: cart, msg: 'product added to cart!' });
        }
    } catch (error) {
        console.log(error);
    }
}

export const get_all_carts = async (req, res) => {
    try {
        if (!req.id) return res.status(401).json({ msg: 'Unauthorized' });

        const carts = await Cart_Model.find({ userId: req.id });

        if (req.token) {
            const update_user_token = await UserModel.findByIdAndUpdate(req.id, { accessToken: req.token });

            res.status(200).json({ carts, result: update_user_token });
        } else {
            res.status(200).json(carts);
        }
    } catch (error) {
        console.log(error);
    }
} 

export const empty_cart = async (req, res) => {
    try {
        if (!req.id) return res.status(401).json({ msg: 'Unauthorized' });

        await Cart_Model.deleteMany({ userId: req.id });

        if (req.token) {
            const update_user_token = await UserModel.findByIdAndUpdate(req.id, { accessToken: req.token });

            res.status(200).json({ msg: 'cart emptied!', result: update_user_token });
        } else {
            res.status(200).json({ msg: 'cart emptied!' });
        }
    } catch (error) {
        console.log(error);
    }
}

export const remove_item_from_cart = async (req, res) => {
    try {
        if (!req.id) return res.status(401).json({ msg: 'Unauthorized' });

        await Cart_Model.findByIdAndDelete(req.params.id);

        if (req.token) {
            const update_user_token = await UserModel.findByIdAndUpdate(req.id, { accessToken: req.token });

            res.status(200).json({ msg: 'item removed from cart!', result: update_user_token });
        } else {
            res.status(200).json({ msg: 'item removed from cart!' });
        }
    } catch (error) {
        console.log(error);
    }
}

export const update_item_from_cart = async (req, res) => {
    try {
        if (!req.id) return res.status(401).json({ msg: 'Unauthorized' });

        const cart = await Cart_Model.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (req.token) {
            const update_user_token = await UserModel.findByIdAndUpdate(req.id, { accessToken: req.token });

            res.status(200).json({ data: cart, msg: 'Cart item updated!', result: update_user_token });
        } else {
            res.status(200).json({ data: cart, msg: 'Cart item updated!' });
        }
    } catch (error) {
        console.log(error);
    }
}
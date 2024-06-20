import Stripe from "stripe";
import Order_Model from "../models/order.js";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import UserModel from "../models/index.js";
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_KEY);

export const create_checkout_session = async (req, res) => {
    try {
        if (!req.id) return res.status(401).json({ msg: 'Unauthorized!' });

        let line_items = await Order_Model.findOne({ userId: req.id });

        //console.log(line_items.your_orders);

        line_items = [...line_items.your_orders.map((item) => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        description: item.category,
                        images: [item.src]
                    },
                    unit_amount: item.price // Amount in cents (e.g., $10.00)
                },
                quantity: item.quantity
            }
        })];

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: 'https://e-commerce-bookstore-uqgv.vercel.app/orders?payment_status=success', // Redirect URL after successful payment
            cancel_url: 'https://e-commerce-bookstore-uqgv.vercel.app/orders?payment_status=failed',   // Redirect URL after canceled payment
        });

        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

export const verify_payment_status = async (req, res) => {
    try {
        if (!req.id) return res.status(401).json({ msg: 'Unauthorized!' });

        await Order_Model.findOneAndUpdate({ userId: req.id }, { payment_status: 'payment_confirmed' }, { new: true });

        const result = await UserModel.findById({ _id: req.id });

        //const token = jwt.sign({ id: result._id, email: result.email }, process.env.SECRET, { expiresIn: '1h' });
        //const encodedToken = btoa(token); // Encode the token using btoa
        const verificationUrl = `https://e-commerce-bookstore-uqgv.vercel.app/payment_confirmation_email`;

        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: "smtp.forwardemail.net",
            port: 465,
            secure: true,
            service: 'Gmail', // e.g., 'Gmail'
            auth: {
                user: 'oyedepokehinde2016@gmail.com',
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        // Compose the email
        const mailOptions = {
            from: 'oyedepokehinde2016@gmail.com',
            to: result.email,
            subject: 'Email Verification',
            html: `<p>Hello ${result.username}, your payment has been confirmed.</p>`,
        };

        // Send the email
        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ msg: 'Error sending validation email' })
            } else {
                console.log('Email sent: ' + info.response);
                if (req.token) {
                    const update_user_token = await UserModel.findByIdAndUpdate(req.id, { accessToken: req.token });

                    res.status(200).json({ msg: "Order placed! You will receive an email confirmation.", result: update_user_token });
                } else {
                    res.status(200).json({ msg: "Order placed! You will receive an email confirmation." });
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
}

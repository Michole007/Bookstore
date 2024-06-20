import bcrypjs from 'bcryptjs';
import UserModel from '../models/index.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const signup = async (req, res) => {
    try {
        //req.body
        const { username, email, password, confirm_password } = req.body;

        //check to see if the user's data already in the database
        const user = await UserModel.findOne({ email });

        if (user) return res.status(400).json({ msg: `Email already exist in the database ${email}` });

        if (password !== confirm_password) return res.status(400).json({ msg: `The two password does not match!` });

        const hash_password = bcrypjs.hashSync(password, 10);

        const result = await UserModel.create({ username, email, password: hash_password });

        const accessToken = jwt.sign({ id: result._id, email: result.email }, process.env.SECRET, { expiresIn: '1h' });
       
        const encodedToken = btoa(accessToken); // Encode the token using btoa
        
        const verificationUrl = `https://e-commerce-bookstore-uqgv.vercel.app/email_verification/${encodedToken}`;

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
            html: `<p>Hello ${result.username}, please click <a href="${verificationUrl}">here</a> to validate your account.
            Note that the token will only last for an hour.</p>`,
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ msg: 'Error sending validation email' })
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({
                    msg: `User registered successfully. Check your email for validation instructions. ${result.email}
                . Note that the token for the email verification will only last for an hour.` });
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export const signin = async (req, res) => {
    try {
        //grab the client's data
        //req.body
        const { email, password } = req.body;

        //check to see if the user's data already in the database
        let result = await UserModel.findOne({ email });

        if (!result) return res.status(400).json({ msg: `The user's email is not in our database ${email}` });

        //check to see if the entered password matches the password from the db
        const hash = result.password; //the password from the database

        const password_true = bcrypjs.compareSync(password, hash);

        if (!password_true) return res.status(400).json({ msg: `Password incorrect!` });

        const accessToken = jwt.sign({ id: result._id, email: result.email }, process.env.SECRET, { expiresIn: '1h' });

        result = await UserModel.findByIdAndUpdate(result?._id, { accessToken }, { new: true });

        //const refreshToken = jwt.sign({ id: result._id, email: result.email }, process.env.SECRET, { expiresIn: '7d' });

        res.status(200).json({ result });
    } catch (error) {
        console.log(error);
    }
}

export const verify_email = async (req, res) => {
    const token = req.params.token;

    try {
        const decodedToken = jwt.verify(token, 'secret');
        
        // Check if token has expired
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTime) return res.status(400).json({ msg: 'Expired token' });

        const accessToken = jwt.sign({ id: decodedToken.id, email: decodedToken.email }, process.env.SECRET, { expiresIn: '1h' });

        // Use the decodedToken to verify and update user status
        // For example, set user's status to "verified" in the database
        const result = await UserModel.findByIdAndUpdate(decodedToken?.id, { status: 'verified', accessToken }, { new: true });

        return res.json({ msg: 'Email successfully verified', result });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'Invalid or expired token' });
    }
}

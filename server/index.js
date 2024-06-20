import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/index.js';
import Product_model from './models/products.js';
import data from './data.js';
import products from './routes/product.js';
import cartRoute from './routes/cart.js';
import dotenv from 'dotenv';
import orderRoute from './routes/order.js';
import checkoutRoute from './routes/checkout.js';

const app = express();
dotenv.config();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(cors({
    origin: 'https://e-commerce-bookstore-uqgv.vercel.app'
}));

app.get('/', (req, res) => {
    res.send('hello world');
})

const add_products = async () => {
    try {
        const products = await Product_model.insertMany(data);

        console.log(products);
    } catch (error) {
        console.log(error);
    }
}

//add_products();

app.use('/users', routes);
app.use('/products', products);
app.use('/cart', cartRoute);
app.use('/order', orderRoute);
app.use('/checkout', checkoutRoute);

const CONNECTION_URI = process.env.CONNECTION_URI;

const PORT = process.env.PORT;

mongoose.connect(CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen((PORT), () => console.log(`Server listening on PORT ${PORT}`)))
    .catch((err) => console.error(err));

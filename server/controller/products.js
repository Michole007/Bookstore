import Product_model from "../models/products.js"

export const all_products = async (req, res) => {
    try {
        const products = await Product_model.find().limit(req.query._limit);

        res.status(200).json({ data: products });
    } catch (error) {
        console.log(error);
    }
}

export const search_for_an_item = async (req, res) => {
    try {
        console.log(req.id);

        if (!req.id) return res.status(401).json({ msg: 'Unauthorized' });

        const searchQuery = new RegExp(req.query.search, "i");

        const products = await Product_model.find({
            $or: [
                { name: searchQuery },
                { color: { $in: [searchQuery] } },
                { category: searchQuery }
            ]
        });

        res.status(200).json({ data: products, msg: `found ${products.length} compatible products!` });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}
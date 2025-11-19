import Product from "../models/product.js";


export const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.json(product);
    } catch (err) {
        res.status(400).json({ message: err.message});
    }
};
export const getProducts = async (req, res) =>{
    const products = await Product.find();
    res.json(products);
};
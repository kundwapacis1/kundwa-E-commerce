import cart from "../models/cart.js";

export const getCart = async (req, res) =>{
    const cart = await cart.finfOne({ user: req.user._id }).populate("items.populate");
    res.json(cart);
};
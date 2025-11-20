import Cart from "../models/cart.js";

// GET CART
export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

        res.json(cart || { user: req.user._id, items: [] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ADD TO CART
export const addToCart = async (req, res) => {
    try {
        const { product, quantity } = req.body;

        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            // create new cart
            cart = await Cart.create({
                user: req.user._id,
                items: [{ product, quantity }],
            });
        } else {
            // check if product already exists
            const itemIndex = cart.items.findIndex(
                (item) => item.product.toString() === product
            );

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ product, quantity });
            }

            await cart.save();
        }

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// REMOVE FROM CART
export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;

        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = cart.items.filter(
            (item) => item.product.toString() !== productId
        );

        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

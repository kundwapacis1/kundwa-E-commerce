import Order from "../models/order.js";
import Cart from "../models/cart.js";

export const createOrder = async (req, res) => {
    const  cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

    if (!cart || cart.items.length === 0) return res.status(400).json({ message: "Cart empty"});
    const total = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    const order = await Order.create({
        user: req.user._id,
        items: cart.items.map(item => ({ product: item.product._id, quantity: item.quantity})),
        total
    });
    cart.items = [];
    await cart.save();

    res.json(order);
};
export const getUserOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user_id}).populate("items.product");
    res.json(orders);
};
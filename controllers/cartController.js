import cart from "../models/cart.js";

export const getCart = async (req, res) =>{
    const cart = await cart.finfOne({ user: req.user._id }).populate("items.populate");
    res.json(cart);
};

export const addTocart = async (req, res) => {
    const { product, quantity} = req.body;
    let cart = await cart.findOne({ user: req.user._id});

    if (!cart) {
        cart = await cart.create({user: req.user._id, items: [{product, quantity}] });
    } else {
        const itemIndex = cart.items.findIndex(item.product.toString() === product);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product, quantity });
        }
        await cart.save();
    }
    res.json(cart);
};

export const removeFromCart = async (req, res) => {
    const { productId } = req.params;
    const cart =  await cart.findOne({ user: req.user._id });

    if (!cart) return res.status(404).json({ message: "Cart not found"});
    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();
    res.json(cart);
}
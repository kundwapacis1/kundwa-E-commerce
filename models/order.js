import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
   user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
   items: [
    {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product"},
        quantity: Number
    }
   ],
   total: Number,
   status: { type: String, default: "pending"}
},
{timestamps: true});

export default mongoose.model("Order", orderSchema);
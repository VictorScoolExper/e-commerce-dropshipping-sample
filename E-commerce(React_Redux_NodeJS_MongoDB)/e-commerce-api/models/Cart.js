const mongoose = require("mongoose");

const SingleCartItemSchema = mongoose.Schema({
    name: {type:String, required: true},
    image: {type:String, required: true},
    price: {type:Number, required: true},
    amount: {type:Number, required: true},
    product:{
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true,
    }
})

const CartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId, 
            ref: 'User',
            require: true,
            unique: true
        },
        products: [SingleCartItemSchema],
    },
    {timestamps: true}
);

module.exports = mongoose.model("Cart", CartSchema);
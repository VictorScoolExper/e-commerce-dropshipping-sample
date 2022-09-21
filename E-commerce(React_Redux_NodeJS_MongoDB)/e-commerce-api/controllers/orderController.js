const Order = require('../models/Order');
const Product = require('../models/Product');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { checkPermissions } = require('../utils');


const getAllOrders = async (req, res) => {
    const orders = await Order.find({});

    res.status(StatusCodes.OK).json({ order: orders })
};

const getSingleOrder = async (req, res) => {
    const { id: orderId } = req.params

    const order = await Order.findOne({ _id: orderId });
    if (!order) {
        throw new CustomError.NotFoundError(`No order with id: ${orderId}`);
    }

    checkPermissions(req.user, order.user);

    res.status(StatusCodes.OK).json({ order })
}

const getCurrentUserOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user.userId })
    res.status(StatusCodes.OK).json({ orders, count: orders.length })
};

const fakeStripAPI = async ({ amount, currency }) => {
    const client_secret = "someRandomValue";
    return { client_secret, amount };
}

const createOrder = async (req, res) => {
    const { items: cartItems } = req.body

    if (!cartItems || cartItems.length < 1) {
        throw new CustomError.BadRequestError('No cart items provided')
    }
    
    let orderItems = [];
    let subtotal = 0;

    for (const item of cartItems) {
        const dbProduct = await Product.findOne({ _id: item.product })
        if (!dbProduct) {
            throw new CustomError.NotFoundError(`No product with id: ${item.product}`)
        }

        const { name, price, main_img, _id } = dbProduct;

        //console.log(name, price, image);
        const singleOrderItem = {
            amount: item.amount,
            name,
            price,
            image: main_img.img,
            product: _id
        };

        //add item to order
        orderItems = [...orderItems, singleOrderItem];
        //calculate subtotal
        subtotal += item.amount * price;
    }
    //console.log(orderItems);
    //console.log(subtotal);

    //calculate total
    const total =  subtotal;

    //get client secret
    const paymentIntent = await fakeStripAPI({
        amount: total,
        currency: 'usd'
    });

    const order = await Order.create({
        orderItems,
        total,
        subTotal: subtotal,
        clientSecret: paymentIntent.client_secret,
        user: req.user.userId,
    })

    res.status(StatusCodes.CREATED).json({ order, client_secret: order.clientSecret })
};

const updateOrder = async (req, res) => {
    const { id: orderId } = req.params;
    const {paymentIntentId} = req.body;

    const order = await Order.findOne({ _id: orderId });
    if (!order) {
        throw new CustomError.NotFoundError(`No order with id: ${orderId}`);
    }
    checkPermissions(req.user, order.user);

    order.paymentIntentId = paymentIntentId;
    order.status = 'paid',
    await order.save();

    res.status(StatusCodes.OK).json({ order })
};

module.exports = {
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    createOrder,
    updateOrder
}
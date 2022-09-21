const Cart = require("../models/Cart");
const Product = require("../models/Product");

const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");

const getAllCart = async (req, res) => {
  const {} = req.body;
  const allCartItems = await Cart.find({});

  res.status(StatusCodes.OK).json({ cart: allCartItems });
};

const getSingleCart = async (req, res) => {
  const { id: userId } = req.params;

  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new CustomError.NotFoundError(`No cart with this account: ${cartId}`);
  }

  checkPermissions(req.user, cart.user);

  res.status(StatusCodes.OK).json({ cart });
};

const createCart = async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(StatusCodes.OK).json({ savedCart });
  } catch (error) {
    throw new CustomError.BadRequestError("Could not save cart");
  }
};

const updateCart = async (req, res) => {
  const { id: userId } = req.params;

  const updatedCart = await Cart.findOneAndUpdate({ user: userId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedCart) {
    throw new CustomError.NotFoundError(`No product with id: ${productId}`);
  }

  res.status(StatusCodes.OK).json(updatedCart);
};

const deleteCart = async (req, res) => {
  const { id: userId } = req.params;

  const {_id: cartId} = await Cart.findOne({user: userId});

  await Cart.findByIdAndDelete(cartId);
  res.status(StatusCodes.OK).json("Cart has been deleted");
};

module.exports = {
  getAllCart,
  getSingleCart,
  createCart,
  updateCart,
  deleteCart,
};

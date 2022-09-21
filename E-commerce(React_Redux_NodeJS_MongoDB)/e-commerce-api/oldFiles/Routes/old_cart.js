const Cart = require("../../models/Cart");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require("../../routes/verifyToken");

const router = require("express").Router();

// Create Cart
router.post("/", verifyToken, async (req, res)=>{
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (error) {
        res.status(500).json(error);
    }
})

// update Cart
router.put("/:id", verifyTokenAndAuthorization, async (req, res)=>{

    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, 
        { new: true }
        );
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json(err);
    }
});
// delete Cart
router.delete("/:id", verifyTokenAndAuthorization, async (req, res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted");
    } catch (error) {
        res.status(500).json(error);
    }
});
// get user Cart
router.get("/find/:userid", verifyTokenAndAuthorization,async (req, res)=>{
    try {
        const cart = await Cart.find({userId: req.params.userId});
        
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(error);
    }
});

// get all Cart
router.get("/", verifyTokenAndAdmin, async (req, res)=>{
    try {
        const carts = await Cart.find();
        res.status(200).json(carts)
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;
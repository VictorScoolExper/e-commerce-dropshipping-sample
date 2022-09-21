const express = require('express');
const router = express.Router();
const {authenticateUser, authorizePermissions} = require('../middleware/authentication');

const {
    getAllCart,
    getSingleCart,
    createCart,
    updateCart,
    deleteCart
} = require('../controllers/cartController');

router
    .route('/')
    .get(authenticateUser, authorizePermissions('admin'), getAllCart)
    .post(authenticateUser, createCart);

router
    .route('/:id')
    .get(authenticateUser, getSingleCart)
    .patch(authenticateUser, updateCart)
    .delete(authenticateUser, deleteCart)

module.exports = router;

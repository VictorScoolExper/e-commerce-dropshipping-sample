const express = require('express');
const router = express.Router();
const {authenticateUser, authorizePermissions} = require('../middleware/authentication');
const {
    createInfluencer,
    getAllInfluencer,
    getSingleInfluencer,
    updateInfluencer,
    deleteInfluencer
} = require('../controllers/influencerController');

router
    .route('/')
    .post([authenticateUser, authorizePermissions('admin')], createInfluencer)
    .get([authenticateUser, authorizePermissions('admin')], getAllInfluencer);

router
    .route('/:id')
    .get([authenticateUser, authorizePermissions('admin')], getSingleInfluencer)
    .patch([authenticateUser, authorizePermissions('admin')], updateInfluencer)
    .delete([authenticateUser, authorizePermissions('admin')], deleteInfluencer);

module.exports = router;
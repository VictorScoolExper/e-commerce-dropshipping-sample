const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const {createTokenUser, attachCookiesToResponse, checkPermissions} = require('../utils');

const getAllUsers = async (req, res) =>{
    console.log(req.user);
    const users = await User.find({role:'user'}).select('-password')
    res.status(StatusCodes.OK).json({users});
}

const getSingleUser = async (req, res) =>{
    const user = await User.findOne({_id:req.params.id}).select('-password');
    if(!user){
        throw new CustomError.NotFoundError(`No user with id: ${req.params.id}`);
    }
    checkPermissions(req.user, user._id);
    res.status(StatusCodes.OK).json({user});
}

const showCurrentUser = async (req, res) =>{
    res.status(StatusCodes.OK).json({user: req.user})
}

//update user with user.save
const updateUser = async (req, res) =>{

    const {name, lastname, cellphone_number, username} = req.body;
    if(!name || !lastname || !cellphone_number || !username ){
        throw new CustomError.BadRequestError('Please provide all values')
    }
    const user = await User.findOne({_id:req.user.userId});

    user.name = name;
    user.lastname = lastname;
    user.cellphone_number = cellphone_number;
    user.username = username;

    await user.save()

    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({res, user:tokenUser})
    res.status(StatusCodes.OK).json({user:tokenUser})
}

const updateUserPassword = async (req, res) =>{
    const {oldPassword, newPassword} = req.body;
    if(!oldPassword || !newPassword){
        throw new CustomError.BadRequestError('Please provide both values')
    }

    const user = await User.findOne({_id:req.user.userId});

    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if(!isPasswordCorrect){
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }

    user.password = newPassword;

    await user.save();
    res.status(StatusCodes.OK).json({msg: 'Success, password updated'});
}

// TODO update profile img

// TODO Update Email

// TODO Update Phone Number

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}
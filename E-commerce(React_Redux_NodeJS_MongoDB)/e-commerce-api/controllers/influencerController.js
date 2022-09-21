const Influencer = require('../models/Influencer');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');

const createInfluencer = async (req, res) =>{
    req.body.user = req.user.userId;
    const influencer = await Influencer.create(req.body);
    res.status(StatusCodes.CREATED).json({ influencer });
}

const getAllInfluencer = async (req, res) =>{
    const influencers = await Influencer.find({});

    res.status(StatusCodes.OK).json({ influencers, count: influencers.length });
}

const getSingleInfluencer = async (req, res) =>{
    const { id: influencerId } = req.params;
    const influencer = await Influencer.findOne({ _id: influencerId });

    if(!influencer){
        throw new CustomError.NotFoundError(`No influencer with id: ${influencerId}`);
    }

    res.status(StatusCodes.OK).json({influencer})
}

const updateInfluencer = async (req, res) =>{
    const {id: influencerId} = req.params;

    const influencer = await Influencer.findOneAndUpdate(
        {_id: influencerId},
        req.body,
        { new: true, runValidators: true }
    );

    if(!influencer){
        throw new CustomError.NotFoundError(`No influencer with id: ${influencerId}`);
    }

    res.status(StatusCodes.OK).json({influencer});
}

const deleteInfluencer = async (req, res) =>{
    const {id: influencerId} = req.params;

    const influencer = await Influencer.findOne({_id: influencerId});

    if(!influencer){
        throw new CustomError.NotFoundError(`Influencer with id: ${influencerId}`);
    }

    await influencer.remove();
    res.status(StatusCodes.OK).json({msg: 'Influencer Successfully deleted'});
}

module.exports = {
    createInfluencer,
    getAllInfluencer,
    getSingleInfluencer,
    updateInfluencer,
    deleteInfluencer
}
const mongoose = require('mongoose');
const validator = require('validator');

const InstagramAccountSchema = new mongoose.Schema({
    profile_name : {
        type: String,
        unique: true,
        required: [true, 'Please provide instagram profile'],
    },
    instagram_url: {
        type: String,
        unique: true,
        required: [true, 'Please provide instagram link'],
        validate: {
            validator: validator.isURL,
            message: 'Please provide a valid instagram URL'
        }
    }
})

const InfluencerSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Please provide influencer name'],
        minlength: 3,
        maxlength: 50
    },
    lastname : {
        type: String,
        required: [true, 'Please provide influencer lastname'],
        minlength: 3,
        maxlength: 50
    },
    instagram: InstagramAccountSchema,
    city : {
        type: String,
        required: [true, 'Please provide influencer city'],
        minlength: 3,
        maxlength: 50
    },
    state : {
        type: String,
        required: [true, 'Please provide influencer state'],
        minlength: 3,
        maxlength: 50
    },
    cellphone : {
        type: String,
        unique: true,
        minlength: 10,
        maxlength: 13,
        required: [true, 'Please provide a phone number']
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Influencer', InfluencerSchema);
const mongoose = require("mongoose");
const validator = require('validator');

const ProductImageSchema = new mongoose.Schema(
    {
        img: {
           type: String,
           required: [true, "Please provide a image"]
        },
        img_credit: {
            type: String,
            required: [true, "Please provide image credits"]
        },
        // model: {
        //     type: mongoose.Types.ObjectId,
        //     ref: 'Influencer',
        //     required: false,
        // }
    }
);

const  ColorSchema = new mongoose.Schema(
    {
        name_color: {
            type: String,
            required: [true, 'Please a color name'],
        },
        color_hex: {
            type: String,
            unique: true,
            required: [true, 'Please a color hex'],
            validate:{
                validator: validator.isHexColor,
                message: 'Please provide a valid color hex',
            } 
        },
    }
);

const AliexpressProductSchema = new mongoose.Schema(
    {
        aliexpress_productid : {
            type: String,
            required: [true, 'Please provide aliexpress product id']
        },
        aliexpress_price: {
            type: Number,
            required: [true, 'Please product aliexpress price']
        },
        aliexpres_link: {
            type: String,
            required: [true, 'Please provide an aliexpress link']
        }
    }
)

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String, 
            required: true, 
            unique: true
        },
        desc: {
            type: String,
            required: true,
        },
        main_img: ProductImageSchema,
        aliexpress_products_info : [AliexpressProductSchema],
        list_img: [ProductImageSchema],
        category: {
            type: [String],
            required: [true, 'Please provide a category'],
            enum: [
                'accesories', 
                'shoes', 
                'blouses', 
                'dress', 
                'pants', 
                'shirts', 
                'coats', 
                'sweaters',
                'shirts',
                'outfits',
                'bags',
                'swimsuits'
            ]
        },
        size: {
            type: [String],
            required: [true, 'Please provide a size'],
            enum: ['xs', 's', 'm', 'l', 'xl', 'xxl']
        },
        colors: {
            type: [ColorSchema],
            required: [true, 'Please provide all colors'], 
        },
        featured: {
            type: Boolean,
            default: false,
        },
        inventory: {
            type: Number,
            required: true, 
            default: 15,
        },
        price: {
            type: Number,
            required: [true, 'Please provide a product price'],
            default:300
        },
        
    },
    {timestamps: true}
);

module.exports = mongoose.model("Product", ProductSchema);
const express = require("express");
const app = express();

//express async errors is like a trycatch for controllers automatic o setup middleware
require('express-async-errors');

// mongodb packages
const mongoose = require("mongoose");

//rest of packages
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

dotenv.config();
//database connection
const connectDB = require('./db/connect');

// routers
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const cartRoute = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoute");
const influencerRoute = require("./routes/influencerRoute");

//middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// express
app.use(cors());
app.use(express.json());
app.use(mongoSanitize());

app.set('trust proxy',1);
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
}));

//morgan  is a middleware http request logger.
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static('./public'));

app.get('/', (req, res)=>{    
    res.send('e-commerce api');
});

app.get('/api/v1', (req, res)=>{    
    //console.log(req.cookies);
    console.log(req.signedCookies);
    res.send('e-commerce api');
});

// routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/influencers", influencerRoute);

//the not found should popup before error middleware(404 has no next)
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000
const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URL)
                .then(() => console.log("db connection succesfull"))

        app.listen(port, console.log( `Server is listening to ${port}....`))
    } catch (error) {
        console.log(error);
    }
}
start();

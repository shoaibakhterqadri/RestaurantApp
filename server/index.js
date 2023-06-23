import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import userRoutes from './route/User.js'
import offerRoutes from './route/Offer.js'
import dishRoutes from './route/Dish.js'
import feedbackRoutes from './route/Feedback.js'
import cartRoute from './route/Cart.js'


/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(cors({ origin: "*" }));
cloudinary.v2.config({
    cloud_name: "dizikuakt",
    api_key: "951227695453944",
    api_secret: "Fr1ccq3WfRoUydXWWoKy5s7NaVk",
});
app.use("upload", express.static("upload"));
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use(cookieParser());


/* ROUTES */
app.use("/user", userRoutes);
app.use("/offer", offerRoutes);
app.use("/dish", dishRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/cart", cartRoute);


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
    .connect('mongodb+srv://huzaifa:huzaifa@cluster0.p2sb1ug.mongodb.net/foodapp?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    })
    .catch((error) => console.log(`${error} did not connect`));

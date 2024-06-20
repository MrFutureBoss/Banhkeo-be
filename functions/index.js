import express from "express";
import morgan from "morgan";
import createError from "http-errors";
import dotenv from "dotenv";
import connectDB from "./helpers/init_mongodb.js";
import UserRouter from "./router/User.js";
import ProductRouter from "./router/Product.js";
import cors from 'cors';
import serverless from 'serverless-http';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, preflightContinue: true }));

app.get("/", async (req, res) => {
    res.send("Hello Mai Tu");
});

app.use('/user', UserRouter);
app.use('/product', ProductRouter);

app.use(async (req, res, next) => {
    next(createError.NotFound());
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    });
});

// If running on Netlify, don't listen on a port
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        connectDB();
        console.log(`Server running on port ${PORT}`);
    });
}

export const handler = serverless(app);

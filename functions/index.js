import express from "express";
import morgan from "morgan";
import createError from "http-errors";
import dotenv from "dotenv";
import connectDB from "./helpers/init_mongodb.js";
import UserRouter from "./router/User.js";
import ProductRouter from "./router/Product.js";
import BillRouter from "./router/Bill.js";
import paymentRouter from "./router/payment.router.js";
import cors from 'cors'
import PayOS from "@payos/node";

const payos = new PayOS(
    "ec773e72-b599-45b2-9441-17f41418b1d2",
    "86f5f281-1723-4e09-8754-ac7675ca96c5",
    "7f09d502bd89a3bea6921eedc9e9fd489ca45c3c6178ee82245a5aac57c2c3fe");


dotenv.config();
//WEBPORT = http://localhost:3000
//OFFICALWEBPORT = https://main--banhkeohatung.netlify.app
const PORT = process.env.PORT;
const app = express();
const WEBPORT = process.env.WEBPORT;
const OFFICALWEBPORT = process.env.OFFICALWEBPORT;


app.post('/create-payment-link', async (req, res) => {
    const order = {
        amount: 12000,
        description: 'Thanh toan oke',
        orderCode: 13,
        returnUrl: `${WEBPORT || OFFICALWEBPORT}/success`,
        cancelUrl: `${WEBPORT || OFFICALWEBPORT}/cancel`
    };
    const paymentLink = await payos.createPaymentLink(order);
    res.redirect(303, paymentLink.checkoutUrl)
})

app.post("/receive-hook", async (req, res) => {
    console.log(req.body);
    res.json();
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, preflightContinue: true }));
//Router:
app.get("/", async (req, res) => {
    res.send("Hello Mai Tu");
});
app.use('/user', UserRouter);
app.use('/product', ProductRouter);
app.use('/payment', paymentRouter);
app.use('/bill', BillRouter);
app.use(async (req, res, next) => {
    next(createError.NotFound());
})


app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    });
});

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
})
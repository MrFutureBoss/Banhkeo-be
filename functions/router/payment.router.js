import express from 'express';
import { payOS } from '../config/payos.config.js';
import BaseController from '../base/base.controller.js';

const paymentRouter = express.Router();

paymentRouter.post('/create-payment-link', async (req, res) => {
  const YOUR_DOMAIN = 'http://localhost:3000';
  const { amount } = req.body;
  console.log(amount);
  const body = {
    orderCode: Number(String(Date.now()).slice(-6)),
    amount: amount,
    description: 'Thanh toan don hang',
    returnUrl: `${YOUR_DOMAIN}/payment/success?amount=${amount}`,
    cancelUrl: `${YOUR_DOMAIN}/payment/fail`,
  };
  console.log(body);

  try {
    const paymentLinkResponse = await payOS.createPaymentLink(body);
    const base = new BaseController();
    base.success(req, res)({ paymentLink: paymentLinkResponse.checkoutUrl, amount: amount });
  } catch (error) {
    console.error(error);
    res.send('Something went error');
  }
});

export default paymentRouter;

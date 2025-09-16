const express = require('express');
const Razorpay = require('razorpay');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
    key_id: 'YOUR_KEY_ID',
    key_secret: 'YOUR_KEY_SECRET'
});

app.post('/create-order', async (req, res) => {
    const { amount } = req.body; // amount in rupees
    const order = await razorpay.orders.create({
        amount: amount * 100, // paise
        currency: 'INR',
        payment_capture: 1
    });
    res.json(order);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

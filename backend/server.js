const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../"))); // serve all frontend files (html, css, js)

// 👉 Razorpay setup
const razorpay = new Razorpay({
  key_id: "YOUR_KEY_ID",     // replace with your Razorpay key_id
  key_secret: "YOUR_SECRET", // replace with your Razorpay key_secret
});

// ✅ Serve payment.html directly
app.get("/payment", (req, res) => {
  res.sendFile(path.join(__dirname, "../payment.html"));
});

// ✅ Create order
app.post("/create-order", async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // amount in paisa
      currency: "INR",
      receipt: "rcpt_" + Date.now(),
    };
    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id, key: razorpay.key_id });
  } catch (error) {
    res.status(500).send(error);
  }
});

// ✅ Verify payment
app.post("/verify-payment", (req, res) => {
  const { order_id, payment_id, signature, student } = req.body;
  const body = order_id + "|" + payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", razorpay.key_secret)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === signature) {
    console.log("✅ Payment Verified for student:", student);
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));

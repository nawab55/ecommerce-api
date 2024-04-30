const Razorpay = require('razorpay');
require('dotenv').config();

apiKey=process.env.RAZORPAY_KEY_ID;
apiSecret=process.env.RAZORPAY_KEY_SECRET;

const razorpay = new Razorpay({
    key_id: apiKey,
    key_secret: apiSecret,
  });


  module.exports=razorpay;
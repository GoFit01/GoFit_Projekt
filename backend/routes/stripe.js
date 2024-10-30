const router = require("express").Router();
require("dotenv").config();
const stripe = require("stripe")("sk_test_51Q8gHHE0Esp4B2xrF11xgYxYezWxwroI4zJYCmoApIeCW48Fty1Cd7SMYVqVh6ktPD7DbQUulmy1pUtI4KzE0qZU00qWGO01lX");


router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;

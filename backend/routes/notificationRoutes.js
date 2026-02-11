const express = require("express");
const router = express.Router();

const {
  subscribe,
  unsubscribe,
  getSubscriptionStatus,
} = require("../controllers/notificationController");

const auth = require("../middlewares/authMiddleware");

router.get("/status", auth, getSubscriptionStatus);
router.post("/subscribe", auth, subscribe);
router.post("/unsubscribe", auth, unsubscribe);
module.exports = router;

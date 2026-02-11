const Subscription=require("../models/subscriptionModel");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");

/*
SUBSCRIBE USER (LOGIN REQUIRED)
- fetch email from DB (secure)
- create subscription if not exists
- if exists, just activate it
*/
exports.subscribe = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // find logged-in user
    const user = await User.findById(userId).select("email name");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // check if already subscribed
    let subscription = await Subscription.findOne({ user: userId });

    if (subscription) {
      subscription.isActive = true;
      subscription.email = user.email; // update in case email changed
      await subscription.save();

      return res.json({ message: "Subscription activated again" });
    }

    // create new subscription
    subscription = await Subscription.create({
      user: userId,
      email: user.email,
      isActive: true,
    });

    res.status(201).json({
      message: "Subscribed successfully",
      subscription,
    });
  } catch (err) {
    next(err);
  }
};

/*
UNSUBSCRIBE USER (LOGIN REQUIRED)
- just sets isActive = false
*/
exports.unsubscribe = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const subscription = await Subscription.findOne({ user: userId });

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    subscription.isActive = false;
    await subscription.save();

    res.json({ message: "Unsubscribed successfully" });
  } catch (err) {
    next(err);
  }
};

/*
GET SUBSCRIPTION STATUS (LOGIN REQUIRED)
- returns whether user is subscribed or not
*/
exports.getSubscriptionStatus = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const subscription = await Subscription.findOne({ user: userId });

    if (!subscription) {
      return res.json({ isSubscribed: false });
    }

    res.json({ 
      isSubscribed: subscription.isActive,
      subscription: {
        email: subscription.email,
        createdAt: subscription.createdAt,
      }
    });
  } catch (err) {
    next(err);
  }
};

/*
NOTIFY SUBSCRIBERS ABOUT NEW BLOG
- fetch all active subscribers
- send email to each one
- used internally when new blog is published
*/
exports.notifySubscribers = async (blogTitle, blogSlug) => {
  try {
    // get all active subscriptions
    const subscriptions = await Subscription.find({ isActive: true });

    if (subscriptions.length === 0) {
      console.log("No active subscribers to notify");
      return;
    }

    console.log(`Found ${subscriptions.length} active subscribers. Sending notifications...`);

    // prepare email content
    const subject = `New Blog Post: ${blogTitle}`;
    const blogUrl = `https://999th-op-cheonma.vercel.app/blogs/${blogSlug}`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Blog Post Published!</h2>
        <p>Hi there,</p>
        <p>A new blog post has been published on ManhwaSensei:</p>
        <h3 style="color: #646cff;">${blogTitle}</h3>
        <p>
          <a href="${blogUrl}" 
             style="display: inline-block; padding: 12px 24px; background-color: #646cff; color: white; text-decoration: none; border-radius: 5px;">
            Read Now
          </a>
        </p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
        <p style="font-size: 12px; color: #666;">
          You're receiving this because you subscribed to ManhwaSensei notifications.
          <br>
          <a href="https://999th-op-cheonma.vercel.app/subscription" style="color: #646cff;">Manage your subscription</a>
        </p>
      </div>
    `;

    // send email to all subscribers
    let successCount = 0;
    let failureCount = 0;

    for (const sub of subscriptions) {
      try {
        await sendEmail(sub.email, subject, html);
        successCount++;
        console.log(`✓ Email sent to ${sub.email}`);
      } catch (err) {
        failureCount++;
        console.error(`✗ Failed to send email to ${sub.email}:`, err.message);
      }
    }

    console.log(`Notifications completed: ${successCount} sent, ${failureCount} failed`);
  } catch (err) {
    console.error("Error notifying subscribers:", err.message);
  }
};

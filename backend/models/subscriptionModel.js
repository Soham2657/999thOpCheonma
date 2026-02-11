const { default: mongoose } = require("mongoose");

/*
Subscription model:
- tracks who wants notifications
- separate from user for clean logic
*/
 const subscriptionSchema=mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    email: String,
    isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
 )
 module.exports = mongoose.model("Subscription", subscriptionSchema);
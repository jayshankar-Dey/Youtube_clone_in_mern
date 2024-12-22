const mongoose = require("mongoose");

const NotificationsSchema = new mongoose.Schema({
    text: {
        type: String
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    reciverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    seen: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


const Notifications = mongoose.model("Notifications", NotificationsSchema)
module.exports = Notifications
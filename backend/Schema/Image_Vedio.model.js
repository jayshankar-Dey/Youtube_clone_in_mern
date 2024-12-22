const mongoose = require("mongoose");

const VedioSchema = new mongoose.Schema({

    image: {
        url: String,
        public_id: String
    },
    vedio: {
        url: String,
        public_id: String
    },
    text: {
        type: String
    },
    name: {
        type: String
    },
    tags: [{ type: String }],
    isimage: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    username: {
        type: String
    },
    profile: {
        type: String
    },
    Like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }],
    disLike: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }],
    view: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }],
    playlists: {
        type: Boolean,
        default: false
    },
    playlists_vedios: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vedios"
        }
    }],

}, {
    timestamps: true
})


const Vedios = mongoose.model("Vedios", VedioSchema)
module.exports = Vedios
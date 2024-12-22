const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profile: {
        url: String,
        public_id: String
    },
    password: {
        type: String,
        required: true
    },
    des: {
        type: String
    },
    otp: {
        type: Number,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    vedios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vedios"
    }],
    subscribe: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }],
    subscribers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }],
    view: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vedios"
    }],
    Like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vedios"
    }],
    Watch_Later: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vedios"
    }],
    online: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
})

UserSchema.pre('save', async function(next) {
    const user = this
    if (!user.isModified("password")) next()
    user.password = await bcrypt.hash(user.password, 10)
})
UserSchema.methods.generateToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT)
}
UserSchema.methods.CompaitePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

const Users = mongoose.model("Users", UserSchema)
module.exports = Users
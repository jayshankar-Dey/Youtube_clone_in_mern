////

const Email_Send = require("../package/emailSend")
const Users = require("../Schema/User.model")
const jwt = require("jsonwebtoken");
const getFile = require("../config/getFile")
const cloudinary = require('cloudinary');
const Vedios = require("../Schema/Image_Vedio.model");
const Notifications = require("../Schema/Notification");
class UserController {

    register = async(req, res, next) => {
        try {
            const { email, name, password } = req.body
            if (!email || !name || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Please provide all required fields"
                })
            }
            const otp = Math.floor(900000 + Math.random() * 100000)
            const find = await Users.findOne({ email: email })
            if (find) {
                find.otp = otp;
                find.password = password
                const send = Email_Send(email, "Your  OTP", "Varify otp",
                    `<p>you cannot send otp from anather people</p>
                    <h1 style="paddig:.7rem">
                    ${otp}
                    </h1>`
                )
                await find.save()
                const secret = process.env.JWT + find._id
                const token = jwt.sign({ Email: find.email }, secret, {
                    expiresIn: 120
                })
                if (send) {
                    return res.json({
                        success: true,
                        message: "Otp sent successfully",
                        find,
                        token
                    })
                }
            } else {
                const user = await Users.create({ email, name, password, otp })
                const send = Email_Send(email, "Your  OTP", "Varify otp",
                    `
                    <p>you cannot send otp from anather people</p>
                    <h1 style="paddig:.7rem">
                    ${otp}
                    </h1>`
                )
                const secret = process.env.JWT + user._id
                const token = jwt.sign({ Email: user.email }, secret, {
                    expiresIn: 120
                })

                if (send) {
                    return res.json({
                        success: true,
                        message: "otp sent successful",
                        user,
                        token
                    })
                }
            }
        } catch (error) {
            next(error)
        }
    }

    ///login user
    Login = async(req, res, next) => {
            try {
                const { email, password } = req.body;
                const find = await Users.findOne({ email: email })
                const otp = Math.floor(900000 + Math.random() * 100000)
                if (!find) return res.json({
                    success: false,
                    message: "Please enter valide email and password"
                })
                const compare = await find.CompaitePassword(password)
                if (!compare) return res.json({
                    success: false,
                    message: "Please enter valide email and password"
                })
                find.otp = otp;
                find.verified = false;
                await find.save()
                const secret = process.env.JWT + find._id
                const token = jwt.sign({ Email: find.email }, secret, {
                    expiresIn: 120
                })
                const send = Email_Send(email, "Your  OTP", "Varify otp",
                    `<p>you cannot send otp from anather people</p>
                    <h1 style="paddig:.7rem">
                    ${otp}
                    </h1>`
                )
                if (send) {
                    return res.json({
                        success: true,
                        message: "otp sent to your gmail successful",
                        token,
                        find
                    })
                } else {
                    return res.json({
                        success: true,
                        message: "otp sent failed",
                    })
                }
            } catch (error) {
                next(error)
            }
        }
        /////verify otp
    Verify_OTP = async(req, res, next) => {
        try {
            const { email, otp, token } = req.body;
            if (!email || !otp || !token) return res.json({
                success: false,
                message: "Please enter valide data"
            })
            const find = await Users.findOne({ email: email })
            const secret = process.env.JWT + find._id
            jwt.verify(token, secret, async(err, data) => {
                if (err) {
                    return res.json({
                        success: false,
                        message: "Please enter valide otp",
                    })
                } else {
                    if (data.Email !== email) return res.json({
                        success: false,
                        message: "Please enter valide otp",
                    })
                    const verify = find.otp == otp
                    if (!verify) return res.json({
                        success: false,
                        message: "Please enter valide otp",
                    })
                    find.verified = true
                    await find.save()
                    const Token = await find.generateToken()
                    return res.json({
                        success: true,
                        message: "otp Varify successful",
                        Token,
                        find
                    })
                }
            })


        } catch (error) {
            next(error)
        }
    }

    ///getUser
    getUser = async(req, res, next) => {
        try {
            const { id } = req.params
            const find = id ? { _id: id } : { _id: req.user }
            let user;
            if (id) {
                user = await Users.findById(id)
            } else {
                user = await Users.findById(req.user)
            }
            return res.json({
                success: true,
                message: "User get successfully",
                user
            })
        } catch (error) {
            next(error)
        }
    }

    ///update profile
    UpdateDetailes = async(req, res, next) => {
        try {
            const { name, des } = req.body
            const user = await Users.findById(req.user)
            user.name = name;
            user.des = des;
            await Vedios.updateMany({ user: req.user }, {
                $set: { username: name }
            })
            await user.save()
            return res.json({
                success: true,
                message: "update successfully",
                user
            })
        } catch (error) {
            next(error)
        }
    }

    ///update profile pic
    UpdatePic = async(req, res, next) => {
        try {
            const user = await Users.findById(req.user)
            const file = await getFile(req.file)

            if (user.profile.public_id) {
                await cloudinary.v2.uploader.destroy(user.profile.public_id)
            }
            const cdb = await cloudinary.v2.uploader.upload(file.content)

            user.profile = {
                url: cdb.secure_url,
                public_id: cdb.public_id
            }
            await Vedios.updateMany({ user: req.user }, {
                $set: { profile: user.profile.url }
            })
            await user.save()
            return res.json({
                success: true,
                message: "pic update successfully",
                user
            })
        } catch (error) {
            next(error)
        }
    }

    ///get Online user
    getOnlineUser = async(req, res, next) => {
        try {
            const users = await Users.findById(req.user)
            const onlineUsers = await Users.find({ _id: { $in: users.subscribe }, online: true })
            return res.json({
                success: true,
                message: "get online user",
                onlineUsers
            })
        } catch (error) {
            next(error)
        }
    }

    ///get  user Notification
    get_User_Notification = async(req, res, next) => {
        try {
            const Notice = await Notifications.find({ reciverId: req.user }).populate('senderId')

            const count = await Notifications.find({ reciverId: req.user, seen: false }).populate('senderId')

            return res.json({
                success: true,
                message: "get Notice",
                Notice,
                count: count.length
            })
        } catch (error) {
            next(error)
        }
    }

    // Notification seen
    Seen_User_Notification = async(req, res, next) => {
        try {
            await Notifications.updateMany({ reciverId: req.user }, { seen: true })
            return res.json({
                success: true,
                message: "seen Notice"
            })
        } catch (error) {
            next(error)
        }
    }

    // Notification seen
    Delete_User_Notification = async(req, res, next) => {
        try {
            await Notifications.findByIdAndDelete(req.params.id)
            return res.json({
                success: true,
                message: "delete Notice"
            })
        } catch (error) {
            next(error)
        }
    }











}



module.exports = new UserController();
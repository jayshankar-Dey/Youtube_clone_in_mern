///
const getFile = require("../config/getFile")
const cloudinary = require('cloudinary')
const Vedios = require("../Schema/Image_Vedio.model")
const Users = require('../Schema/User.model')
const Email_Send = require('../package/emailSend')

const Notifications = require("../Schema/Notification")
class ImageController {
    uplodeImage = async(req, res, next) => {
        try {
            const { text } = req.body
            const file = await getFile(req.file)
            const user = await Users.findById(req.user)
            const cdb = await cloudinary.v2.uploader.upload(file.content)
            const image = {
                url: cdb.secure_url,
                public_id: cdb.public_id
            }

            const uplode = await Vedios.create({
                text,
                image,
                isimage: true,
                user: req.user,
                username: user.name,
                profile: user.profile.url
            })
            user.vedios.unshift(uplode._id)
            await user.save()

            ///notification
            const notify = async(reciverId, text) => {
                // console.log("nice.........................", reciverId, text)
                await Notifications.create({ senderId: req.user, reciverId, text })
            }
            const userdata = await Users.findById(req.user).populate('subscribers')
            userdata.subscribers.forEach(data => {
                    Email_Send(data.email, `${userdata.name} Upload a image name -${text}`,
                        `see the image and like `
                    )
                    notify(data._id, `${userdata.name} Upload a image ${text}`)
                })
                // console.log(userdata)
            res.json({
                success: true,
                message: "Image uploaded successfully",
                uplode
            });
        } catch (error) {
            next(error)
        }
    }

    ///get image
    getImage = async(req, res, next) => {
        try {
            const { id } = req.params
            let data;
            if (id) {
                data = await Vedios.find({
                    user: id,
                    isimage: true,
                    playlists: false
                }).populate("user").sort({ createdAt: -1 })
            } else {
                data = await Vedios.find({ user: req.user, isimage: true }).populate("user").sort({ createdAt: -1 })
            }
            res.json({
                success: true,
                message: "Image get successfully",
                data
            });
        } catch (error) {
            next(error)
        }
    }

    deleteImage = async(req, res, next) => {
        try {
            const { id } = req.params

            const data = await Vedios.findById(id)
            await cloudinary.v2.uploader.destroy(data.image.public_id)
            await data.deleteOne()
            await Users.findByIdAndUpdate(req.user, { $pull: { vedios: id } })
            res.json({
                success: true,
                message: "Image delete successfully",
            });
        } catch (error) {
            next(error)
        }
    }

    //////like image and video
    Like = async(req, res, next) => {
            try {
                const { id } = req.params
                const vedio = await Vedios.findById(id)
                if (vedio.Like.includes(req.user)) {
                    await Vedios.findByIdAndUpdate(id, {
                        $pull: {
                            Like: req.user
                        }
                    })

                    await Vedios.findByIdAndUpdate(id, {
                        $pull: {
                            disLike: req.user
                        }
                    })
                    await Users.findByIdAndUpdate(req.user, { $pull: { Like: id } })
                } else {
                    await Vedios.findByIdAndUpdate(id, {
                        $addToSet: {
                            Like: req.user
                        }
                    })

                    await Vedios.findByIdAndUpdate(id, {
                        $pull: {
                            disLike: req.user
                        }
                    })
                    const user = await Users.findById(req.user)
                    user.Like.unshift(id)
                    await user.save()
                }

                res.json({
                    success: true,
                    message: "Like successfully",
                });
            } catch (error) {
                next(error)
            }

        }
        //////dis_like image and video
    disLike = async(req, res, next) => {
        try {
            const { id } = req.params
            const vedio = await Vedios.findById(id)
            if (vedio.disLike.includes(req.user)) {
                await Vedios.findByIdAndUpdate(id, {
                    $pull: {
                        Like: req.user
                    }
                })

                await Vedios.findByIdAndUpdate(id, {
                    $pull: {
                        disLike: req.user
                    }
                })
            } else {
                await Vedios.findByIdAndUpdate(id, {
                    $pull: {
                        Like: req.user
                    }
                })

                await Vedios.findByIdAndUpdate(id, {
                    $addToSet: {
                        disLike: req.user
                    }
                })
            }

            res.json({
                success: true,
                message: "disLike successfully",
            });
        } catch (error) {
            next(error)
        }

    }

    //////views video
    views = async(req, res, next) => {
        try {
            const { id } = req.params
            await Vedios.findByIdAndUpdate(id, {
                $addToSet: {
                    view: req.user
                }
            })

            const user = await Users.findById(req.user)
            if (user.view.includes(id)) {
                user.view.splice(user.view.indexOf(id), 1)
            }
            user.view.unshift(id)
            await user.save()
            res.json({
                success: true,
                message: "views successfully",
                user
            });
        } catch (error) {
            next(error)
        }
    }


    ////get histort
    get_views = async(req, res, next) => {
            try {
                //  const { id } = req.params
                //await Vedios.find({ _id: { $in: user.view } }).sort({ createdAt: -1 })
                const user = await Users.findById(req.user, { view: 1 }).populate("view")
                let views = user.view

                res.json({
                    success: true,
                    message: "get successfully",
                    views
                });
            } catch (error) {
                next(error)
            }
        }
        ////delete histort
    delete_views = async(req, res, next) => {
        try {
            const { id } = req.params
            await Users.findByIdAndUpdate(req.user, {
                $pull: {
                    view: id
                }
            })

            res.json({
                success: true,
                message: "delete successfully",
            });
        } catch (error) {
            next(error)
        }
    }


    ////get histort
    get_Like_video = async(req, res, next) => {
        try {
            //await Vedios.find({ _id: { $in: user.Like } }).sort({ createdAt: -1 })
            const user = await Users.findById(req.user, { Like: 1 }).populate("Like")
            let LikeVedio = user.Like
            res.json({
                success: true,
                message: "get successfully",
                LikeVedio
            });
        } catch (error) {
            next(error)
        }
    }

    ////delete Like Video
    delete_Like_Video = async(req, res, next) => {
        try {
            const { id } = req.params
            await Users.findByIdAndUpdate(req.user, {
                $pull: {
                    Like: id
                }
            })

            res.json({
                success: true,
                message: "successfully",
            });
        } catch (error) {
            next(error)
        }
    }

    ////add watch later
    Watch_later = async(req, res, next) => {
        try {
            const { id } = req.params
            const user = await Users.findById(req.user)
            user.Watch_Later.unshift(id)
            await user.save()
            res.json({
                success: true,
                message: "successfully added",
            });
        } catch (error) {
            next(error)
        }
    }

    ////get watch later
    get_Watch_later = async(req, res, next) => {
        try {
            const user = await Users.findById(req.user, { Watch_Later: 1 }).populate("Watch_Later")
            let Vedio = user.Watch_Later
                //await Vedios.find({ _id: { $in: user.Watch_Later } }).sort({ createdAt: -1 })
            res.json({
                success: true,
                message: "successfully added",
                Vedio
            });
        } catch (error) {
            next(error)
        }
    }

    ////delete watch later
    delete_Watch_later = async(req, res, next) => {
        try {
            const { id } = req.params
            await Users.findByIdAndUpdate(req.user, { $pull: { Watch_Later: id } })

            res.json({
                success: true,
                message: "remove successfully",
            });
        } catch (error) {
            next(error)
        }
    }

    ////get Subscriptions
    get_Subscriptions = async(req, res, next) => {
        try {
            const user = await Users.findById(req.user)
            let Vedio = await Vedios.find({ user: { $in: user.subscribe } }).sort({ createdAt: -1 })
            res.json({
                success: true,
                message: "successfully get",
                Vedio
            });
        } catch (error) {
            next(error)
        }
    }


}

module.exports = new ImageController()
/* eslint-disable no-undef */
const getFile = require("../config/getFile")
const cloudinary = require('cloudinary')
const Vedios = require("../Schema/Image_Vedio.model")
const Users = require('../Schema/User.model')
const Email_Send = require('../package/emailSend')

const Notifications = require("../Schema/Notification")
class VedioController {
    //add Vedio
    addVedio = async(req, res, next) => {
        try {
            const { name, text } = req.body
            if (!name) {
                return res.json({
                    success: false,
                    message: "Enter vedio name and tags #",
                });
            }
            if (!req.file) {
                return res.json({
                    success: false,
                    message: "Choose any vedio under 5 mb",
                });
            }
            const valid = Number(req.file.size) < Number(6000000)
            if (!valid) {
                return res.json({
                    success: false,
                    message: "file size maximum 6 md",
                });
            }
            let tags = [];
            name.split(" ").forEach((element, i) => {
                if (element.startsWith("#")) {
                    tags.push(element)
                }
            });
            const file = await getFile(req.file)
            const cdb = await cloudinary.v2.uploader.upload(file.content, {
                resource_type: "video",
                eager_async: true,
            })
            const vedio = {
                url: cdb.secure_url,
                public_id: cdb.public_id
            }
            const user = await Users.findById(req.user)
            const username = user.name;
            const profile = user.profile.url
            const vedios = await Vedios.create({ name, tags, text, vedio, user: req.user, username, profile })
            user.vedios.push(vedios._id)
            await user.save()

            ///notification
            const notify = async(reciverId, text) => {
                await Notifications.create({ senderId: req.user, reciverId, text })
            }
            const userdata = await Users.findById(req.user).populate('subscribers')
            userdata.subscribers.forEach(data => {
                Email_Send(data.email, `${userdata.name} Upload a Video ${name}`,
                    `Watch the vedio
                `
                )
                notify(data._id, `${userdata.name} Upload a Video ${name}`)
            })


            // console.log(req.file, name, text, tags)
            res.json({
                success: true,
                message: "Vedio uploaded successfully",
                vedios,
            });

        } catch (error) {
            next(error)
            console.log(error)
        }
    }


    ///get profile vedios    
    getProfile_Vedios = async(req, res, next) => {
        try {
            const { id } = req.params
            let data;
            if (id) {
                data = await Vedios.find({ user: id, isimage: false, playlists: false }).populate("user").sort({ createdAt: -1 })
            } else {
                data = await Vedios.find({ user: req.user, isimage: false, playlists: false }).populate("user").sort({ createdAt: -1 })
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



    updateVedioDetails = async(req, res, next) => {
        try {
            const { id } = req.params
            const { name, text } = req.body
            if (!name) {
                return res.json({
                    success: false,
                    message: "Enter vedio name and tags #",
                });
            }
            let tags = [];
            name.split(" ").forEach((element, i) => {
                if (element.startsWith("#")) {
                    tags.push(element)
                }
            });
            const vedio = await Vedios.findById(id)
            if (name) vedio.name = name;
            if (tags) vedio.tags = tags;
            if (text) vedio.text = text;
            await vedio.save()
            res.json({
                success: true,
                message: "update successfully",
            });
        } catch (error) {
            next(error)
        }
    }

    ///delete vedio
    deleteVedio = async(req, res, next) => {
            try {
                const { id } = req.params
                const vedio = await Vedios.findById(id)
                if (!vedio) return res.json({ success: false, message: "please enter valide data" });

                if (vedio.image.public_id) {
                    await cloudinary.v2.uploader.destroy(vedio.image.public_id)
                }
                await cloudinary.v2.uploader.destroy(vedio.vedio.public_id, {
                    resource_type: "video",
                    eager_async: true,
                })
                await vedio.deleteOne()
                await Users.findByIdAndUpdate(req.user, { $pull: { vedios: id } })
                res.json({
                    success: true,
                    message: "delete successfully",
                });
            } catch (error) {
                next(error)
            }
        }
        ///get profile video and image
    profile_Video_and_Photo = async(req, res, next) => {
        try {
            const { id } = req.params
            let vedio;
            if (id) {
                vedio = await Vedios.find({ user: id }).populate("user").sort({ createdAt: -1 })
            } else {
                vedio = await Vedios.find({ user: req.user }).populate("user").sort({ createdAt: -1 })
            }
            // console.log(req.user)
            return res.json({
                success: true,
                message: "grt successfully",
                vedio
            });
        } catch (error) {
            next(error)
        }
    }

    update_Vedio_Photo = async(req, res, next) => {
        try {
            const { id } = req.params
            const vedio = await Vedios.findById(id)
            if (vedio.image.public_id) {
                await cloudinary.v2.uploader.destroy(vedio.image.public_id)
            }
            const file = await getFile(req.file)
            const cdb = await cloudinary.v2.uploader.upload(file.content)
            vedio.image = {
                url: cdb.secure_url,
                public_id: cdb.public_id
            }
            await vedio.save()
            return res.json({
                success: true,
                message: "update successfully",
                vedio
            });
        } catch (error) {
            next(error)
        }
    }

    ////single vedio
    ///home vedios and photos
    Home = async(req, res, next) => {
        try {
            const { id } = req.params
            const { value } = req.query
            let vedio;
            let search;
            let query = {};
            const total = await Vedios.find({})
            if (id) {
                vedio = await Vedios.findById(id).populate("user").sort({ createdAt: -1 })
                if (vedio.tags.length > 0 || value) {
                    if (vedio.tags.length > 0) {
                        query.tags = { $in: vedio.tags },
                            query._id = { $ne: id }
                    }
                    if (value) {
                        query.name = { $regex: value, $options: 'i' }
                    }
                    search = await Vedios.find(query).sort({ createdAt: -1 }).limit(10)
                } else {
                    search = await Vedios.aggregate(
                        [{ $sample: { size: 7 } }]
                    )
                }

            } else {
                vedio = await Vedios.aggregate(
                    [{ $sample: { size: total.length + 1 } }]
                )
            }
            // console.log(req.user)
            return res.json({
                success: true,
                message: "grt successfully",
                vedio,
                search
            });
        } catch (error) {
            next(error)
        }
    }

    ////subscribe

    Subscribe = async(req, res, next) => {
        try {
            const { id } = req.params
            if (!id && !req.user) return res.json({ success: false, message: "Unauthorised user" });
            const user1 = await Users.findByIdAndUpdate(req.user, {
                $addToSet: {
                    subscribe: id
                }
            })
            const user2 = await Users.findByIdAndUpdate(id, {
                $addToSet: {
                    subscribers: req.user
                }
            })

            return res.json({
                success: true,
                message: "Subscribe successfully",
            });
        } catch (error) {
            next(error)
        }
    }

    //// Un subscribe

    Unsubscribe = async(req, res, next) => {
        try {
            const { id } = req.params
            if (!id && !req.user) return res.json({ success: false, message: "Unauthorised user" });
            const user1 = await Users.findByIdAndUpdate(req.user, {
                $pull: {
                    subscribe: id
                }
            })
            const user2 = await Users.findByIdAndUpdate(id, {
                $pull: {
                    subscribers: req.user
                }
            })

            return res.json({
                success: true,
                message: "UnSubscribe successfully",
            });
        } catch (error) {
            next(error)
        }
    }

    ///search vedios by name
    searchVedios_name = async(req, res, next) => {
            try {
                const { value } = req.params
                console.log(`Searching ${value}`)

                let query = {};
                if (value) {
                    query.name = { $regex: value, $options: 'i' }
                }
                const search = await Vedios.find(query).sort({ name: 1 })
                    // console.log(req.user)
                return res.json({
                    success: true,
                    message: "grt successfully",
                    search
                });
            } catch (error) {
                next(error)
            }
        }
        ///create playlist
    createPlaylist = async(req, res, next) => {
        try {
            const { name } = req.body
            if (!name) {
                return res.json({
                    success: false,
                    message: "Enter playlist name",
                });
            }
            let tags = [];
            name.split(" ").forEach((element, i) => {
                if (element.startsWith("#")) {
                    tags.push(element)
                }
            });
            const user = await Users.findById(req.user)
            const vedio = await Vedios.create({
                name,
                username: user.name,
                profile: user.profile.url,
                tags,
                playlists: true,
                user: req.user
            })
            return res.json({
                success: true,
                message: "Playlist created successfully",
                vedio
            });
        } catch (error) {
            next(error)
        }
    }

    //get all playlists
    get_playlist = async(req, res, next) => {
        try {
            const { id } = req.params

            let data;
            if (id) {
                data = await Vedios.findOne({ _id: id, playlists: true }).populate("user").sort({ createdAt: -1 })
            } else {
                data = await Vedios.find({ playlists: true, user: req.user }).populate("user").sort({ createdAt: -1 })
            }
            // console.log(req.user)
            return res.json({
                success: true,
                message: "grt successfully",
                data
            });
        } catch (error) {
            next(error)
        }
    }

    update_playlist_image = async(req, res, next) => {
        try {
            const { id } = req.body
            const playlist = await Vedios.findById(id)
            if (!playlist) return res.json({ success: false, message: "please enter valide data" })
            if (!id) return res.json({ success: false, message: "please enter valide data" })
            if (!req.file) return res.json({ success: false, message: "please enter valide data" })
            const file = await getFile(req.file)
            if (playlist.image.public_id) {
                await cloudinary.v2.uploader.destroy(playlist.image.public_id)
            }
            const cdb = await cloudinary.v2.uploader.upload(file.content)
            playlist.image = {
                public_id: cdb.public_id,
                url: cdb.secure_url
            }
            await playlist.save()
                // console.log(req.user)
            return res.json({
                success: true,
                message: "update successfully",

            });
        } catch (error) {
            next(error)
        }
    }

    //get all vedios
    get_Vedios = async(req, res, next) => {
        try {
            const data = await Vedios.find({ user: req.user, playlists: false })
                //console.log(data)
            return res.json({
                success: true,
                message: "grt successfully",
                data
            });
        } catch (error) {
            next(error)
        }
    }

    add_vedios_and_photos_playlist = async(req, res, next) => {
        try {
            const { id, vedios } = req.body
            const data = await Vedios.findById(id)
            if (!data) return res.json({ success: false, message: "please enter valide data" })
            if (!id && !vedios) return res.json({ success: false, message: "please enter valide data" })

            vedios.forEach(id => {
                data.playlists_vedios.push({ id: id })
            })
            await data.save()
            return res.json({
                success: true,
                message: "grt successfully",
                data
            });
        } catch (error) {
            next(error)
        }

    }

    get_playlist_Vedios_photos = async(req, res, next) => {
        try {
            const { id, sort } = req.params

            // console.log("sing...........", sort)
            const data = await Vedios.findById(id).populate("playlists_vedios.id")
            const vedios = data.playlists_vedios
                // console.log(vedios)
            let vedio;

            if (sort == "true") {
                vedio = vedios.sort((a, b) => {
                    return (a._id <= b._id) ?
                        1 :
                        -1
                })
            } else if (sort == "false") {
                vedio = vedios.sort((a, b) => {
                    return (a._id >= b._id) ?
                        1 :
                        -1
                })
            }
            // console.log(vedio)
            return res.json({
                success: true,
                message: "grt successfully",
                data,
                vedio
            });
        } catch (error) {
            next(error)
        }
    }

    delete_vedios_in_playlist = async(req, res, next) => {
        try {
            const { vedioId, playlistId } = req.params;
            console.log(vedioId, playlistId)
            const vedio = await Vedios.findById(playlistId)
            if (!vedio) return res.json({ success: false, message: "please enter valide data" })
            if (toString(vedio.user) !== toString(req.user)) return res.json({ success: false, message: "please enter valide data" })

            vedio.playlists_vedios.pull({ _id: vedioId })
            await vedio.save()
            return res.json({
                success: true,
                message: "delete successfully",
            });
        } catch (error) {
            next(error)
        }
    }


}

module.exports = new VedioController()
module.exports = new VedioController()
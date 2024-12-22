const express = require('express')
const isAuth = require('../middlewares/isAuth')
const { uploadImage, uploadVideo } = require('../middlewares/multer')
const imageController = require('../Controllers/image.Controller')
const VedioController = require('../Controllers/Vedio.controller')
const Router = express.Router()

Router.post('/upload_img', isAuth, uploadImage.single("file"), imageController.uplodeImage)
Router.get('/getImage/:id?', isAuth, imageController.getImage)

Router.delete('/delete_image/:id', isAuth, imageController.deleteImage)

Router.post('/VedioUplode', isAuth, uploadVideo.single("vedio"), VedioController.addVedio)

Router.get('/get_Profile_Vedio/:id?', isAuth, VedioController.getProfile_Vedios)

Router.put('/update_vedio_details/:id', isAuth, VedioController.updateVedioDetails)


Router.get('/profile_Video_Photo/:id?', isAuth, VedioController.profile_Video_and_Photo)


Router.put('/vedio_photo_uplode/:id', isAuth, uploadImage.single("file"), VedioController.update_Vedio_Photo)

Router.delete('/delete_Vedio/:id', isAuth, VedioController.deleteVedio)

Router.get('/home/:id?', VedioController.Home)
Router.get('/search/vedio/:value?', VedioController.searchVedios_name)
    /////like dislike comment and subscribe vedio and image

Router.post('/Subscribe/:id', isAuth, VedioController.Subscribe)

Router.post('/Unsubscribe/:id', isAuth, VedioController.Unsubscribe)

Router.post('/Like/:id', isAuth, imageController.Like)
Router.post('/disLike/:id', isAuth, imageController.disLike)
Router.post('/views/:id', isAuth, imageController.views)
Router.get('/getViews', isAuth, imageController.get_views)
Router.delete('/delete/views/:id', isAuth, imageController.delete_views)
Router.get('/getLike_vedios', isAuth, imageController.get_Like_video)
Router.delete('/delete/Like/:id', isAuth, imageController.delete_Like_Video)
Router.post('/watchlater/:id', isAuth, imageController.Watch_later)
Router.get('/get/watchlater', isAuth, imageController.get_Watch_later)
Router.post('/delete/watchlater/:id', isAuth, imageController.delete_Watch_later)
Router.get('/Subscription', isAuth, imageController.get_Subscriptions)

///playlist
Router.post('/create/playlist', isAuth, VedioController.createPlaylist)
Router.get('/get/playlist', isAuth, VedioController.get_playlist)
Router.post('/playlist/image/update', isAuth, uploadImage.single('file'), VedioController.update_playlist_image)
Router.get('/get/vedio/photo/playlist', isAuth, VedioController.get_Vedios)
Router.post('/add/vedio/photo/playlist', isAuth, VedioController.add_vedios_and_photos_playlist)
Router.get('/get/playlist/data/:id/:sort', VedioController.get_playlist_Vedios_photos)

Router.delete('/delete/vedio/playlist/:vedioId/:playlistId', isAuth, VedioController.delete_vedios_in_playlist)
module.exports = Router
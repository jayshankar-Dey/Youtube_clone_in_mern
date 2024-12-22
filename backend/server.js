const express = require("express")
const { createServer } = require("http")
const cors = require("cors")
const morgan = require("morgan")
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const User_Router = require("./Routes/User.Router");
const ErrorHandlor = require("./middlewares/ErrorHandlor");
const cloudinary = require('cloudinary');
const Router = require("./Routes/Image_Vedio.Router");
const Users = require("./Schema/User.model");
dotenv.config()
const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
})



app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

//////////connect db
const connectDB = async() => {
    await mongoose.connect(process.env.DB).then(() => console.log('connection succesfully')).catch((err) => console.log(err))
}
connectDB()

///cloudinary config
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.CLOUD_SECRET
})

//// Router/////////////
app.use('/api', User_Router)
app.use('/api', Router)


//error Handlor
app.use(ErrorHandlor)
const userIds = new Map()
let users = {}
io.on('connection', async(socket) => {
    const id = socket.handshake.query.id
    console.log('a user connected', socket.id);

    //console.log(id)
    if (id != 'undefined') {
        users[id] = socket.id
        userIds.set(id, socket.id)
        const user = await Users.findById(id)
        user.online = true
        await user.save()
            //io.emit('onlineUser', Object.keys(users))
        socket.on('online', data => {
            //console.log('online', data)
            io.emit('getOnline', data)
        })
    } else {
        delete users[id]
    }
    // console.log(users)

    socket.on('ofline', async data => {
        if (id != 'undefined') {
            const user = await Users.findById(id)
            user.online = false
            await user.save()
            io.emit('ofline', socket.id)
            delete users[id]
        }
        console.log('user ofline', data)
    })

    socket.on('Notice', data => {
        const users = data.subscribers.map(id => userIds.get(id))
        const sendingdata = {
            text: `${data.name} Upload a ${data.type} ${data.text}`,
            senderId: {
                _id: data.user._id,
                name: data.user.name,
                profile: {
                    url: data.user.profile.url
                }
            }
        }
        io.to(users).emit('NoticeSend', sendingdata)
    })

    socket.on('disconnect', async() => {
        console.log('user disconnected');
        if (id != 'undefined') {
            const user = await Users.findById(id)
            user.online = false
            await user.save()
            io.emit('ofline', socket.id)

            delete users[id]
        }
    });
});

server.listen(8000, () => {
    console.log("server is starting on port http://localhost:8000")
})
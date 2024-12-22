///
const jwt = require('jsonwebtoken')
const isAuth = async(req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1]
        if (!token) return res.json({ success: false, message: "Unauthorised user" })
        const { id } = jwt.verify(token, process.env.JWT)
        if (!id) return res.json({ success: false, message: "Unauthorised user" })
        req.user = id;
        next()
    } catch (error) {
        return res.json({
            success: false,
            message: "Unauthorised user"
        })
    }
}

module.exports = isAuth
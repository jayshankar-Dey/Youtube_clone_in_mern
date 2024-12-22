const ErrorHandlor = async(req, res, next) => {
    const message = error.message || "Somthing Wait wrong"
    const status = error.status || 400
    res.status(status).json({
        success: false,
        message
    })
}

module.exports = ErrorHandlor
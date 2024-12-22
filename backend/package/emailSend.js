///
const nodemailer = require("nodemailer")
const Email_Send = async(email, subject, text, html) => {
    const instance = nodemailer.createTransport({
        service: "gmail",
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    const sendData = {
        from: process.env.EMAIL,
        to: email,
        subject,
        text,
        html
    }
    instance.sendMail(sendData, (error, data) => {
        if (error) {
            console.log(error)
                //throw new Error('Failed to send email');
            res.json({
                error: "Failed to send email"
            })
            return false
        } else {
            console.log('Message sent: ', data.response);
            res.json({
                message: "Email sent successfully"
            })
            return true
        }
    })
}

module.exports = Email_Send
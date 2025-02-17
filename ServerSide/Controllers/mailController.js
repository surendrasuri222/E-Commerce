const nodemailer = require('nodemailer')

async function mailController(req, res) {
    const { email, subject, offers, message } = req.body
    console.log(email, subject, offers, message)


    // let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        // secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: 'janick22@ethereal.email',
            pass: '5XZXq47arqDfSJX66A'
        },
    });

    const info = await transporter.sendMail({
        from: 'surendra@gmail.com', // Admin
        to: email,
        subject: subject,
        text: message + " " + offers,
        html: "<b>Hello User</b>",
    });
    console.log("message id", info.messageId)
    res.send(info)
}


module.exports = mailController
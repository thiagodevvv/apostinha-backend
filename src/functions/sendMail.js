require('dotenv').config();
const nodemailer = require('nodemailer')

const user = process.env.EMAIL
const pass = process.env.PASSWORD



const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", //host smtp
    port: 587, // porta de envio dem email
    secure: false,
    auth: { user, pass},
    tls: {
        rejectUnauthorized: false
    }
})

transporter.sendMail({
    from: "Apostinha $1 Real <apostinha1real@gmail.com",
    to: "th.ferrari@outlook.com.br",
    subject: "Confirmar email",
    text: "Teste"

}).then(info => {
    console.log('coxinha')
    console.log(info)
}).catch(err => {
    console.log(err)
})

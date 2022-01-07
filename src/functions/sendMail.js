const nodemailer = require('nodemailer')


function sendEmail(emailSender, passEmailSender, emailRecept, token) {
    console.log('ESTOU AQUI SEND EMAIL')
    const link = `http://localhost:3000/ativar/${token}`
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", //host smtp
        port: 587, // porta de envio dem email
        secure: false,
        auth: { user: emailSender, pass: passEmailSender },
        tls: {
            rejectUnauthorized: false
        }
    })

    transporter.sendMail({
        from: "Apostinha $1 Real <apostinha1real@gmail.com",
        to: `${emailRecept}`,
        subject: "Confirmar usuário Apostinha",
        text: "",
        html: `<h1>Seja bem vindo! Por favor confirme a sua conta: <a href="${link}">Clique aqui</a></h1>` 
        

    }).then(info => {
        console.log(info)
    }).catch(err => {
        console.log(err)
    })
}



module.exports = {
    sendEmail
}
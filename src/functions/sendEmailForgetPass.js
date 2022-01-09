const nodemailer = require('nodemailer')


function sendEmailForgetPass(emailSender, passEmailSender, emailRecept, token_recovery) {
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
        subject: "Alterar senha Apostinha",
        text: "",
        html: `<h1>Aqui está seu código para recuperar sua senha: ${token_recovery}</h1>` 
        

    }).then(info => {
        console.log(info)
    }).catch(err => {
        console.log(err)
    })
}



module.exports = {
    sendEmailForgetPass
}
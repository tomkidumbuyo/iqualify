const nodemailer = require("nodemailer");


async function init() {
    return new Promise(async (resolve, reject) => {
        try {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: process.env.SMTP_SERVER,
                port: process.env.SMTP_PORT,
                secure: false, // true for 465, false for other ports
                auth: {
                user: process.env.SMTP_USER, // generated ethereal user
                pass: process.env.SMTP_PASSWORD, // generated ethereal password
                },
            });
            resolve(transporter);
        } catch (error) {
            reject(error);
        }
    });
}

async function sendText(from, to, subject, text) {

    return new Promise(async (resolve, reject) => {
        try {
            transporter = await init();
            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: from, // sender address
                to: to, // list of receivers
                subject: subject, // Subject line
                text: text, // plain text body
            });
            resolve(info)
        } catch (error) {
            reject(error)
        }
    })

}

async function sendHtml(from, to, subject, html) {

    return new Promise(async (resolve, reject) => {
        try {
            transporter = await this.init();
            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: from, // sender address
                to: to, // list of receivers
                subject: subject, // Subject line
                html: html, // html body
            });
            resolve(info) 
        } catch (error) {
            reject(error)
        }
    })

}

module.exports = {
    sendText: sendText,
    sendHtml: sendHtml,
};
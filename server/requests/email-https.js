//Loading router module
const router = require('express').Router();
//Loading nodemailer
const nodemailer = require('nodemailer');

router.route('/send_query').post((req, res) => {
    const informationToSend = req.body; 

    const email = `
        <h1>You have a new query!</h1>
        <p>Name: ${informationToSend.name}</p>
        <p>Email: ${informationToSend.email}</p>
        <p>Telephone: ${informationToSend.telephone}</p>
        <p>Query:<br/>${informationToSend.query}</p>
    `;

    async function sendEmail(){
        const transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            service: 'Outlook365',
            port: 587,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS
            }
        });

        const reqInfo = await transporter.sendMail({
            from: `<${process.env.EMAIL}>`,
            to: process.env.EMAIL,
            subject: "You've recieved a query!",
            html: email
        })
    }

    sendEmail()
        .catch(e => console.log(e));
});

router.route('/send_booking').post((req, res) => {
    if (req.url != '/favicon.ico') {
    const informationToSend = req.body; 

    const emailToHost = `
        <h1>You have a new booking!</h1>
        <p>Service: ${informationToSend.service}</p>
        <p>Name: ${informationToSend.name}</p>
        <p>Email: ${informationToSend.email}</p>
        <p>Telephone: ${informationToSend.telephone}</p>
        <p>Date: ${informationToSend.date}</p>
        <p>Time: ${informationToSend.time}</p>
    `;

    const emailToClient = `
        <h1>Thanks for booking with us!</h1>
        <p>You have booked: ${informationToSend.service}</p>
        <p>For date: ${informationToSend.date}</p>
        <p>For time: ${informationToSend.time}</p>
    `;

    async function sendEmailToHost(){
        const transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            service: 'Outlook365',
            port: 587,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS
            }
        });

        const reqInfo = await transporter.sendMail({
            from: `<${process.env.EMAIL}>`,
            to: process.env.EMAIL,
            subject: "You've recieved a booking!",
            html: emailToHost
        })
    }

    async function sendEmailToClient(){
        const transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            service: 'Outlook365',
            port: 587,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS
            }
        });

        const reqInfo = await transporter.sendMail({
            from: `<${process.env.EMAIL}>`,
            to: informationToSend.email,
            subject: "We've recieved your booking!",
            html: emailToClient
        })
    }

    async function sendEmails(){
        await sendEmailToHost()
            .catch(e => console.log(e));

        await sendEmailToClient()
            .catch(e => console.log(e));
    }

    sendEmails();
    }
});

module.exports = router;
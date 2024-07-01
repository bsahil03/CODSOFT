const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 4000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Serve static files
app.use(express.static('public'));

// Contact form endpoint
app.post('/contact', (req, res) => {
    const { name, email, phone, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'borichasahil0311@gmail.com'
        }
    });

    const mailOptions = {
        from: email,
        to: 'borichasahil0311@gmail.com',
        subject: `Contact Form Submission from ${name}`,
        text: `You have a new contact form submission:
        
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Message sent successfully!');
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

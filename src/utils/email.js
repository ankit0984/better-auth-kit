import nodemailer from 'nodemailer';

export const sendEmail = async ({ subject,to, html }) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.GMAIL_ADDRESS, 
            pass: process.env.GMAIL_PASS,
        },
    });
    const mailOptions = {
			from: process.env.EMAIL_USER,
			to,
			subject,
			html,
		};
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }

}
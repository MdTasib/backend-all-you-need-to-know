// WITH GMAIL
/* const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
	process.env.CLIENT_ID,
	process.env.CLIENT_SECRET,
	"https://developers.google.com/oauthplayground"
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const sendMailWithGmail = async data => {
	const accessToken = await oAuth2Client.getAccessToken();

	let transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			type: "OAuth2",
			user: process.env.SENDER_MAIL,
			clientId: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			refreshToken: process.env.REFRESH_TOKEN,
			accessToken: accessToken,
		},
	});

	const mailData = {
		from: process.env.SENDER_MAIL, // sender address
		to: data.to, // list of receivers
		subject: data.subject,
		text: data.text,
		// html: `<b>Hey there! </b>
		//    <br> This is our first message sent with Nodemailer<br/>`,
	};
	console.log(mailData);
	let info = await transporter.sendMail(mailData);

	console.log("Message sent: %s", info.messageId);

	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

	return info.messageId;
}; */

// WITH MAILGUN
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
	username: "api",
	key: "2d861eec5a46b5b64e63a113ba687bb0-b0ed5083-77be85e9",
});

const sendMailWithMailgun = async data => {
	const result = await mg.messages.create(
		"sandboxbf4ccd14204c45f1a2d2254d07a6f97c.mailgun.org",
		{
			from: "Mailgun Sandbox <postmaster@sandboxbf4ccd14204c45f1a2d2254d07a6f97c.mailgun.org>",
			to: data.to,
			subject: data.subject,
			text: data.text,
		}
	);

	return result.id;
};

module.exports = { sendMailWithMailgun };

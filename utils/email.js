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

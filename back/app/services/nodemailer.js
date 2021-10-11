const nodemailer = require("nodemailer");
const mailOptions = {
  from: "evadia.apo@gmail.com",
};

module.exports = sendingMail = async (params) => {

    const { sender, type, username, urlLink, revokeLink, subject, message, email} = params;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "evadia.apo@gmail.com",
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });
    mailOptions.to = sender;
    mailOptions.subject =
      type === "reset" ? "Réinitialisation du mot de passe" : subject;
    mailOptions.html =
      type === "reset"
        ? require("../templates/resetPassword")(
            //email,
            //username,
            urlLink
            //revokeLink
          )
        : require("../templates/messageContact")(params);
    mailOptions.attachments = [
      {
        filename: 'bee.png',
        path: './public/img/bee.png',
        cid: 'bee'
      },
      {
        filename: 'logo.png',
        path: './public/img/logo_banner.png',
        cid: 'logo'
      }
    ]
    try {
      const info = await transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      throw new Error(error);
    }
  }


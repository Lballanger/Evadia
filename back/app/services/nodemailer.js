const nodemailer = require("nodemailer");
const mailOptions = {
  from: "evadia.apo@gmail.com",
};

module.exports = sendingMail = async (params) => {
  
    const { email, type, username, urlLink, revokeLink } = params;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "evadia.apo@gmail.com",
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });
    mailOptions.to = email;
    mailOptions.subject =
      type === "reset" ? "Réinitialisation du mot de passe" : "Welcome";
    mailOptions.html =
      type === "reset"
        ? require("../templates/resetPassword")(
            //email,
            //username,
            urlLink
            //revokeLink
          )
        : require("../templates/resetPassword")(email, username);
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


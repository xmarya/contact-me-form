// const { body, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const pug = require("pug");
const { convert } = require("html-to-text");

const OAuth2 = google.auth.OAuth2;

module.exports = class Email {
  constructor(clientEmail, projectDetail) {
    this.client = clientEmail;
    this.projectDetail = projectDetail,
    this.clientName = clientEmail.split("@")[0];
    this.me = process.env.EMAIL;
  }

  async newTransport() {
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((error, toekn) => {
        if (error) {
          console.log("ERROR", error);
          reject();
        }

        resolve(toekn);
      });
    });

    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
  }

  async send(template, subject) {

    // 1) Render the HTML based on the pug template:
    const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
        clientName: this.clientName,
        subject
    });
    // 2) Define the email options:
    const mailOptionsToClient = {
        from: this.me,
        to: this.client,
        subject,
        html,
        text: convert(html, {wordwrap: false})
      };

      const mailOptionToMe = {
        from: process.env.SECONDARY_EMAIL,
        to: this.me,
        subject: "a new client's project",
        text: `Client email: ${this.client}\nClientName: ${this.clientName}\nProject detail: ${JSON.stringify(this.projectDetail)}`,
      }

    // Create a transport and Send the actual email:
    const transporter = await this.newTransport();
    await transporter.sendMail(mailOptionsToClient);
    await transporter.sendMail(mailOptionToMe);

  }

  async sendThanks() {
   await this.send("thankyou", "Thank you for reaching out ! ♥");
  }
};

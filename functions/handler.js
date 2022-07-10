"use strict";
const nodemailer = require("nodemailer");

const headers = {
  "content-type": "application/json",
};

module.exports.sendEmail = async event => {
  try {
    console.log(event);

    const requestBody = event.body;
    const { to, subject, text, html } = requestBody;
    if (!to || !subject || !text || !html) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          message: "Function rejected due to incomplete request.",
        }),
      };
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 465,
      secure: true,
      auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY,
      },
    });

    await transporter
      .sendMail({
        from: '"A-COMOSUS 🍍" <project.a.comosus@gmail.com>',
        ...requestBody,
      })
      .then(() => {
        console.log(`Email sent to ${to} successfully!`);
      })
      .catch(err => {
        console.error(`Failed to send email with ${err}`);
      });
  } catch (err) {
    console.log("err!", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: `Function errored when processing this request.`,
      }),
    };
  }
};

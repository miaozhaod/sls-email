"use strict";
const nodemailer = require("nodemailer");

const headers = {
  "content-type": "application/json",
};

module.exports.sendEmail = async event => {
  try {
    console.log(event);

    // const requestBody = event.body;
    // const { to, subject, text, html } = requestBody;
    // if (!to || !subject || !text || !html) {
    //   return {
    //     statusCode: 400,
    //     headers,
    //     body: JSON.stringify({
    //       message: "Function rejected due to incomplete request.",
    //     }),
    //   };
    // }

    let transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 465,
      secure: true,
      auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY,
      },
    });

    await transporter.sendMail({
      from: '"A-COMOSUS 🍍" <project.a.comosus@gmail.com>',
      // ...requestBody,
      to: "miao_zhao@yahoo.com",
      subject: "Hello ✔",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: `Function completed with requested behaviour.`,
      }),
    };
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

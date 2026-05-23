import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const testEmail = async () => {

  try {

    const transporter =
      nodemailer.createTransport({

        service: "gmail",

        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

    const info =
      await transporter.sendMail({

        from: process.env.EMAIL_USER,

        to: process.env.EMAIL_USER,

        subject: "Test Email",

        text: "Your email system is working successfully 🚀",
      });

    console.log("EMAIL SENT SUCCESSFULLY");

    console.log(info);

  } catch (error) {

    console.log("EMAIL ERROR");

    console.log(error);
  }
};

testEmail();
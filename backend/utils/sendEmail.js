import nodemailer from "nodemailer";

const sendEmail = async (
  to,
  subject,
  text
) => {

  try {

    console.log("Trying to send email...");

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
        to,
        subject,
        text,
      });

    console.log(
      "EMAIL SENT SUCCESSFULLY"
    );

    console.log(info);

  } catch (error) {

    console.log(
      "EMAIL ERROR:"
    );

    console.log(error);
  }
};

export default sendEmail;
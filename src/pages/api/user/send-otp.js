import Employee from "@/models/employeeModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const { userEmail } = req.body;
      if (!userEmail) {
        throw Error("Empty user details are not allowed");
      } else {
        const user = await Employee.findOne({ email: userEmail });
        if (user) {
          sendOTPverificationEmail(user._doc, res);
        } else {
          throw Error("Empty user details are not allowed");
        }
      }
    } catch (error) {
      console.log(error);
      res.json({
        status: "Failed",
        message: error.message,
      });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

const sendOTPverificationEmail = async ({ _id, email }, res) => {
  try {
    const otp = `${generateOTP()}`;
    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Verify Your Email",
      html: `<p> Enter <b>${otp} </b> in the app to verify your email address and complete signup</p><p>This code <b> expires in 1 hour </b></p>`,
    };
    const saltRounds = 10;
    const hashedOTP = await bcryptjs.hash(otp, saltRounds);

    await Employee.findByIdAndUpdate(_id, { otp: hashedOTP });

    await transporter.sendMail(mailOptions);
    return res.json({
      status: "PENDING",
      message: "Verification OTP email sent",
      data: {
        userId: _id,
        email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "FAILED",
      message: error.message,
    });
  }
};

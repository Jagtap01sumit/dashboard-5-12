import Admin from "@/models/adminModel";
import connectDB from "@/config/db";


import bcryptjs, { hash } from "bcryptjs";
import generateOTP from "@/utils/generateOTP";
import { TEMPLATE_VERIFY_YOUR_EMAIL, sendMail } from "@/utils/mailHelper";

connectDB();

export default async function handler(req, res) {
  let data;

  try {
    data = typeof req.body === "object" ? req.body : JSON.parse(req.body);
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Invalid JSON in the request body", success: false });
  }
  try {
    const user = await Admin.findOne({ email: data.email });
    if (user) {
      if (user._doc.verified) {
        return res.status(400).json({
          message: "User is already exist., Try Login",
          success: false,
          verified: true,
        });
      } else {
        await sendOTPverificationEmail(user._doc, res);

        return res.status(400).json({
          message: "User is already exist, Verification Pending",
          success: false,
          verified: false,
        });
      }
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(data.password, salt);

    const newAdmin = new Admin({
      email: data.email,
      password: hashedPassword,
      verified: false,
    });
    const savedAdmin = await newAdmin.save();
    await sendOTPverificationEmail(savedAdmin._doc, res);
    res
      .status(200)
      .json({ success: true, message: "Admin created successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message, success: false });
  }
}

const sendOTPverificationEmail = async ({ _id, email }, res) => {
  try {
    const otp = generateOTP();
    const saltRounds = 10;
    const hashedOTP = await bcryptjs.hash(otp, saltRounds);

    await Admin.findByIdAndUpdate(_id, { otp: hashedOTP });

    await sendMail(
      TEMPLATE_VERIFY_YOUR_EMAIL(process.env.USER_EMAIL, email, otp)
    );
    res.json({
      status: "PENDING",
      success: true,
      message: "Verification OTP email sent",
      data: {
        userId: _id,
        email,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "FAILED",
      success: false,
      message: error.message,
    });
  }
};

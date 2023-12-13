import Admin from "@/models/adminModel";
import connectDB from "@/config/db";
import bcryptjs from "bcryptjs";
import generateOTP from "@/utils/generateOTP";
import { TEMPLATE_VERIFY_YOUR_EMAIL, sendMail } from "@/utils/mailHelper";

connectDB();

export default async function handler(req, res) {
  try {
    let { email } = req.body;
    if (!email) {
      throw Error("Empty user details are not allowed");
    } else {
      const user = await Admin.findOne({ email: email });
      sendOTPverificationEmail(user._doc, res);
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: "Failed",
      message: error.message,
    });
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
      message: error.message,
    });
  }
};
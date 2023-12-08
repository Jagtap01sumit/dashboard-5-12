import Employee from "@/models/employeeModel";
import {
  sendMail,
  TEMPLATE_VERIFY_YOUR_EMAIL,
  generateOTP,
} from "@/utils/mailHelper";
import bcryptjs from "bcryptjs";

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

const sendOTPverificationEmail = async ({ _id, email }, res) => {
  try {
    const otp = `${generateOTP()}`;
    const saltRounds = 10;
    const hashedOTP = await bcryptjs.hash(otp, saltRounds);

    await Employee.findByIdAndUpdate(_id, { otp: hashedOTP });

    await sendMail(
      TEMPLATE_VERIFY_YOUR_EMAIL(process.env.USER_EMAIL, email, otp)
    );

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

import Employee from "@/models/employeeModel";
import connectDB from "@/config/db";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export default async function handler(req, res) {
  try {
    const { otp, email } = req.body;
    console.log(otp, email);

    const user = await Employee.findOne({ email });
    if (user) {
      const verified = await bcryptjs.compare(otp, user._doc.otp);
      if (verified) {
        const result = await Employee.findByIdAndUpdate(user._doc._id, {
          otp: null,
        });

        const secret = process.env.JWT_SECRET || "usersecreatekey";
        console.log("Fetched: ", user._id, user.email);
        const tokenData = {
          id: user._id,
          email: user.email,
        };

        const token = jwt.sign(tokenData, secret, {
          expiresIn: "1d",
        });

        const response = {
          message: "Logged in successfull",
          user: { ...user.toObject(), email },
          success: true,
          email: user.email,
          token: token,
          id: JSON.stringify(user._id),
        };

        res.setHeader(
          "Set-Cookie",
          `token=${token}; HttpOnly; Max-Age=86400; Path=/; Secure; SameSite=Strict`
        );

        return res.json(response);
      }
    } else {
      console.log("User is not found");
    }

    res.status(403).json({ success: false, message: "Invalid OTP" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message, success: false });
  }
}

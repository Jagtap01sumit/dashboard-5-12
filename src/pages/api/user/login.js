import jwt from "jsonwebtoken";
import Employee from "@/models/employeeModel";

export default async function handler(req, res) {
  try {
    const data = JSON.parse(req.body);
    console.log("user data", data);

    const { email} = data;

    const user = await Employee.findOne({ email: email }); 

  
    const secret = process.env.JWT_SECRET || "usersecreatekey";
    const tokenData = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(tokenData, secret, {
      expiresIn: "1d",
    });

    const response = {
      message: "Click send for OTP.",
      user: { ...user.toObject(), email },
      success: true,
      email: user.email,
      token:token,
      id: JSON.stringify(user._id)
    };
    console.log("res",response)
    console.log("myid",user._id)
    console.log(token);
    res.setHeader(
      "Set-Cookie",
      `token=${token}; HttpOnly; Max-Age=86400; Path=/; Secure; SameSite=Strict`
    );

    res.status(200).json(response);
  } catch (error) {
    console.error("Error:", error.message);
    return res
      .status(500)
      .json({ error: "Internal Server Error", success: false });
  }
}



import jwt from "jsonwebtoken";
import Employee from "@/models/employeeModel";
export default async function handler(req, res) {
  let data;

  try {
    data = JSON.parse(req.body);
    console.log("user data",data)
  } catch (error) {
    console.error("Error parsing JSON input:", error);
    
  }
  try {
    const { email } = data;

   
    const user = await Employee.findOne({ email: email });
    console.log(user); 

    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist.", success: false, user: null });
    }

    // Create a JWT token
    const tokenData = {
      id: user._id,
      email: user.email,
    };
    console.log(tokenData);
    const token = jwt.sign(tokenData, "userdashboardjwttoken", {
      expiresIn: "1d",
    });
    console.log(token);

    // Set email in response
    const response = {
      message: "Click send for OTP.",
      user: { ...user.toObject(), email }, // Include email in the user object
      success: true,
      email: user.email,
    };
   
    // localStorage.setItem('userEmail', user.email);
    res.setHeader(
      "Set-Cookie",
      ` token=${token}; HttpOnly; Max-Age="86400000"; Path=/; Secure; SameSite=Strict`
    );

    // Send the response
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message, success: false });
  }
}

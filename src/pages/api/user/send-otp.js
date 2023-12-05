
import nodemailer from "nodemailer";

export default async (req, res) => {
 
  if (req.method === "POST") {
    const { userEmail } = req.body;
    const generatedOTP = generateOTP(); 
    console.log("Generated OTP:", generatedOTP);
    sendOTPByEmail(userEmail, generatedOTP);
    // Send the generatedOTP to the client along with the success message
    res.status(200).json({ message: "OTP sent successfully", generatedOTP });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}


async function sendOTPByEmail(userEmail, otp) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

     const mailOptions = {
       from: process.env.USER_EMAIL,
      to: userEmail,       subject: "Verify Your Email",
       html: `<p> Enter <b>${otp} </b> in the app to verify your email address and complete signup</p><p>This code <b> expires in 1 hour </b></p>`,
     };

  await transporter.sendMail(mailOptions);
}

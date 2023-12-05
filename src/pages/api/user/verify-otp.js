export default (req, res) => {
  if (req.method === "POST") {
    const { userEnteredOTP, generatedOTP } = req.body;
    console.log("genrated otp",generatedOTP);
    if (verifyOTP(userEnteredOTP, generatedOTP)) {
      res.status(200).json({ message: "OTP verification successful" });
    } else {
      res.status(400).json({ error: "OTP verification failed" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

function verifyOTP(userEnteredOTP, generatedOTP) {
  console.log(userEnteredOTP===generatedOTP )
  console.log("user enterd",userEnteredOTP );
  console.log("generated",generatedOTP);
  return userEnteredOTP === generatedOTP;
}

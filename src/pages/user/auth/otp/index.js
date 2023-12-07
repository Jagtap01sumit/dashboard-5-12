"user client";
import React, { useState,useEffect } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { BuildCircleTwoTone } from "@mui/icons-material";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
const Index = () => {
  const [userEnteredOTP, setUserEnteredOTP] = useState("");
  const [message, setMessage] = useState("");
  const [generatedOTP, setGeneratedOTP] = useState("");
  
  const router = useRouter();
  
  const userEmail =
  typeof localStorage !== "undefined"
  ? localStorage.getItem("userEmail")
  : null;
  console.log(userEmail);

  const handleChange = (e) => {
    setOtpInput(e.target.value);
  };
  console.log("email", userEmail);
 

  
  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail }),
      });

      const data = await response.json();
      setMessage(data.message);

      if (data.generatedOTP) {
        setGeneratedOTP(data.generatedOTP);
      } else {
        console.error("Generated OTP not received from the server.", error);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setMessage("Error sending OTP. Please try again.");
    }
  };
useEffect(()=>{

})
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!userEnteredOTP) {
      setMessage("OTP are required.");
      return;
    }
    try {
      const response = await fetch("/api/user/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEnteredOTP, generatedOTP }),
      });
      const data = await response.json();
      console.log(data);
      if(response.status==200){
        toast.success(data.message);
        router.push('/user/dashboard')
      }else{
        toast.error(data.message)
      }
      setMessage(data.message);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setMessage("OTP verification failed. Please try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-5 rounded-lg">
        <div className="text-center">
          <h2>Email Verification</h2>
          {userEmail && (
            <p className="text-sm font-medium text-gray-400">
              {`We have sent a code to your email ${userEmail}`}
            </p>
          )}
        </div>
        <form>
          <div className="flex flex-col space-y-3 mt-4">
            <TextField
              className="form-control text-center"
              type="number"
              min={1000}
              max={9999}
              value={userEnteredOTP}
              onChange={(e) => setUserEnteredOTP(e.target.value)}
            />
            <div className="flex flex-col space-y-4">
              <div className="d-flex align-items-center justify-content-center m-3">
                <Button className="btn--dark" onClick={handleVerifyOTP}>
                  Verify Account
                </Button>
              </div>
              <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                {/* <p>Didn't receive the code?</p>{" "} */}
                <button onClick={handleSendOTP} className="btn">
                  send
                </button>
              </div>
              <p>{message}</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;

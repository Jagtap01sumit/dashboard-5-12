import { LoginForm, ForgotPassword } from "@/components";
import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { loginUser } from "@/redux/actions/authAction";
import { toast } from "react-toastify";

export default function index() {
  const router = useRouter();

  const { userInfo, error, message, actionT } = useSelector(
    (state) => state.authReducer
  );

  const dispatch = useDispatch();

  const [selectedForm, setselectedForm] = useState("login");

  const handleLogin = async (data) => {
    try {
      
      dispatch(loginUser(data));
        localStorage.setItem("userEmail", data.email);
  
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  useEffect(() => {
    if (!error && actionT === "login") {
      toast.success(message);
      // console.log("Email to push:", router.query.email);
      router.push("/user/auth/otp");
    } else if (error && actionT === "login") {
      toast.error(message);
      console.log(message);
    }
  }, [error, message, actionT, router.query.email]);

  return (
    <>
      <section>
        <Container maxWidth="xxl">
          <Grid container justifyContent="center">
            <Grid item xs={12} lg={11}>
              <Box py={2}>
                <Grid container spacing={8} alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <Box>
                      {selectedForm === "login" ? (
                        <LoginForm
                          setselectedForm={setselectedForm}
                          handleLogin={handleLogin}
                        />
                      ) : selectedForm === "forgotPassword" ? (
                        <ForgotPassword
                          setselectedForm={setselectedForm}
                          handleForgetPassword={handleForgetPassword}
                        />
                      ) : null}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box className="d-flex justify-content-center">
                      <img
                        src="/images/auth.svg"
                        className="img-fluid placeHolderImage d-none d-sm-block"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </section>
    </>
  );
}

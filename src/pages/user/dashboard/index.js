import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { parse } from "cookie";
import {
  authenticateUser,
  logoutAdmin,
  logoutUser,
} from "@/redux/actions/authAction";
import authMiddleware from "@/middleware";
import { toast } from "react-toastify";
import { Head } from "@/sections";
import { Layout } from "@/components";

const AdminDashboard = ({ token }) => {
  const { userInfo, error, message } = useSelector(
    (state) => state.authReducer
  );
  const dispatch = useDispatch();
  const router = useRouter();
  console.log(userInfo);
  const handleLogoutAdminUser = () => {
    dispatch(logoutUser());
    router.push("/user/auth");
  };

  useEffect(() => {
    if (token) dispatch(authenticateUser(token));
  }, [token]);

  useEffect(() => {
    if (!error && message === "logout successful") {
      toast.success("Logged out successfully.");
      router.push("/user/auth");
    } else if (error && message === "logout failed") {
      toast.error("Something went wrong.");
    }
  }, [error, message]);

  return (
    <>
      <Head title="Dashboard | Employee" />
      <Layout userInfo={userInfo} />
    </>
  );
};

export const getServerSideProps = authMiddleware(async (context) => {
  const { req } = context;

  const cookies = parse(req.headers.cookie || "");
  const token = cookies["token"] || null;

  return {
    props: {
      token,
    },
  };
});

export default AdminDashboard;

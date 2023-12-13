import { Box, } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "@/components";
import { authenticateUser } from "@/redux/actions/authAction";
import authMiddleware from "@/middleware";
import { parse } from "cookie";
import { AddNewTask, TasksInsights } from "@/sections";

const index = ({ token }) => {
  const [showtasks, setShowTasks] = useState(false)
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch(authenticateUser(token))
  }, [])

  return (
    <>
      <Layout userInfo={userInfo} />
      <Box className="dashboard-main" id="taskMain">
        <Box className="dashboard-main-container" p={{ xs: 2, sm: 4 }}>
          {
            showtasks ? <TasksInsights /> : <AddNewTask />
          }
        </Box>
      </Box>
    </>
  );
};

export const getServerSideProps = authMiddleware(async (context) => {
  const { req } = context; 

  const cookies = parse(req.headers.cookie || '');
  const token = cookies['token'] || null

  return {
    props: {
      token
    }
  };
});

export default index;

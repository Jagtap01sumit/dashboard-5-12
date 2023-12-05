import { Layout } from '@/components'
import { EmployeeDetails, Head } from '@/sections'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import authMiddleware from '@/middleware'
import { parse } from 'cookie'
import { authenticateUser } from '@/redux/actions/authAction'
import { Box, Button } from '@mui/material'
import { getEmployeeDetail } from '@/redux/actions/admin/employee-action'
import { toast } from 'react-toastify'

const SingleEmployee = ({ token }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { userInfo } = useSelector(state => state.authReducer)
    const { employee, message, error, actionT } = useSelector(state => state.adminEmployeeReducer)

    const { id } = router.query

    useEffect(() => {
        if (token) dispatch(authenticateUser(token))
    }, [token])

    useEffect(() => {
        if (id) dispatch(getEmployeeDetail(id))
    }, [id])

    useEffect(() => {
        if (!error && actionT === "fetchEmp") {
            toast.error(message)
        }
    }, [error])

    return (
        <>
            <Head title="Employee Detail | Admin" />
            <Layout userInfo={userInfo} />
            {
                employee && <Box className="dashboard-main" id="employee-detail">
                    <Box p={{ xs: 2, sm: 4 }} className="dashboard-main-container">
                        <EmployeeDetails employee={employee} />
                    </Box>
                </Box>
            }
        </>
    )
}

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

export default SingleEmployee
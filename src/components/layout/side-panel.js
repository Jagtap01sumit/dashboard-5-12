import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { Logout } from '@mui/icons-material'
import { Avatar, Box, Grid, IconButton, Typography } from '@mui/material'
import { DashboardMenu, LogoContainer, UserBox } from '..'


const SidePanel = () => {
    return (
        <>
            <aside className='admin-side-panel side-panel'>
                <Box p={2} className="side-panel-container">
                    <LogoContainer />
                    <DashboardMenu />
                    <UserBox />
                </Box>
            </aside>
        </>
    )
}

export default SidePanel
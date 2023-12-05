import React from 'react'
import { useRouter } from 'next/router'
import adminDashboardMenu from '@/nav-config/admin/dashboard'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

const DashboardMenu = () => {
    const router = useRouter()
    return (
        <>
            <Box className="side-panel-menu">
                <List className='d-flex flex-column p-0' sx={{ height: "100%" }}>
                    {
                        adminDashboardMenu.slice(0, -1).map(item => <ListItem className='p-0' key={item.id}>
                            <ListItemButton className='px-0' onClick={() => router.push(item.path)}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.menu} sx={{ color: "#F2F4F7" }} />
                            </ListItemButton>
                        </ListItem>)
                    }
                    <Box sx={{ flexGrow: 1 }} />
                    {
                        adminDashboardMenu.slice(-1).map(item => <ListItem className='p-0' key={item.id}>
                            <ListItemButton className='px-0' onClick={() => router.push(item.path)}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.menu} sx={{ color: "#F2F4F7" }} />
                            </ListItemButton>
                        </ListItem>)
                    }
                </List>
            </Box >
        </>
    )
}

export default DashboardMenu
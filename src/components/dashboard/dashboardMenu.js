import React from 'react'
import { useRouter } from 'next/router'
import adminDashboardMenu from '@/nav-config/admin/dashboard'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import EmpDashboardMenu from '@/nav-config/user/dashboard'

const DashboardMenu = () => {
    const router = useRouter();
    const isAdminDashboard = router.pathname.startsWith("/admin/dashboard");

    const menuItems = isAdminDashboard ? adminDashboardMenu : EmpDashboardMenu;

    return (
        <>
            <Box className="side-panel-menu">
                <List className='d-flex flex-column p-0' sx={{ height: "100%" }}>
                    {menuItems.slice(0, -1).map(item => (
                        <ListItem className='p-0' key={item.id}>
                            <ListItemButton className='px-0' onClick={() => router.push(item.path)}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.menu} sx={{ color: "#F2F4F7" }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <Box sx={{ flexGrow: 1 }} />
                    {menuItems.slice(-1).map(item => (
                        <ListItem className='p-0' key={item.id}>
                            <ListItemButton className='px-0' onClick={() => router.push(item.path)}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.menu} sx={{ color: "#F2F4F7" }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </>
    );
};




export default DashboardMenu
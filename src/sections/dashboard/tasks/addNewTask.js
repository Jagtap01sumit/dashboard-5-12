import React from 'react'
import { Box, Typography } from '@mui/material'
import { CreateTask } from '@/components'

const AddNewTask = () => {
    return (
        <>
            <Box>
                <Typography variant='h1' className='fw-semibold'>Add Task</Typography>
                <Box>
                    <CreateTask />
                </Box>
            </Box>
        </>
    )
}

export default AddNewTask
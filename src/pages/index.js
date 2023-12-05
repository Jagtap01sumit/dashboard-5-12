import React from 'react'
import connectDB from '@/config/db'
import { useDispatch } from 'react-redux'
import { logoutAdmin } from '@/redux/actions/authAction'

const index = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutAdmin())
  }

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default index
import React from 'react'
import Login from '../login/login'
import { Routes, Route } from 'react-router'
import { ROUTES } from '../../shared/constants/routes'

const Layout = () => {
  return (
    <Routes>
      <Route
        path={ROUTES.LOGIN}
        element={<Login />}
      />
    </Routes>
  )
}

export default Layout

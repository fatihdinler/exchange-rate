import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigator from '../../navigation/tab/tab-navigator'
import LoginStack from '../../navigation/stack/login-stack'
import { AuthContext } from '../../context/auth-context'
import { useSelector } from 'react-redux'
import Loading from '../../components/loading/loading'

const Layout = () => {
  const { userToken } = useContext(AuthContext)

  return <NavigationContainer>{userToken ? <TabNavigator /> : <LoginStack />}</NavigationContainer>
}

export default Layout
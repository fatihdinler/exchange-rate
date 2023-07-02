import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigator from '../../navigation/tab/tab-navigator'
import LoginStack from '../../navigation/stack/login-stack'
import { AuthContext } from '../../context/auth-context'
import * as SplashScreen from 'expo-splash-screen'

// SplashScreen.preventAutoHideAsync()

const Layout = () => {
  const { userToken } = useContext(AuthContext)
  console.log('userToken _----->', userToken)
  return <NavigationContainer>{userToken ? <TabNavigator /> : <LoginStack />}</NavigationContainer>
}

export default Layout
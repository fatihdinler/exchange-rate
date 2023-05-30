import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigator from '../../navigation/tab/tab-navigator'
import LoginStack from '../../navigation/stack/login-stack'

const Layout = () => {
  let authenticated = true

  return <NavigationContainer>{authenticated ? <TabNavigator /> : <LoginStack />}</NavigationContainer>
}

export default Layout

const styles = StyleSheet.create({})

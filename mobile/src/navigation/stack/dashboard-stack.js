import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Dashboard from '../../app/dashboard/dashboard'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NAVIGATION_LITERALS } from '../../shared/constants/navigation'

const DashboardStack = () => {

  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={NAVIGATION_LITERALS.DASHBOARD} component={Dashboard} />
    </Stack.Navigator>
  )
}

export default DashboardStack

const styles = StyleSheet.create({})
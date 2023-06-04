import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../../app/login/login'
import Register from '../../app/register/register'
import { NAVIGATION_LITERALS } from '../../shared/constants/navigation'

const LoginStack = () => {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NAVIGATION_LITERALS.LOGIN}
        component={Login}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name={NAVIGATION_LITERALS.REGISTER}
        component={Register}
      />
    </Stack.Navigator>
  )
}

export default LoginStack

const styles = StyleSheet.create({})
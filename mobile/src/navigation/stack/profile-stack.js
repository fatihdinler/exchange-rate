import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Profile from '../../app/profile/profile'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NAVIGATION_LITERALS } from '../../shared/constants/navigation'

const ProfileStack = () => {

  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={NAVIGATION_LITERALS.PROFILE} component={Profile} />
    </Stack.Navigator>
  )
}

export default ProfileStack

const styles = StyleSheet.create({})
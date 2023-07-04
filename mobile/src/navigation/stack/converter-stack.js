import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Converter from '../../app/converter/converter'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NAVIGATION_LITERALS } from '../../shared/constants/navigation'

const ConverterStack = () => {

  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={NAVIGATION_LITERALS.CONVERTER} component={Converter} />
    </Stack.Navigator>
  )
}

export default ConverterStack

const styles = StyleSheet.create({})
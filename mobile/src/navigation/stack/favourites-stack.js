import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Favourites from '../../app/favourites/favourites'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NAVIGATION_LITERALS } from '../../shared/constants/navigation'

const FavouritesStack = () => {

  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={NAVIGATION_LITERALS.FAVOURIES} component={Favourites} />
    </Stack.Navigator>
  )
}

export default FavouritesStack

const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NAVIGATION_LITERALS } from '../../shared/constants/navigation'
import DashboardStack from '../stack/dashboard-stack'
import ProfileStack from '../stack/profile-stack'
import FavouritesStack from '../stack/favourites-stack'
import ConverterStack from '../stack/converter-stack'
import { DashboardIcon, ProfileIcon, HeartIcon, ConverterIcon } from '../../shared/constants/icons'

const TabNavigator = () => {

  const Tabs = createBottomTabNavigator()

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Tabs.Screen
        name={NAVIGATION_LITERALS.DASHBOARD_STACK}
        component={DashboardStack}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <DashboardIcon
              color={color}
              size={size}
            />
          )
        }}

      />
      <Tabs.Screen
        name={NAVIGATION_LITERALS.FAVOURIES_STACK}
        component={FavouritesStack}
        options={{
          tabBarLabel: 'Favourites',
          tabBarIcon: ({ color, size }) => (
            <HeartIcon
              color={color}
              size={size}
            />
          )
        }}
      />
      <Tabs.Screen
        name={NAVIGATION_LITERALS.CONVERTER_STACK}
        component={ConverterStack}
        options={{
          tabBarLabel: 'Converter',
          tabBarIcon: ({ color, size }) => (
            <ConverterIcon
              color={color}
              size={size}
            />
          )
        }}
      />
      <Tabs.Screen
        name={NAVIGATION_LITERALS.PROFILE_STACK}
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <ProfileIcon
              color={color}
              size={size}
            />
          )
        }}
      />

    </Tabs.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({})
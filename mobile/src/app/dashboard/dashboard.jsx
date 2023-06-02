import { StyleSheet, Text, View, ScrollView, Button } from 'react-native'
import React, { useState } from 'react'
import Toolbar from '../../components/toolbar/toolbar'
import { LIGHT_THEME_COLORS } from '../../shared/constants/colors'

const Dashboard = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.toolbarContainer}>
          <Toolbar screenName='Dashboard' />
        </View>
    </ScrollView>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  generalContainer: {
    backgroundColor: LIGHT_THEME_COLORS.BLACK,
  },
  container: {
    flex: 1,
    marginLeft: 20,
  },
  toolbarContainer: {
    flex: 1 / 7,
  },
})

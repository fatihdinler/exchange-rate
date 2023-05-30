import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import Toolbar from '../../components/toolbar/toolbar'

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
  container: {
    flex: 1,
    marginLeft: 20,
  },
  toolbarContainer: {
    flex: 1 / 7,
  },
})

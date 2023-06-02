import { StyleSheet, Text, View, ScrollView, Switch } from 'react-native'
import React, { useState } from 'react'
import Toolbar from '../../components/toolbar/toolbar'
import { useDispatch, useSelector } from 'react-redux'
import { setDarkMode } from '../../features/dark-mode/dark-mode-slice'

const Profile = () => {
  const dispatch = useDispatch()
  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState)
    dispatch(setDarkMode(!isEnabled))
  }

  const darkMode = useSelector(state => state.darkMode)
  console.log(darkMode?.value)

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.toolbarContainer}>
        <Toolbar screenName='Profile' />
      </View>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </ScrollView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
  },
  toolbarContainer: {
    flex: 1 / 7,
  },
})

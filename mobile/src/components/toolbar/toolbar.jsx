import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useGetUserQuery } from '../../redux/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getHeight, getWidth } from '../../shared/constants/dimension'
import { getGreetingMessage } from '../../shared/utils/greeting'
import { LIGHT_THEME_COLORS } from '../../shared/constants/colors'

const Toolbar = ({ screenName }) => {

  const greetingMessage = getGreetingMessage()
  const WINDOW_WIDTH = getWidth()
  const WINDOW_HEIGHT = getHeight()
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    getRefreshToken(setUserId)
  }, [])

  const { data: user, isError, error } = useGetUserQuery(userId)
  const username = user?.user.username || 'User'
  
  return (
    <View style={styles.container}>
      <View style={styles.upper}></View>
      <View style={{ flex: 1 }}>
        <View style={styles.middle}>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeText}>{`${greetingMessage}, ${username}!`}</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.screenName}>{screenName}</Text>
        </View>
      </View>
    </View>
  )
}

const getRefreshToken = async setState => {
  await AsyncStorage.getItem('user')
    .then(response => {
      const parsedData = JSON.parse(response)
      setState(parsedData.id)
    })
    .catch(err => console.log(err))
}

export default Toolbar

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upper: {
    flex: 1 / 3,
  },
  middle: {
    flex: 1 / 3,
    justifyContent: 'center',
  },
  footer: {
    flex: 1 / 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
  },
  screenName: {
    fontSize: getHeight() * 0.025,
    color: LIGHT_THEME_COLORS.BLACK,
  },
  welcomeTextContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  welcomeText: {
    fontSize: getHeight() * 0.02,
    color: LIGHT_THEME_COLORS.GRAY1,
    fontWeight: '300',
  },
  iconContainer: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 20,
  },
})

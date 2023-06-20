import { StyleSheet, Text, View, Button, SafeAreaView, Dimensions, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useGetUserQuery } from '../../redux/api'
import Toolbar from '../../components/toolbar/toolbar'

const Profile = () => {
  const { logOut } = useContext(AuthContext)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    getRefreshToken(setUserId)
  }, [])

  const { data: user, isError, error } = useGetUserQuery(userId)
  
  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <Toolbar screenName='Profil' />
      </View>
      <Button
        title='Çık'
        onPress={() => logOut()}
      />
      <ScrollView style={{ flex: 1, marginTop: 15 }}></ScrollView>
    </View>
  )
}

const { width, height } = Dimensions.get('window')
export default Profile

const getRefreshToken = async setState => {
  await AsyncStorage.getItem('user')
    .then(response => {
      const parsedData = JSON.parse(response)
      setState(parsedData.id)
    })
    .catch(err => console.log(err))
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  toolbar: {
    flex: 1 / 7,
  },
  searchbar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

import { StyleSheet, Text, View, Button, SafeAreaView, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useGetUserQuery } from '../../redux/api'

const Profile = () => {
  const { logOut } = useContext(AuthContext)
  const [userId, setUserId] = useState(null)

  // useEffect(() => {
  //   getRefreshToken(setUserId)
  // }, [])

  const { data: user, isError, error } = useGetUserQuery(1)

  console.log(userId)
  console.log(user)
  console.log(error)

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.infoContainer}>
          <View style={styles.field}>
            <Text style={styles.label}>Username:</Text>
            <Text style={styles.text}>{user?.user.username}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.text}>{user?.user.email}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>First Name:</Text>
            <Text style={styles.text}>{user?.user.firstname}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Last Name:</Text>
            <Text style={styles.text}>{user?.user.lastname}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Language:</Text>
            <Text style={styles.text}>{user?.user.language}</Text>
          </View>
        </View>
        <Button
          title='Çık'
          onPress={() => logOut()}
        />
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
    backgroundColor: '#f2f2f2',
    paddingVertical: height * 0.05,
    paddingHorizontal: width * 0.05,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginBottom: height * 0.03,
    color: '#333',
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: width * 0.03,
    padding: width * 0.05,
  },
  field: {
    marginBottom: height * 0.02,
  },
  label: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#555',
  },
  text: {
    fontSize: width * 0.04,
    color: '#333',
  },
})

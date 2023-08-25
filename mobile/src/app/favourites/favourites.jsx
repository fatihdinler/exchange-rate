import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Searchbar from '../../components/searchbar/searchbar'
import SearchbarButton from '../../components/searchbar/searchbar-button'
import Toolbar from '../../components/toolbar/toolbar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useGetFavouritesQuery } from '../../redux/api'

const Favourites = () => {
  const [searchText, setSearchText] = useState('')
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    getUserInformation(setUserId)
  }, [])

  const { data: favourites, error } = useGetFavouritesQuery(userId)
  console.log(favourites, error)

  return (
    <View style={styles.container}>
      <View style={styles.layoutContainer}>
        <View style={styles.toolbar}>
          <Toolbar screenName='Favoriler' />
        </View>
        <View style={styles.searchbar}>
          <Searchbar
            value={searchText}
            onChangeText={text => setSearchText(text)}
            placeholder='Bir para birimi arayın'
          />
          <SearchbarButton />
        </View>
        <ScrollView style={{ flex: 1, marginTop: 15 }}></ScrollView>
      </View>
    </View>
  )
}

export default Favourites

const getUserInformation = async setState => {
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
    // backgroundColor: 'white',
  },
  layoutContainer: {
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

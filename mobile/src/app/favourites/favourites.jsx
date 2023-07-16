import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Searchbar from '../../components/searchbar/searchbar'
import SearchbarButton from '../../components/searchbar/searchbar-button'
import Toolbar from '../../components/toolbar/toolbar'
import axios from 'axios'

const Favourites = () => {
  const [searchText, setSearchText] = useState('')

  // useEffect(() => {
  //   axios.get('http://localhost:3001/money-converter', {
  //     params: {
  //       moneyFrom: 'TRY',
  //       moneyTo: 'USD',
  //       amount: 100,
  //     },
  //   })
  //   .then(response => console.log(response.data))
  //   .catch(err => console.log(err))
  // }, [])

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

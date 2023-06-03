import { StyleSheet, Text, View, ScrollView, Button, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Toolbar from '../../components/toolbar/toolbar'
import { LIGHT_THEME_COLORS } from '../../shared/constants/colors'
import { Ionicons } from '@expo/vector-icons'

const Dashboard = () => {
  const [searchText, setSearchText] = useState('')

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.toolbarContainer}>
        <Toolbar screenName='Dashboard' />
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.textInput}
          value={searchText}
          onChangeText={text => setSearchText(text)}
          placeholder='Search for a category'
        />
        <View style={styles.searchButtonContainer}>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons
            name='search-outline'
            size={24}
            color={LIGHT_THEME_COLORS.WHITE}
          />
        </TouchableOpacity>
        </View>
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
  searchContainer: {
    flex: 1 / 20,
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: LIGHT_THEME_COLORS.GRAY2,
    padding: 10,
    borderRadius: 8,
  },
  searchButtonContainer: {
    marginLeft: 10
  },
  searchButton: {
    backgroundColor: LIGHT_THEME_COLORS.BLUE,
    padding: 8,
    borderRadius: 8,
  },
})

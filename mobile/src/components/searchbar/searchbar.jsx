import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { LIGHT_THEME_COLORS } from '../../shared/constants/colors'
import { getHeight, getWidth } from '../../shared/constants/dimension'

const Searchbar = ({value, onChangeText, placeholder}) => {
    
  return (
    <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={(text) => onChangeText(text)}
        placeholder={placeholder}
    />
  )
}

export default Searchbar

const styles = StyleSheet.create({
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: LIGHT_THEME_COLORS.GRAY1,
        height: getHeight() / 20,
        borderRadius: 8,
        fontSize: getHeight() * 0.02,
        paddingLeft: 15,
    },
})
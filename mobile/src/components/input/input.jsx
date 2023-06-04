import { View, TextInput } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { styles } from './input.style'
import { LIGHT_THEME_COLORS } from '../../shared/constants/colors'
import { useState } from 'react'

const Input = ({
   iconName, isSecureTextEntry, placeholder, value, onChangeText, isFocused, onFocus, keyboardType, autoCompleteType }) => {
  const [borderColor, setBorderColor] = useState(LIGHT_THEME_COLORS.GRAY1)

  return (
    <View style={styles.container}>
      <AntDesign
        name={iconName}
        size={25}
        color={LIGHT_THEME_COLORS.BOLD_GRAY}
        style={styles.logo}
      />
      <TextInput
        style={[styles.input, { borderColor: isFocused ? LIGHT_THEME_COLORS.BLUE : borderColor }]}
        secureTextEntry={isSecureTextEntry}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus ? () => handleFocus(setBorderColor, onFocus) : null}
        onBlur={onFocus ? () => handleBlur(setBorderColor) : null}
        keyboardType={keyboardType ? keyboardType : null}
        autoComplete={autoCompleteType ? autoCompleteType : null}
      />
    </View>
  )
}

const handleFocus = (setBorderColor, onFocus) => {
  setBorderColor(LIGHT_THEME_COLORS.BLUE)
  onFocus()
}

const handleBlur = setBorderColor => {
  setBorderColor(LIGHT_THEME_COLORS.GRAY1)
}

export default Input

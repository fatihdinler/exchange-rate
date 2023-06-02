import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { LIGHT_THEME_COLORS } from '../../../shared/constants/colors'
import { styles } from './log-button.style'
import { getHeight } from '../../../shared/constants/dimension'

const LogButton = ({ logButtonType, content, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, {
            backgroundColor: logButtonType === 'login' ? LIGHT_THEME_COLORS.BLUE : LIGHT_THEME_COLORS.WHITE,
            borderColor: logButtonType === 'register' ? LIGHT_THEME_COLORS.BLUE : null,
            borderWidth: logButtonType === 'register' ? 1 : 0
        }]}
        onPress={() => onPress()}>
        <Text
          style={{
            color: logButtonType === 'login' ? LIGHT_THEME_COLORS.WHITE : LIGHT_THEME_COLORS.BLUE,
            fontSize: getHeight() * 0.02
          }}>
          {content}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default LogButton

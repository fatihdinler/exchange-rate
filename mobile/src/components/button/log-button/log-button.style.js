import { StyleSheet } from 'react-native'
import {LIGHT_THEME_COLORS} from '../../../shared/constants/colors'
import { getHeight } from '../../../shared/constants/dimension'

export const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingBottom : 10
    },
    button: {
      flex: 1,
      borderRadius: 8,
      height: getHeight() / 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: LIGHT_THEME_COLORS.WHITE,
      fontSize: getHeight() * 0.02
    },
  })

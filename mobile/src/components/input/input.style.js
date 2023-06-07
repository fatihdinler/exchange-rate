import { StyleSheet } from 'react-native'
import {getHeight} from '../../shared/constants/dimension'
import {LIGHT_THEME_COLORS} from '../../shared/constants/colors'

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingBottom: 10,
        alignItems: 'center',
      },
      input: {
        flex: 1,
        borderWidth: 1,
        borderColor: LIGHT_THEME_COLORS.GRAY3,
        height: getHeight() / 20,
        borderRadius: 8,
        fontSize: getHeight() * 0.02,
        paddingLeft: 15,
      },
})

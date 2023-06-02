import { StyleSheet } from 'react-native'
import { getHeight } from '../../shared/constants/dimension'
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animation: {
        width: getHeight() * 0.25,
        height: getHeight() * 0.25,
    }
})
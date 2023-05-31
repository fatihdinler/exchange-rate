import { StyleSheet } from "react-native"
import { LIGHT_THEME_COLORS } from "../../shared/constants/colors"
import { getHeight } from "../../shared/constants/dimension"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
    },

    retmesLogo: {
        width: 120,
        height: 120,
    },

    headerTextContainer: {
        flexDirection: 'row',
        margin: 15,
    },

    primaryText: {
        fontSize: getHeight() * 0.03,
        color: LIGHT_THEME_COLORS.GRAY4,
        fontWeight: 'bold',
    },

    secondaryText: {
        fontSize: getHeight() * 0.03,
        color: LIGHT_THEME_COLORS.BLUE,
        fontWeight: 'bold',
    },

    upperButtonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    informativeTextContainer: {
        position: 'absolute',
        bottom: 20,
    },

    informativeText: {
        color: LIGHT_THEME_COLORS.GRAY1,
    }

})
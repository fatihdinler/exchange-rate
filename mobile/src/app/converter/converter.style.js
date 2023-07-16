import { StyleSheet, Dimensions } from 'react-native'

export const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: 'white',
        width: Dimensions.get('screen').width / 3.45,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
        margin: 4,
    },
    rootView: {
        flex: 1, margin: 10
    },
    safeView: {
        flex: 1,
        marginTop: 3,
        marginLeft: 3,
        marginRight: 3
    },
    thinText: {
        fontWeight: '300',
        fontSize: 18
    },
    boldText: {
        fontWeight: '600',
        fontSize: 28
    },
    converter: {
        backgroundColor: 'white',
        marginTop: 5,
        elevation: 8,
        borderRadius: 10
    },

    converterItems: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10
    },

    converterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },

    selectedMoneyFrom: {
        fontSize: 16,
        marginRight: 4
    },

    amountContainer: {
        padding: 10,
        flex: 1,
        alignItems: 'flex-end'
    },

    selectedMoneyToContainer: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10
    },

    selectedMoneyToButton: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    selectedMoneyToText: {
        fontSize: 16,
        marginRight: 4
    },

    savedConversionsContainer: {
        marginTop: 15,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
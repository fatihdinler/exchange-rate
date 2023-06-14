import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { SearchIcon } from '../../shared/constants/icons'
import { getHeight } from '../../shared/constants/dimension'

const SearchbarButton = () => {
    return (
        <TouchableOpacity>
            <View style={styles.icon}>
                <SearchIcon
                    size={getHeight() / 20}
                    color='white'
                />
            </View>
        </TouchableOpacity>
    )
}

export default SearchbarButton

const styles = StyleSheet.create({
    icon: {
        backgroundColor: 'orange',
        padding: 6,
        marginLeft: 10,
        borderRadius: 8
    }
})

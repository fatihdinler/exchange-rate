import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Searchbar from '../../components/searchbar/searchbar'
import SearchbarButton from '../../components/searchbar/searchbar-button'
import Toolbar from '../../components/toolbar/toolbar'

const Favourites = () => {
    const [searchText, setSearchText] = useState('')

    return (
        <View style={styles.container}>
            <View style={styles.toolbar}>
                <Toolbar screenName='Favoriler' />
            </View>
            <View style={styles.searchbar}>
                <Searchbar
                    value={searchText}
                    onChangeText={text => setSearchText(text)}
                    placeholder='Bir para birimi arayın'
                />
                <SearchbarButton />
            </View>
            <ScrollView style={{ flex: 1, marginTop: 15 }}></ScrollView>
        </View>
    )
}

export default Favourites

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    toolbar: {
        flex: 1 / 7,
    },
    searchbar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})

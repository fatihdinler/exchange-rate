import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native'
import React, { useState, useCallback } from 'react'
import { useGetExchangeRatesQuery } from '../../redux/api'
import Searchbar from '../../components/searchbar/searchbar'
import SearchbarButton from '../../components/searchbar/searchbar-button'
import Toolbar from '../../components/toolbar/toolbar'

const Dashboard = () => {
    const [searchText, setSearchText] = useState('')
    const [refreshing, setRefreshing] = useState(false)

    const {
        data: exchangeRates,
        isLoading: isExchangeRatesLoading,
        isFetching: isExchangeRatesFetching,
        isError: isExchangeRatesError,
    } = useGetExchangeRatesQuery()

    console.log('exchangeRates -->', exchangeRates)

    const handleOnRefresh = useCallback( () => {
        setRefreshing(true) // When it starts.
        setRefreshing(false) // Use it when you want to stop refreshing.
      }, [refreshing])

    return (
        <View style={styles.container}>
            <View style={styles.toolbar}>
                <Toolbar screenName='Ana Sayfa' />
            </View>
            <View style={styles.searchbar}>
                <Searchbar
                    value={searchText}
                    onChangeText={text => setSearchText(text)}
                    placeholder='Bir para birimi arayın'
                />
                <SearchbarButton />
            </View>
            <ScrollView
                style={{ flex: 1, marginTop: 15 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleOnRefresh}
                    />
                }>

                </ScrollView>
        </View>
    )
}

export default Dashboard

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

// const { data, isError, isFetching, isLoading } = useGetProductsQuery()
// console.log(data, isError, isFetching, isLoading)

// const state = useSelector(state => state)
// console.log(state)

// import { useGetProductsQuery } from '../../redux/api'
// import { useSelector } from 'react-redux'
// import { AuthContext } from '../../context/auth-context'

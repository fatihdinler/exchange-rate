import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { useGetRatesQuery } from '../../redux/api'
import Searchbar from '../../components/searchbar/searchbar'
import SearchbarButton from '../../components/searchbar/searchbar-button'
import Toolbar from '../../components/toolbar/toolbar'
import { useSelector } from 'react-redux'

const Dashboard = () => {
    const [searchText, setSearchText] = useState('')
    const { data: rates, isLoading: isExchangeRatesLoading, isFetching: isExchangeRatesFetching, isError: isExchangeRatesError, refetch } = useGetRatesQuery()

    const [isRefreshing, setIsRefreshing] = useState(false)

    const handleOnRefresh = useCallback(async () => {
        setIsRefreshing(true)
        await refetch()
    }, [refetch])

    useEffect(() => {
        if (!isExchangeRatesFetching) {
            setIsRefreshing(false)
        }
    }, [isExchangeRatesFetching])


    console.log('Rates -->', rates)

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
                        refreshing={isRefreshing}
                        onRefresh={handleOnRefresh}
                    />
                }>
                {/* Display rates here */}
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

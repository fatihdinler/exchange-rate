import { StyleSheet, Text, View, ScrollView, RefreshControl, Image, ActivityIndicator } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { useGetRatesQuery } from '../../redux/api'
import Searchbar from '../../components/searchbar/searchbar'
import SearchbarButton from '../../components/searchbar/searchbar-button'
import Toolbar from '../../components/toolbar/toolbar'
import { useSelector } from 'react-redux'
import SectionList from '../../components/list/section-list'

const Dashboard = () => {
    const [searchText, setSearchText] = useState('') 
    const { data: rates, isLoading, refetch } = useGetRatesQuery()

    const [isRefreshing, setIsRefreshing] = useState(false)

    const handleOnRefresh = useCallback(async () => {
        setIsRefreshing(true)
        await refetch()
        setIsRefreshing(false)
    }, [refetch])

    const decoratedRates = decorateRates(rates || [])
    const isComponentReady = !isLoading

    return (
        <View style={styles.container}>
            {
                isComponentReady ? (
                    <View style={styles.layoutContainer}>
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
                        refreshing={isRefreshing || isLoading}
                        onRefresh={handleOnRefresh}
                    />
                }>
                <SectionList 
                    data={decoratedRates} 
                    searchText={searchText}
                />
            </ScrollView>
            </View>
                ) : (
                    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 25}}>LOADİNG...</Text>
                    </View>
                )
            }
        </View>
    )
}

export default Dashboard

const decorateRates = ratesObject => {
    const decoratedRates = []
    decoratedRates.push({name: null, value: null, increased: null})
    for (const [name, obj] of Object.entries(ratesObject)) {
      const [value, increased] = Object.values(obj)
      decoratedRates.push({ name, value, increased })
    }
    return decoratedRates
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    layoutContainer: {
        flex: 1,
        margin: 20
    },
    toolbar: {
        flex: 1 / 7,
    },
    searchbar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})

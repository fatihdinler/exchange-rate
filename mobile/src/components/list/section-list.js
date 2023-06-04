import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SectionList = () => {
    const data = [
        { name: 'dollar', favourite: false, increasing: false },
        { name: 'euro', favourite: true, increasing: false },
        { name: 'try', favourite: false, increasing: true },
        { name: 'altin', favourite: true, increasing: false },
        { name: 'gram', favourite: true, increasing: false },
        { name: 'tasak', favourite: false, increasing: false },
        { name: 'pepsi', favourite: true, increasing: true },
        { name: 'yumurta', favourite: false, increasing: false },
        { name: 'sigara', favourite: true, increasing: false },
        { name: 'ekmek', favourite: false, increasing: true },
    ]

    return (
        <View style={styles.container}>
            {
                data.map(item => {
                    return (
                        <View key={item.name}>
                            <Text></Text>
                        </View>
                    )
                })
            }
        </View>
    )
}

export default SectionList

const styles = StyleSheet.create({})
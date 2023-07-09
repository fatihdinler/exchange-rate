import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Divider } from '@rneui/themed'

const ProfileList = ({ items }) => {
    console.log(items)
    return (
        <View>
            {  // TODO: Add a divider
                items.map((item, index) => {
                    if (item?.touchable) {
                        return (
                            <TouchableOpacity className='flex-row py-3 mx-3'>
                                <View className='flex-1 flex-row items-center'>
                                    {item.icon && item.icon}
                                    <Text className='font-bold text-base ml-3'>{item?.name}</Text>
                                    <Text className='ml-3 text-gray-500'>{item?.value}</Text>
                                </View>
                                {item.children && item.children}
                            </TouchableOpacity>
                        )
                    }
                    else {
                        return (
                            <View className='flex-row py-3 mx-3 items-center'>
                                <View className='flex-1 flex-row items-center'>
                                    {item.icon && item.icon}
                                    <Text className='font-bold text-base ml-3'>{item?.name}</Text>
                                    <Text className='ml-3 text-gray-500'>{item?.value}</Text>
                                </View>
                                {item.children && item.children}
                            </View>
                        )
                    }
                })
            }
        </View>
    )
}

export default ProfileList

const styles = StyleSheet.create({})
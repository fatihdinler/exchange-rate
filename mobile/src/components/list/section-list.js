import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { HeartIcon, ArrowUp, ArrowDown } from '../../shared/constants/icons'
import { getHeight, getWidth } from '../../shared/constants/dimension'
import NotFoundAnimation from '../login-animation/not-found'
import { Divider } from 'native-base'
import { useColorScheme } from 'nativewind'

const SectionList = ({ data, searchText }) => {

	const filteredData = data.filter(item =>
		item.name === null ? true : item.name.toLowerCase().includes(searchText.toLowerCase())
	)

	console.log(filteredData)

	const { colorScheme } = useColorScheme()
	console.log(colorScheme)

	return (
		<View className='flex-1 bg-white'>
			{filteredData.map((item, index) => (
				filteredData.length > 1 ? (
					<View className='flex-1 flex-col items-center' key={item.name}>
						<View className='flex-1 flex-row items-center pt-3 pb-3 justify-center'>
							<View className='items-center flex-row justify-center flex-1'>
								<Text className={index === 0 ? 'text-xl font-extrabold text-neutral-500' : 'text-lg text-neutral-900'}>
									{index === 0 ? 'Birim' : item.name}
								</Text>
							</View>
							<View className='items-center flex-row justify-center flex-1'>
								<Text className={index === 0 ? 'text-xl font-extrabold text-neutral-500' : 'text-lg text-neutral-900'}>
									{index === 0 ? 'Değer' : item.value.toFixed(2)}
								</Text>
							</View>
							<View className='items-center flex-row justify-center flex-1'>
								{index === 0 ? (
									<Text className='text-xl font-extrabold text-neutral-500'>Artış</Text>
								) : item.increased ? (
									<ArrowUp size={getHeight() * 0.02} color="green" />
								) : (
									<ArrowDown size={getHeight() * 0.02} color="red" />
								)}
							</View>
							<TouchableOpacity className='items-center flex-row justify-center flex-1'>
								{index === 0 ? (
									<Text className='text-xl font-extrabold text-neutral-500'>Favori</Text>
								) : (
									<HeartIcon size={getHeight() * 0.02} color="red" />
								)}
							</TouchableOpacity>
						</View>
						<Divider />
					</View>) : (
					<View className='flex-1 items-center justify-center' style={{ marginTop: getHeight() / 6 }}>
						<NotFoundAnimation />
						<Text className='text-xl font-bold text-center pt-4'>Aradığınız Para Birimi Bulunamadı !</Text>
					</View>
				)

			))}
		</View>
	)
}

export default SectionList
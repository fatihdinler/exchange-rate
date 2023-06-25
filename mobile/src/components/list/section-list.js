import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { HeartIcon, ArrowUp, ArrowDown } from '../../shared/constants/icons';
import { getWidth } from '../../shared/constants/dimension';
import axios from 'axios'
import NotFoundAnimation from '../login-animation/not-found'

const SectionList = ({ data, searchText }) => {

	const filteredData = data.filter(item =>
		item.name === null ? true : item.name.toLowerCase().includes(searchText.toLowerCase())
	)

	return (
		<View style={styles.container}>
			{filteredData.map((item, index) => (
				filteredData.length > 1 ? (
					<View style={{ flexDirection: 'row', marginBottom: 15, alignItems: 'center' }}>
						<View style={{ flex: 1 / 4, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
							<Text style={[{ fontSize: getWidth() * 0.04, }, index === 0 ? { fontWeight: 'bold' } : { fontWeight: '300' }]}>
								{index === 0 ? 'Birim' : item.name}
							</Text>
						</View>
						<View style={{ marginLeft: 10, flex: 1 / 4, alignItems: 'center', justifyContent: 'center' }}>
							<Text style={[{ fontSize: getWidth() * 0.04 }, index === 0 ? { fontWeight: 'bold' } : { fontWeight: '300' }]}>
								{index === 0 ? 'Değer' : item.value.toFixed(2)}
							</Text>
						</View>
						<View style={{ marginLeft: 10, flex: 1 / 4, alignItems: 'center' }}>
							{index === 0 ? (
								<Text style={{ fontSize: getWidth() * 0.04, fontWeight: 'bold' }}>Artış</Text>
							) : item.increased ? (
								<ArrowUp size={getWidth() * 0.04} color="green" />
							) : (
								<ArrowDown size={getWidth() * 0.04} color="red" />
							)}
						</View>
						<TouchableOpacity style={{ marginLeft: 10, flex: 1 / 4, alignItems: 'center' }}>
							{index === 0 ? (
								<Text style={{ fontSize: getWidth() * 0.04, fontWeight: 'bold' }}>Favori</Text>
							) : (
								<HeartIcon size={getWidth() * 0.04} color="red" />
							)}
						</TouchableOpacity>
					</View>) : (
					<View style={{flex: 1, alignItems: 'center', marginTop: 75}}>
						<NotFoundAnimation />
						<Text style={{ fontSize: getWidth() * 0.04, fontWeight: 'bold', marginTop: 25 }}>Aradığınız Para Birimi Bulunamadı !</Text>
					</View>
				)

			))}
		</View>
	)
}

export default SectionList;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

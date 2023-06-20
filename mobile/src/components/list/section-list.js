import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { HeartIcon, ArrowUp, ArrowDown } from '../../shared/constants/icons';
import { getWidth } from '../../shared/constants/dimension';
import axios from 'axios'

const SectionList = ({ data, searchText }) => {

	const filteredData = data.filter(item =>
		item.name === null ? true : item.name.toLowerCase().includes(searchText.toLowerCase())
	)

	return (
		<View style={styles.container}>
			{filteredData.map((item, index) => (
				<View style={{ flexDirection: 'row', marginBottom: 15, alignItems: 'center' }}>
					<View style={{ flex: 1 / 4, alignItems: 'center' }}>
						<Text style={{ fontSize: getWidth() * 0.04 }}>
							{index === 0 ? 'Para Birimi' : item.name}
						</Text>
					</View>
					<View style={{ marginLeft: 10, flex: 1 / 4, alignItems: 'center' }}>
						<Text style={{ fontSize: getWidth() * 0.04 }}>
							{index === 0 ? 'Para Değeri' : item.value.toFixed(2)}
						</Text>
					</View>
					<View style={{ marginLeft: 10, flex: 1 / 4, alignItems: 'center' }}>
						{index === 0 ? (
							<Text style={{ fontSize: getWidth() * 0.04 }}>Artış</Text>
						) : item.increased ? (
							<ArrowUp size={getWidth() * 0.05} color="green" />
						) : (
							<ArrowDown size={getWidth() * 0.05} color="red" />
						)}
					</View>
					<TouchableOpacity style={{ marginLeft: 10, flex: 1 / 4, alignItems: 'center' }}>
						{index === 0 ? (
							<Text style={{ fontSize: getWidth() * 0.04 }}>Favori</Text>
						) : (
							<HeartIcon size={getWidth() * 0.05} color="red" />
						)}
					</TouchableOpacity>
				</View>
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

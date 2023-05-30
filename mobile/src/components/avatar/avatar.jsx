import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { getWidth } from '../../shared/constants/dimension'
const Avatar = ({source}) => {
  return (
    <Image
        source={source}
        style={{
            width: getWidth() * 0.12,
            height: getWidth() * 0.12,
            borderRadius: (getWidth() * 0.12) / 2,
        }}
    />
  )
}

export default Avatar

const styles = StyleSheet.create({})
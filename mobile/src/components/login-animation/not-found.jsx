import { View } from 'react-native'
import React from 'react'
import AnimatedLottieView from 'lottie-react-native'
import { styles } from './not-found.style'

const NotFoundAnimation = () => {
  return (
    <View style={styles.container}>
      <AnimatedLottieView
        source={require('../../shared/animations/search-not-found.json')}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  )
}

export default NotFoundAnimation

import { View } from 'react-native'
import React from 'react'
import AnimatedLottieView from 'lottie-react-native'
import { styles } from './login-animation.style'

const LoginAnimation = () => {
  return (
    <View style={styles.container}>
      <AnimatedLottieView
        source={require('../../shared/animations/login-animation-blue.json')}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  )
}

export default LoginAnimation

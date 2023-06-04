import { Text, View, Image, KeyboardAvoidingView, StyleSheet } from 'react-native'
import React, { useState, useContext } from 'react'
import Input from '../../components/input/input'
import LoginAnimation from '../../components/login-animation/login-animation'
import { getHeight } from '../../shared/constants/dimension'
import { LIGHT_THEME_COLORS } from '../../shared/constants/colors'
import LogButton from '../../components/button/log-button/log-button'
import { useNavigation } from '@react-navigation/native'
import { NAVIGATION_LITERALS } from '../../shared/constants/navigation'
import { AuthContext } from '../../context/auth-context'

const LoginScreen = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isUsernameFocused, setIsUsernameFocused] = useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)

  const navigation = useNavigation()
  const { logIn } = useContext(AuthContext)

  const handleLogin = () => {
    logIn(username, password)
  }

  const navigateToRegister = () => {
    navigation.navigate(NAVIGATION_LITERALS.REGISTER)
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior='padding'>
      <View style={styles.upper}>
        <View style={styles.loginAnimation}>
          <LoginAnimation />
        </View>
        <View style={styles.textContainer}>
          <Text style={{ fontSize: getHeight() * 0.03, fontWeight: '300' }}>Welcome to </Text>
          <Text style={{ fontSize: getHeight() * 0.03, fontWeight: '300' }}>Soft</Text>
          <Text style={{ fontSize: getHeight() * 0.03, color: LIGHT_THEME_COLORS.BLUE, fontWeight: 'bold' }}>Blog</Text>
          <Text style={{ fontSize: getHeight() * 0.03, fontWeight: '300' }}> !</Text>
        </View>
      </View>
      <View style={styles.middle}>
        <Input
          placeholder={'Username'}
          value={username}
          onChangeText={text => setUsername(text)}
          isFocused={isUsernameFocused}
          onFocus={() => handleFocus(setIsUsernameFocused, setIsPasswordFocused)}
        />
        <Input
          isSecureTextEntry={true}
          placeholder='Password'
          value={password}
          onChangeText={text => setPassword(text)}
          isFocused={isPasswordFocused}
          onFocus={() => handleFocus(setIsPasswordFocused, setIsUsernameFocused)}
        />
        <View style={styles.buttonContainer}>
          <LogButton
            onPress={() => handleLogin()}
            logButtonType='login'
            content='Login'
          />
          <LogButton
            onPress={() => navigateToRegister()}
            logButtonType='register'
            content='Register'
            disabled={username || password}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const handleFocus = (stateToBeFocused, stateToBeUnfocused) => {
  stateToBeFocused(true)
  stateToBeUnfocused(false)
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:LIGHT_THEME_COLORS.WHITE
  },
  upper: {
    flex: 2.5 / 5,
  },
  loginAnimation: {
    flex: 4 / 5,
  },
  textContainer: {
    flex: 1 / 5,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  middle: {
    flex: 2.5 / 5,
    marginHorizontal: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: LIGHT_THEME_COLORS.BLUE,
    height: getHeight() / 15,
    borderRadius: 18,
    fontSize: getHeight() * 0.02,
    paddingLeft: 15,
    marginBottom: 10,
    marginHorizontal: 15,
  },
  buttonContainer: {
    marginTop: 15,
  }
})

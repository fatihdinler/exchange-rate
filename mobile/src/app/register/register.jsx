import { Text, View, Image, KeyboardAvoidingView, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import Input from '../../components/input/input'
import LoginAnimation from '../../components/login-animation/login-animation'
import { getHeight } from '../../shared/constants/dimension'
import { LIGHT_THEME_COLORS } from '../../shared/constants/colors'
import LogButton from '../../components/button/log-button/log-button'
import { useNavigation } from '@react-navigation/native'
import { NAVIGATION_LITERALS } from '../../shared/constants/navigation'
import { AuthContext } from '../../context/auth-context'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')

  const { signUp } = useContext(AuthContext)
  const navigation = useNavigation()

  const handleRegister = () => {
    signUp(firstname, lastname, email, username, password, navigation)
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior='padding'>
      <View style={styles.middle}>
        <Input
          placeholder={'First Name'}
          value={firstname}
          onChangeText={text => setFirstname(text)}
        />
        <Input
          placeholder={'Last Name'}
          value={lastname}
          onChangeText={text => setLastname(text)}
        />
        <Input
          placeholder={'Email'}
          value={email}
          onChangeText={text => setEmail(text)}
          autoCompleteType='email'
          keyboardType='email-address'
        />
        <Input
          placeholder={'Username'}
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <Input
          isSecureTextEntry={true}
          placeholder='Password'
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <View style={styles.buttonContainer}>
          <LogButton
            onPress={() => handleRegister()}
            logButtonType='register'
            content='Sign Up'
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_THEME_COLORS.WHITE,
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
    alignItems: 'center',
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
  },
})

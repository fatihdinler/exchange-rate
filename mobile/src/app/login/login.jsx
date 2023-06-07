import { Text, View, Image, KeyboardAvoidingView, StyleSheet } from 'react-native'
import React, { useState, useContext } from 'react'
import Input from '../../components/input/input'
import LoginAnimation from '../../components/login-animation/login-animation'
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
            behavior='padding'
            style={styles.container}>
            <View style={styles.animation}>
                <LoginAnimation />
            </View>
            <View style={styles.form}>
                <Text style={styles.loginHeader}>Hadi Başlayalım !</Text>
                <Text style={styles.loginSubHeader}>Kullanıcı bilgilerini doldurarak giriş yap.</Text>
                <View style={styles.inputs}>
                    <Text style={styles.inputHeader}>Kullanıcı Adı</Text>
                    <Input
                        placeholder='johndoe'
                        value={username}
                        onChangeText={text => setUsername(text)}
                        isFocused={isUsernameFocused}
                        onFocus={() => handleFocus(setIsUsernameFocused, setIsPasswordFocused)}
                    />
                    <Text style={styles.inputHeader}>Şifre</Text>
                    <Input
                        isSecureTextEntry={true}
                        placeholder='***'
                        value={password}
                        onChangeText={text => setPassword(text)}
                        isFocused={isPasswordFocused}
                        onFocus={() => handleFocus(setIsPasswordFocused, setIsUsernameFocused)}
                    />
                </View>
                <View style={styles.buttonContainer}>
                <LogButton
                    onPress={() => handleLogin()}
                    logButtonType='login'
                    content='Giriş Yap'
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
        margin: 15,
    },

    animation: {
        flex: 1 / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    form: {
        flex: 1 / 2,
    },

    loginHeader: {
        fontSize: 35,
        fontWeight: 'bold',
        color: LIGHT_THEME_COLORS.BLACK,
    },
    loginSubHeader: {
        fontSize: 18,
        color: LIGHT_THEME_COLORS.GRAY2,
        fontWeight: '300',
    },
    inputs: {
        marginTop: 35,
    },

    inputHeader: {
        fontWeight: '600',
        fontSize: 15,
        marginBottom: 5,
    },
    buttonContainer: {
      marginTop: 15,
    },
})

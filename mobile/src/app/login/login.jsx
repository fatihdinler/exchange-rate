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
// import { Input } from 'native-base'

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
      marginTop: 50
    },

    inputHeader: {
      fontWeight: '600',
      fontSize: 15,
      marginBottom: 5,
    },
    // container: {
    //   flex: 1,
    //   backgroundColor:LIGHT_THEME_COLORS.WHITE
    // },
    // upper: {
    //   flex: 2.5 / 5,
    // },
    // loginAnimation: {
    //   flex: 4 / 5,
    // },
    // textContainer: {
    //   flex: 1 / 5,
    //   justifyContent: 'center',
    //   flexDirection: 'row',
    //   alignItems: 'center'
    // },
    // middle: {
    //   flex: 2.5 / 5,
    //   marginHorizontal: 15,
    // },
    // textInput: {
    //   borderWidth: 1,
    //   borderColor: LIGHT_THEME_COLORS.BLUE,
    //   height: getHeight() / 15,
    //   borderRadius: 18,
    //   fontSize: getHeight() * 0.02,
    //   paddingLeft: 15,
    //   marginBottom: 10,
    //   marginHorizontal: 15,
    // },
    // buttonContainer: {
    //   marginTop: 15,
    // }
})

// <KeyboardAvoidingView
//   style={styles.container}
//   behavior='padding'>
//   <View style={styles.upper}>
//     <View style={styles.loginAnimation}>
//       <LoginAnimation />
//     </View>
//     <View style={styles.textContainer}>
//       <Text style={{ fontSize: getHeight() * 0.03, fontWeight: '300' }}>Welcome to </Text>
//       <Text style={{ fontSize: getHeight() * 0.03, fontWeight: '300' }}>Soft</Text>
//       <Text style={{ fontSize: getHeight() * 0.03, color: LIGHT_THEME_COLORS.BLUE, fontWeight: 'bold' }}>Blog</Text>
//       <Text style={{ fontSize: getHeight() * 0.03, fontWeight: '300' }}> !</Text>
//     </View>
//   </View>
//   <View style={styles.middle}>
//     <Input
//       placeholder={'Username'}
//       value={username}
//       onChangeText={text => setUsername(text)}
//       isFocused={isUsernameFocused}
//       onFocus={() => handleFocus(setIsUsernameFocused, setIsPasswordFocused)}
//     />
//     <Input
//       isSecureTextEntry={true}
//       placeholder='Password'
//       value={password}
//       onChangeText={text => setPassword(text)}
//       isFocused={isPasswordFocused}
//       onFocus={() => handleFocus(setIsPasswordFocused, setIsUsernameFocused)}
//     />
//     <View style={styles.buttonContainer}>
//       <LogButton
//         onPress={() => handleLogin()}
//         logButtonType='login'
//         content='Login'
//       />
//       <LogButton
//         onPress={() => navigateToRegister()}
//         logButtonType='register'
//         content='Register'
//         disabled={username || password}
//       />
//     </View>
//   </View>
// </KeyboardAvoidingView>

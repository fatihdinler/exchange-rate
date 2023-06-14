import { Text, View, Image, KeyboardAvoidingView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useContext, useState } from 'react'
import Input from '../../components/input/input'
import LoginAnimation from '../../components/login-animation/login-animation'
import { getHeight } from '../../shared/constants/dimension'
import { LIGHT_THEME_COLORS } from '../../shared/constants/colors'
import LogButton from '../../components/button/log-button/log-button'
import { useNavigation } from '@react-navigation/native'
import { NAVIGATION_LITERALS } from '../../shared/constants/navigation'
import { AuthContext } from '../../context/auth-context'
import { CheckBox } from '@rneui/themed'

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [isTermUseAccepted, setIsTermUseAccepted] = useState(false)

    const { signUp } = useContext(AuthContext)
    const navigation = useNavigation()

    const handleRegister = () => {
        signUp(firstname, lastname, email, username, password, navigation)
    }

    return (
        <KeyboardAvoidingView
            behavior='padding'
            style={styles.container}>
            <SafeAreaView style={styles.layout}>
                <View style={styles.animation}></View>
                <View style={styles.form}>
                    <Text style={styles.loginHeader}>Aramıza Hoşgeldin !</Text>
                    <Text style={styles.loginSubHeader}>Bilgilerini doldurarak aramıza katıl.</Text>
                    <View style={styles.inputs}>
                        <Text style={styles.inputHeader}>Ad</Text>
                        <Input
                            placeholder='John'
                            value={firstname}
                            onChangeText={text => setFirstname(text)}
                        />
                        <Text style={styles.inputHeader}>Soyad</Text>
                        <Input
                            placeholder='Doe'
                            value={lastname}
                            onChangeText={text => setLastname(text)}
                        />
                        <Text style={styles.inputHeader}>E-mail</Text>
                        <Input
                            placeholder={'johndoe@mail.com'}
                            value={email}
                            onChangeText={text => setEmail(text)}
                            autoCompleteType='email'
                            keyboardType='email-address'
                        />
                        <Text style={styles.inputHeader}>Kullanıcı Adı</Text>
                        <Input
                            placeholder='johndoe'
                            value={username}
                            onChangeText={text => setUsername(text)}
                        />
                        <Text style={styles.inputHeader}>Şifre</Text>
                        <Input
                            isSecureTextEntry={true}
                            placeholder='***'
                            value={password}
                            onChangeText={text => setPassword(text)}
                        />
                    </View>
                    {/* <CheckBox
                        title='Kullanıcı sözleşmesini okudum & kabul ediyorum.'
                        checked={isTermUseAccepted}
                        
                        onPress={() => setIsTermUseAccepted(!isTermUseAccepted)}
                    /> */}
                    <View style={styles.buttonContainer}>
                        <LogButton
                            onPress={() => handleRegister()}
                            logButtonType='login'
                            content='Kayıt Ol'
                        />
                    </View>
                    <View style={styles.bottomTextContainer}>
                        <Text style={styles.bottomText}>Bizimle iletişime </Text>
                        <TouchableOpacity onPress={() => null}>
                            <Text style={styles.coloredBottomText}>geçin</Text>
                        </TouchableOpacity>
                        <Text style={styles.bottomText}> !</Text>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: LIGHT_THEME_COLORS.WHITE,
    },
    layout: {
        flex: 1,
        margin: 15,
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
    bottomTextContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 5,
    },
    bottomText: {
        fontSize: getHeight() * 0.0145,
    },
    coloredBottomText: {
        color: LIGHT_THEME_COLORS.BLUE,
        fontSize: getHeight() * 0.0145,
    },
})

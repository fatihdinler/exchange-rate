import { Alert, Vibration } from 'react-native'
import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { API_KEYS } from '../shared/constants/config'
import { NAVIGATION_LITERALS } from '../shared/constants/navigation'
export const AuthContext = createContext()
export const AuthProvider = ({ children }) => {

    const signUpRoute = `${API_KEYS.API}/${API_KEYS.SIGN_UP}`
    const loginRoute = `${API_KEYS.API}/${API_KEYS.LOGIN}`
    const refreshRoute = `${API_KEYS.API}/${API_KEYS.REFRESH_TOKEN}`
    const [userToken, setUserToken] = useState(null)

    console.log(loginRoute)

    const isTokenExpired = async () => {
        const accessToken = await AsyncStorage.getItem('access-token')
        const parsedAccessToken = JSON.parse(accessToken)
        const expiredAt = parsedAccessToken?.expires
        const currentTimestamp = new Date().toISOString()
        if(!expiredAt) {
            return true
        }
        else return currentTimestamp > expiredAt
    }

    const logIn = async (username, password) => {

        const data = {
            username: username,
            password: password
        }

        console.log(data)

        axios.post(loginRoute, data)
            .then(response => {
                console.log(response)
                if(response?.data?.user) {
                    AsyncStorage.setItem('user', JSON.stringify(response?.data?.user))
                }
                if (response?.data?.tokens?.access) {
                    AsyncStorage.setItem('access-token', JSON.stringify(response?.data?.tokens?.access))
                }
                if (response?.data?.tokens?.refresh) {
                    AsyncStorage.setItem('refresh-token', JSON.stringify(response?.data?.tokens?.refresh))
                }
                setUserToken(response.data.tokens.access)
            })
            .catch(error => {
                if(error.message === 'Network Error') {
                    Alert.alert('Network Error!', 'Could not connect to server.')
                }
                console.log(error)
            })
    }

    const logOut = () => {
        try {
            setUserToken(null)
            AsyncStorage.removeItem('access-token')
            AsyncStorage.removeItem('refresh-token')
        } catch (error) {
            console.log(error)
        }
    }

    const isLoggedIn = async () => {

        let tokenExpired = await isTokenExpired()
        console.log('tokenExpired -->', tokenExpired)
        if (tokenExpired) {
            console.log('isLoggedIn() --->', 'tokenIsExpired if case')
            const refreshToken = await AsyncStorage.getItem('refresh-token')
            const parsedRefreshToken = JSON.parse(refreshToken)

            const postData = { refreshToken: parsedRefreshToken?.token }
            axios.post(refreshRoute, postData)
                .then(response => {
                    if(response?.data?.access) {
                        AsyncStorage.setItem(response?.data?.access)
                        setUserToken(response?.data?.access)
                    }
                })
                .catch(error => console.log(error))
        }
        else {
            console.log('isLoggedIn() --->', 'tokenIsNOTExpired else case')
            const accessToken = await AsyncStorage.getItem('access-token')
            const parsedAccessToken = JSON.parse(accessToken)
            if(parsedAccessToken) {
                setUserToken(parsedAccessToken)
            }
        }
    }

    const signUp = (firstname, lastname, email, username, password, navigation) => {
        try {
            if (!firstname || !lastname || !email || !username || !password) {
                let errorMessage = 'You should fill the '
                if (!firstname) {
                    errorMessage += '\n-First Name'
                }
                if (!lastname) {
                    errorMessage += '\n- Last Name'
                }
                if (!email) {
                    errorMessage += '\n- E-mail'
                }
                if (!username) {
                    errorMessage += '\n- Username'
                }
                if (!password) {
                    errorMessage += '\n- Password'
                }
                Alert.alert('Validation Error !', errorMessage)
            } else {
                const userData = {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    username: username,
                    password: password
                }
                axios.post(signUpRoute, userData)
                    .then(response => {
                        if (response?.status === 200) {
                            Alert.alert(`User is crated successfully as ${username}`)
                            navigation.replace(NAVIGATION_LITERALS.LOGIN)
                        }
                    })
                    .catch(error => console.log(error))
            }
        } catch (error) {
            if(error.status === 409) {
                Alert.alert('Validation Error!', 'User already exists!')
            }
            if(error.message === 'Network Error') {
                Alert.alert('Network Error!', 'Could not connect to the server.')
            }
            console.log(error)
        }
    }

    useEffect(() => {
        isLoggedIn()
    }, [])


    return (
        <AuthContext.Provider value={{ logIn, logOut, userToken, signUp }}>
            {children}
        </AuthContext.Provider>
    )

}
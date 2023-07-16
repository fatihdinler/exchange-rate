import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert, Share, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useGetUserQuery } from '../../redux/api'
import { getHeight, getWidth } from '../../shared/constants/dimension'
import { ContactIcon, EmailIcon, FavouriteIcon, LanguageIcon, LocationIcon, LogoutIcon, MoonIcon, NextIcon, ShareIcon } from '../../shared/constants/icons'
import { LIGHT_THEME_COLORS } from '../../shared/constants/colors'
import Toolbar from '../../components/toolbar/toolbar'

const Profile = () => {
  const { logOut } = useContext(AuthContext)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    getRefreshToken(setUserId)
  }, [])

  const { data: user, isError, error } = useGetUserQuery(userId)
  const userData = user?.user


  return (
    <View style={styles.container}>
      {userData && (
        <View style={styles.layoutContainer}>
          <View style={styles.toolbar}>
            <Toolbar screenName='Profil' />
          </View>
          <ScrollView style={{ flex: 1, marginTop: 15 }}>
            <View style={styles.headerContainer}>
              <Image
                source={require('../../../assets/random-profile-picture.png')}
                style={styles.image}
                resizeMode='contain'
              />
              <View style={styles.headerTextContainer}>
                <Text style={styles.names}>{`${userData.firstname || '-'} ${userData.lastname || '-'}`}</Text>
                <Text style={styles.username}>@{userData.username || '-'}</Text>
              </View>
            </View>

            <View style={{ marginTop: 50, marginLeft: 20, marginBottom: 5 }}>
              <Text style={{ fontSize: getWidth() * 0.035, color: LIGHT_THEME_COLORS.GRAY1, fontWeight: 'bold' }}>Kullanıcı Bilgileriniz</Text>
            </View>
            <View style={styles.bodyContainer}>
              <View style={styles.bodyRowItem}>
                <EmailIcon
                  color={LIGHT_THEME_COLORS.GREEN}
                  size={getWidth() * 0.06}
                />
                <Text style={styles.bodyRowText}>{userData.email || '-'}</Text>
              </View>
              <View style={styles.bodyRowItem}>
                <LocationIcon
                  color={LIGHT_THEME_COLORS.GREEN}
                  size={getWidth() * 0.06}
                />
                <Text style={styles.bodyRowText}>Türkiye</Text>
              </View>
              <View style={styles.bodyRowItem}>
                <LanguageIcon
                  color={LIGHT_THEME_COLORS.GREEN}
                  size={getWidth() * 0.06}
                />
                <Text style={styles.bodyRowText}>Türkçe, TR</Text>
              </View>
            </View>

            <View style={{ marginTop: 25, marginLeft: 20, marginBottom: 5 }}>
              <Text style={{ fontSize: getWidth() * 0.035, color: LIGHT_THEME_COLORS.GRAY1, fontWeight: 'bold' }}>Etkileşim</Text>
            </View>
            <View style={styles.bodyContainer}>
              <View style={styles.bodyRowItem}>
                <FavouriteIcon
                  color={LIGHT_THEME_COLORS.GREEN}
                  size={getWidth() * 0.06}
                />
                <Text style={styles.bodyRowText}>26 adet favoriniz bulunuyor</Text>
              </View>
              <TouchableOpacity
                style={[styles.bodyRowItem, { justifyContent: 'space-between' }]}
                onPress={handleShareButton}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <ShareIcon
                    color={LIGHT_THEME_COLORS.GREEN}
                    size={getWidth() * 0.06}
                  />
                  <Text style={styles.bodyRowText}>Exchange Rate'i paylaşın</Text>
                </View>
                <NextIcon
                  color={LIGHT_THEME_COLORS.GREEN}
                  size={getWidth() * 0.06}
                />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.bodyRowItem, { justifyContent: 'space-between' }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <ContactIcon
                    color={LIGHT_THEME_COLORS.GREEN}
                    size={getWidth() * 0.06}
                  />
                  <Text style={styles.bodyRowText}>Bizimle iletişime geçin</Text>
                </View>
                <NextIcon
                  color={LIGHT_THEME_COLORS.GREEN}
                  size={getWidth() * 0.06}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.bodyRowItem}
                onPress={() => handleLogout(logOut)}>
                <LogoutIcon
                  color='red'
                  size={getWidth() * 0.06}
                />
                <Text className={`text-red-400`}>Çıkış Yap</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  )
}



export default Profile

const handleShareButton = async () => {
  try {
    const result = await Share.share({
      message: `Son borsa bilgilerini takip etmek için Exchange Rate'i arkadaşlarınız ile paylaşın !`,
      url: 'https://github.com/fatihdinler/exchange-rate',
    })
  } catch (error) {
    Alert.alert(error.message)
  }
}

const handleLogout = logOut => {
  Alert.alert('Çıkış yapmak üzeresiniz', 'Çıkış yapmak istediğinize emin misiniz?', [
    {
      text: 'Hayır',
      onPress: () => null,
      style: 'cancel',
    },
    {
      text: 'Çıkış Yap',
      onPress: () => logOut(),
    },
  ])
}

const getRefreshToken = async setState => {
  await AsyncStorage.getItem('user')
    .then(response => {
      const parsedData = JSON.parse(response)
      setState(parsedData.id)
    })
    .catch(err => console.log(err))
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layoutContainer: {
    flex: 1,
  },
  toolbar: {
    flex: 1 / 7,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: LIGHT_THEME_COLORS.WHITE,
    padding: 10,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginTop: 2,
  },
  headerTextContainer: {
    marginLeft: 15,
  },
  image: {
    width: getHeight() * 0.1,
    height: getHeight() * 0.1,
    borderRadius: getHeight() * 0.05,
  },
  names: {
    fontSize: getWidth() * 0.055,
    color: LIGHT_THEME_COLORS.GRAY1,
    fontWeight: 'bold',
  },
  username: {
    fontSize: getWidth() * 0.035,
    color: LIGHT_THEME_COLORS.GRAY2,
    marginTop: 5,
  },
  bodyContainer: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    backgroundColor: LIGHT_THEME_COLORS.WHITE,
  },
  bodyRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
    marginBottom: 7,
  },
  bodyRowText: {
    marginLeft: 10,
    fontSize: getWidth() * 0.04,
    fontWeight: '300',
  },
})


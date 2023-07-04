import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveDarkMode = async (exchangeRate) => {
  try {
    await AsyncStorage.setItem('dark-mode-exchange-rate', exchangeRate);
    console.log('Value saved successfully!');
  } catch (error) {
    console.log('Error saving value:', error);
  }
};

export const getDarkMode = async setState => {
  await AsyncStorage.getItem('dark-mode-exchange-rate')
    .then(response => {
      const parsedData = JSON.parse(response)
      setState(parsedData)
    })
    .catch(err => console.log(err))
}
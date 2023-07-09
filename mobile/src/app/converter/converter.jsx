import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Button, FlatList, Dimensions } from 'react-native'
import { useGetRatesQuery, useLazyGetMoneyConverterQuery } from '../../redux/api'
import { getGreetingMessage } from '../../shared/utils/greeting'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import BottomSheet from '@gorhom/bottom-sheet'
import { ChevronDown } from '../../shared/constants/icons'
import { Spinner } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Converter = () => {
  const [selectedMoneyFrom, setSelectedMoneyFrom] = useState('TRY')
  const [selectedMoneyTo, setSelectedMoneyTo] = useState('USD')
  const [amount, setAmount] = useState('0')
  const [savedConversions, setSavedConversions] = useState([])

  const bottomSheetRefForMoneyFrom = useRef(null)
  const bottomSheetRefForMoneyTo = useRef(null)

  const { data: rates } = useGetRatesQuery()
  const [getMoneyConverter, { data: currentData, isError, isFetching, isLoading }] = useLazyGetMoneyConverterQuery()

  const renderItem = useCallback(({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedMoneyFrom(item.selectedMoneyFrom)
          setSelectedMoneyTo(item.selectedMoneyTo)
          setAmount(item.amount.toString())
        }}
        onLongPress={() => handleDeleteConversion(index)}
        style={{
          backgroundColor: `rgb(0, ${index * 25}, 255)`,
          width: Dimensions.get('screen').width / 3.45,
          padding: 10,
          alignItems: 'center',
          borderRadius: 10,
          margin: 4,
        }}
      >
        <Text>{item.selectedMoneyFrom}</Text>
        <Text>{item.selectedMoneyTo}</Text>
        <Text>{item.amount}</Text>
      </TouchableOpacity>
    )
  }, [handleDeleteConversion])

  const handleSheetChangesForMoneyFrom = useCallback((index) => {
    console.log('handleSheetChangesForMoneyFrom', index)
  }, [])

  const handleSheetChangesForMoneyTo = useCallback((index) => {
    console.log('handleSheetChangesForMoneyTo', index)
  }, [])

  const handleOpenSheetForMoneyFrom = useCallback(() => {
    bottomSheetRefForMoneyFrom.current?.expand()
  }, [])

  const handleOpenSheetForMoneyTo = useCallback(() => {
    bottomSheetRefForMoneyTo.current?.expand()
  }, [])

  const moneyUnitsForFrom = useMemo(() => {
    return rates ? Object.keys(rates).map(item => item) : []
  }, [rates])

  const moneyUnitsForTo = useMemo(() => {
    return moneyUnitsForFrom.filter(item => item !== selectedMoneyFrom)
  }, [moneyUnitsForFrom, selectedMoneyFrom])

  const handleDeleteConversion = useCallback(async (index) => {
    try {
      const updatedConversions = [...savedConversions]
      updatedConversions.splice(index, 1)
      await AsyncStorage.setItem('conversions', JSON.stringify(updatedConversions))
      setSavedConversions(updatedConversions)
    } catch (error) {
      console.log('Error deleting conversion:', error)
    }
  }, [savedConversions])

  const handleStarButtonClick = useCallback(async () => {
    try {
      const newConversion = {
        selectedMoneyFrom,
        selectedMoneyTo,
        amount,
      }
      const updatedConversions = [...savedConversions, newConversion]
      await AsyncStorage.setItem('conversions', JSON.stringify(updatedConversions))
      setSavedConversions(updatedConversions)
    } catch (error) {
      console.log('Error storing conversion:', error)
    }
  }, [selectedMoneyFrom, selectedMoneyTo, amount, savedConversions])

  const handleFromChange = useCallback((item) => {
    setSelectedMoneyFrom(item)
    bottomSheetRefForMoneyFrom.current?.collapse()
    bottomSheetRefForMoneyFrom.current?.close()
  }, [])

  const handleToChange = useCallback((item) => {
    setSelectedMoneyTo(item)
    bottomSheetRefForMoneyTo.current?.collapse()
    bottomSheetRefForMoneyTo.current?.close()
  }, [])

  useEffect(() => {
    const fetchData = () => {
      if (selectedMoneyFrom && selectedMoneyTo && amount !== '0') {
        getMoneyConverter({ moneyFrom: selectedMoneyFrom, moneyTo: selectedMoneyTo, amount: parseFloat(amount) })
      }
    }
    const timeoutId = setTimeout(fetchData, 500)
    return () => clearTimeout(timeoutId)
  }, [amount, getMoneyConverter, selectedMoneyFrom, selectedMoneyTo])

  useEffect(() => {
    const fetchDefaultConversion = async () => {
      try {
        const defaultConversion = {
          selectedMoneyFrom: 'TRY',
          selectedMoneyTo: 'USD',
          amount: '0',
        }
        const savedConversionsJson = await AsyncStorage.getItem('conversions')
        if (savedConversionsJson) {
          const savedConversionsArray = JSON.parse(savedConversionsJson)
          setSavedConversions(savedConversionsArray)
        } else {
          setSavedConversions([defaultConversion])
          await AsyncStorage.setItem('conversions', JSON.stringify([defaultConversion]))
        }
      } catch (error) {
        console.log('Error retrieving conversions:', error)
      }
    }
    fetchDefaultConversion()
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, marginTop: 3, marginLeft: 3, marginRight: 3 }}>
        <View>
          <Text style={{ fontWeight: '300', fontSize: 18 }}>{getGreetingMessage()} Fatih!</Text>
          <Text style={{ fontWeight: '600', fontSize: 28 }}>Hesaplama</Text>
        </View>
        <Button title='Save' onPress={handleStarButtonClick} />
        <View style={{ backgroundColor: 'white', marginTop: 5, elevation: 8, borderRadius: 10 }}>
          <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 10 }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }} onPress={handleOpenSheetForMoneyFrom}>
              <Text style={{ fontSize: 16, marginRight: 4 }}>{selectedMoneyFrom}</Text>
              <ChevronDown size={30} color={'black'} />
            </TouchableOpacity>
            <View style={{ padding: 10, flex: 1, alignItems: 'flex-end' }}>
              <TextInput
                value={amount}
                onChangeText={text => setAmount(text)}
                keyboardType='number-pad'
                placeholder='0.00'
                style={{ fontSize: 18 }}
              />
            </View>
          </View>

          <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 10 }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={handleOpenSheetForMoneyTo}>
              <Text style={{ fontSize: 16, marginRight: 4 }}>{selectedMoneyTo}</Text>
              <ChevronDown size={30} color={'black'} />
            </TouchableOpacity>

            <View style={{ padding: 10 }}>
              <Text style={{ fontSize: 18, color: !currentData?.convertedData || amount === '0' ? '#888' : 'black' }}>
                {isFetching || isLoading ? <Spinner size='small' color='black' /> : currentData?.convertedData || '0.00'}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 5, flex: 1 }}>
          <FlatList
            data={savedConversions}
            keyExtractor={(item, index) => `conversion_${index}`}
            renderItem={renderItem}
            numColumns={3}
          />
        </View>

        <BottomSheet
          ref={bottomSheetRefForMoneyFrom}
          index={-1}
          snapPoints={['70%']}
          onChange={handleSheetChangesForMoneyFrom}
          enablePanDownToClose={true}
        >
          <FlatList
            data={moneyUnitsForFrom}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleFromChange(item)}
                style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#CCC' }}
              >
                <Text style={{ color: '#333' }}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </BottomSheet>

        <BottomSheet
          ref={bottomSheetRefForMoneyTo}
          index={-1}
          snapPoints={['60%']}
          onChange={handleSheetChangesForMoneyTo}
          enablePanDownToClose={true}
        >
          <FlatList
            data={moneyUnitsForTo}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleToChange(item)}
                style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#CCC' }}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default Converter

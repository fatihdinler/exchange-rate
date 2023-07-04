import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import { useGetRatesQuery, useGetMoneyConverterQuery, useLazyGetMoneyConverterQuery } from '../../redux/api'
import { getGreetingMessage } from '../../shared/utils/greeting'
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler'
import BottomSheet from '@gorhom/bottom-sheet'
import { ChevronDown } from '../../shared/constants/icons'
import { Spinner } from 'native-base'
const Converter = () => {
  const [selectedMoneyFrom, setSelectedMoneyFrom] = useState('')
  const [selectedMoneyTo, setSelectedMoneyTo] = useState('')
  const [amount, setAmount] = useState(0)
  const [calculatedValue, setCalculatedValue] = useState()

  const bottomSheetRefForMoneyFrom = useRef(null)
  const bottomSheetRefForMoneyTo = useRef(null)

  const { currentData: rates } = useGetRatesQuery()
  const [getMoneyConverter, { currentData, isError, isFetching, isLoading }] = useLazyGetMoneyConverterQuery()

  console.log(currentData, isLoading, isFetching, isError)

  const moneyUnitsForFrom = useMemo(() => {
    return rates ? Object.keys(rates).map(item => item) : []
  }, [rates])

  const moneyUnitsForTo = useMemo(() => {
    const moneyUnitsFromWithoutSelected = moneyUnitsForFrom.filter(item => item !== selectedMoneyFrom)
    return rates ? moneyUnitsFromWithoutSelected.map(item => item) : []
  }, [rates, moneyUnitsForFrom, selectedMoneyFrom])

  const handleSheetChangesForMoneyFrom = useCallback(index => {
    console.log('handleSheetChangesForMoneyFrom', index)
  }, [])

  const handleSheetChangesForMoneyTo = useCallback(index => {
    console.log('handleSheetChangesForMoneyTo', index)
  }, [])

  const handleFromChange = useCallback(item => {
    setSelectedMoneyFrom(item);
    bottomSheetRefForMoneyFrom.current?.collapse()
    bottomSheetRefForMoneyFrom.current?.close()
  }, []);
  
  const handleToChange = useCallback(item => {
    setSelectedMoneyTo(item);
    bottomSheetRefForMoneyTo.current?.collapse()
    bottomSheetRefForMoneyTo.current?.close()
  }, []);

  const handleOpenSheetForMoneyFrom = useCallback(() => {
    bottomSheetRefForMoneyFrom.current?.expand()
  }, [])

  const handleOpenSheetForMoneyTo = useCallback(() => {
    bottomSheetRefForMoneyTo.current?.expand()
  }, [])

  const calculateRate = text => {
    const newAmount = parseFloat(text) || 0; // Convert the text to a number, or 0 if it's not a valid number
  setAmount(newAmount) 
    console.log(amount)
    if (selectedMoneyFrom && selectedMoneyTo && amount) {
      getMoneyConverter({ moneyFrom: selectedMoneyFrom, moneyTo: selectedMoneyTo, amount: amount })
    }
  }

  useEffect(() => {
    if (!selectedMoneyFrom) {
      setSelectedMoneyFrom('TRY');
    }
    if (!selectedMoneyTo) {
      setSelectedMoneyTo('USD');
    }
  }, []);
  
  useEffect(() => {
    if (selectedMoneyFrom && selectedMoneyTo && amount) {
      getMoneyConverter({ moneyFrom: selectedMoneyFrom, moneyTo: selectedMoneyTo, amount: amount });
    }
  }, [selectedMoneyFrom, selectedMoneyTo, amount]);

  return (
    <GestureHandlerRootView className='flex-1'>
      <SafeAreaView className='flex-1 mt-3 ml-3 mr-3'>
        <View>
          <Text className='font-light text-lg'>{getGreetingMessage()} Fatih!</Text>
          <Text className='font-semibold text-3xl'>Hesaplama</Text>
        </View>

        <View className='bg-white mt-5 shadow-2xl rounded-xl'>
          <View className='flex-row p-3 items-center justify-between mx-3'>
            <TouchableOpacity
              className='flex-row items-center flex-1'
              onPress={handleOpenSheetForMoneyFrom}>
              <Text className='text-lg mr-2'>{selectedMoneyFrom}</Text>
              <ChevronDown
                size={30}
                color={'black'}
              />
            </TouchableOpacity>
            <View className='p-3 flex-1 items-end'>
              <TextInput
                value={amount}
                onChangeText={text => calculateRate(text)}
                keyboardType='number-pad'
                placeholder='0.00'
                style={{ fontSize: 18 }}
              />
            </View>
          </View>

          <View className='flex-row p-3 items-center justify-between mx-3'>
            <TouchableOpacity
              onPress={handleOpenSheetForMoneyTo}
              className='flex-row items-center'>
              <Text className='text-lg mr-2'>{selectedMoneyTo}</Text>
              <ChevronDown
                size={30}
                color={'black'}
              />
            </TouchableOpacity>
            <View className='p-3'>
              <Text
                style={{ fontSize: 18 }}
                className={!currentData?.convertedData || amount === 0 ? 'text-gray-400' : 'text-black'}>
                { isFetching || isLoading ? <Spinner size='sm' /> : (!amount ? '0.00' : currentData?.convertedData) }
              </Text>
            </View>
          </View>
        </View>

        <BottomSheet
          ref={bottomSheetRefForMoneyFrom}
          index={-1}
          snapPoints={['70%']}
          onChange={handleSheetChangesForMoneyFrom}
          enablePanDownToClose={true}>
          <ScrollView className='p-3'>
            {moneyUnitsForFrom?.map((item, index) => (
              <TouchableOpacity
                key={item}
                onPress={() => handleFromChange(item)}
                style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#CCC' }}>
                <Text style={{ color: '#333' }}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </BottomSheet>

        <BottomSheet
          ref={bottomSheetRefForMoneyTo}
          index={-1}
          snapPoints={['60%']}
          onChange={handleSheetChangesForMoneyTo}
          enablePanDownToClose={true}>
          <ScrollView className='p-3'>
            {moneyUnitsForTo.map((item, index) => (
              <TouchableOpacity
                key={item}
                onPress={() => handleToChange(item)}
                className={`p-3`}
                style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#CCC' }}>
                <Text className={``}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default Converter

import { Button, StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, {useContext} from 'react'
import { useGetProductsQuery } from '../../redux/api'
import { useSelector } from 'react-redux'
import { AuthContext } from '../../context/auth-context'
import SectionList from '../../components/list/section-list'

const Dashboard = () => {

  // const { data, isError, isFetching, isLoading } = useGetProductsQuery()
  // console.log(data, isError, isFetching, isLoading)

  // const state = useSelector(state => state)
  // console.log(state)

  const { logOut } = useContext(AuthContext)
  
  return (
    <SafeAreaView>
      <SectionList />
    </SafeAreaView>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
  }
})
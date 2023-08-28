import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DisplayAllAddressPage from '../PagesAddress/DisplayAllAddressPage'
import AddressDetailPage from '../PagesAddress/AddressDetailPage'
import AddressEditPage from '../PagesAddress/AddressEditPage'

const Stack=createNativeStackNavigator()

const StackNavigationAddress = () => {
  return (
    <Stack.Navigator>
        {/* <Stack.Screen name="All Address" component={DisplayAllAddressPage}  options={{ headerShown: false }}/> */}
        <Stack.Screen name="All Address" component={DisplayAllAddressPage}  options={{ headerShown: false }}/>
        <Stack.Screen name='Address Detail' component={AddressDetailPage}  options={{ headerShown: true ,title:"Property Detail"}}/>
        <Stack.Screen name='Address Edit' component={AddressEditPage}  options={{ headerShown: true }}/>
    </Stack.Navigator>
  )
}

export default StackNavigationAddress

const styles = StyleSheet.create({})
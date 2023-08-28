import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DisplayAllAddressPage from '../PagesAddress/DisplayAllAddressPage'
import AddressDetailPage from '../PagesAddress/AddressDetailPage'
import AddressEditPage from '../PagesAddress/AddressEditPage'
import FavoritePage from '../PageFavorite/FavoritePage'

const Stack=createNativeStackNavigator()

const StackNavigationFavorite = () => {
  return (
    <Stack.Navigator>
        {/* <Stack.Screen name="All Address" component={DisplayAllAddressPage}  options={{ headerShown: false }}/> */}
        <Stack.Screen name="Favorite Property Page" component={FavoritePage}  options={{ headerShown: false }}/>
        <Stack.Screen name='Favorite Address Detail' component={AddressDetailPage}  options={{ headerShown: true }}/>
        <Stack.Screen name='Favorite Address Edit' component={AddressEditPage}  options={{ headerShown: true }}/>
    </Stack.Navigator>
  )
}

export default StackNavigationFavorite

const styles = StyleSheet.create({})
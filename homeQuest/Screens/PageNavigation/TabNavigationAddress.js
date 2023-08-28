import { StyleSheet, Text, View } from 'react-native'
import React ,{useEffect, useState}from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import FavoritePage from '../PageFavorite/FavoritePage'
import Ionicons from 'react-native-vector-icons/Ionicons';
import StackNavigationAddress from './StackNavigationAddress'
import StackNavigationLogin from './StackNavigationLogin'
import StackNavigationFavorite from './StackNavigationFavorite'
import UserRegistrationPage from '../PageAccount/UserRegistrationPage'

import { useSelector,useDispatch } from 'react-redux'
import { AsyncStorageGetLoginInfo } from '../../src/Utils/functions'
import { GetDataFromFirestore } from '../../src/Utils/functions'
import { addProperty } from '../../ReduxToolKit/slices/AllPropertySlice'


const Tab=createBottomTabNavigator()

const TabNavigationAddress = () => {
  const dispatch=useDispatch()
  const favPropertyData=useSelector((state)=>{return state.favProperties})
  const [favPropertyCount,setFavPropertyCount]=useState(favPropertyData.length)
  // console.log(favPropertyCount)

    useEffect(()=>{
        setFavPropertyCount(favPropertyData.length)
        // console.log("Count fav Property :",favPropertyCount)
    },[favPropertyData])

    
    useEffect(()=>{
      console.log("Run at the beginning of application")
      AsyncStorageGetLoginInfo(dispatch)
     
      GetDataFromFirestore(dispatch)

      //set all initial orientation to portrait Mode
      
      
    },[])
  return (
    <NavigationContainer>
        <Tab.Navigator 
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Address Page') {
                iconName = focused
                  ? 'md-search': 'md-search-outline';
              } else if (route.name === 'Favorite Page') {
                iconName = focused ? 'heart' : 'heart-outline';
              }else if (route.name === 'Account Page') {
                iconName = focused ? 'person' : 'person-outline';
              }
  
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            // labelStyle: { fontSize: 50 },
            // tabBarStyle: { backgroundColor: '#fff' },
            tabBarLabelStyle: {
                fontSize: 14,
              },
              tabBarStyle: [
                {
                  display: 'flex',
                },
                null,
              ],
            headerShown:false
          })}
          //'tabBarOptions' is deprecated with below code
        //   tabBarOptions={{
        //     labelStyle: {
        //       fontSize: 15,
        //     },
        //   }}
        >
            {/* <Tab.Screen name="Address"  component= {StackNavigationAddress} /> */}
            
            {/* <Tab.Screen name='Address Page' component={DisplayAllAddressPage} /> */}
            <Tab.Screen name='Address Page' component={StackNavigationAddress} options={{title:'Search'}}/>
            <Tab.Screen name='Favorite Page' component={StackNavigationFavorite} options={{ tabBarBadge: favPropertyCount, title:'Favorite'}}/>
            <Tab.Screen  name='Account Page' component={StackNavigationLogin} options={{title:'User'}}/>
        </Tab.Navigator>
    </NavigationContainer>
  )
}

export default TabNavigationAddress

const styles = StyleSheet.create({})
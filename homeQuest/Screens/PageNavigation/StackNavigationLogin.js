import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LogInPage from '../PageAccount/LogInPage'

import UserRegistrationPage from '../PageAccount/UserRegistrationPage'
import UserPageInfo from '../PageAccount/UserPageInfo'
import UserPageEdit from '../PageAccount/UserPageEdit'
import LastLogInPage from '../PageAccount/LastLogInPage'

const Stack=createNativeStackNavigator()

const StackNavigationLogin = () => {
  return (
    <Stack.Navigator initialRouteName='Last Login'>
        <Stack.Screen name="Last Login" component={LastLogInPage} options={{headerShown:false}}/>
        <Stack.Screen name="Login" component={LogInPage} options={{headerShown:false}}/>
        <Stack.Screen name='Registration Page' component={UserRegistrationPage} options={{headerShown:true, title:'New User'}}/>
        <Stack.Screen name='User Page Info'  component={UserPageInfo} options={{headerShown:true,title:'User Profile'}}/>
        <Stack.Screen name='User Page Edit' component={UserPageEdit} options={{headerShown:true}}/>
    </Stack.Navigator>
  )
}

export default StackNavigationLogin

const styles = StyleSheet.create({})
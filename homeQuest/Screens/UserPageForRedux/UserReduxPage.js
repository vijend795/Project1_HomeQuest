import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { fakeUserData } from '../../src/DataApi/fakeUserData'
import { useDispatch } from 'react-redux'
import { addUser ,deleteUser,removeUser} from '../../ReduxToolKit/slices/UserSlice'
import { useSelector } from 'react-redux'

const UserReduxPage = () => {
  const data =useSelector((state)=>{
    return state.users
  })
  console.log(data)
  const dispatch=useDispatch()

  const addNewUser=(payload)=>{
    console.log("New Payload:",payload)
    dispatch(addUser(payload))

  }

  const deleteUser=(index)=>{

    dispatch(removeUser(index))
  }
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text>User Redux form</Text>
        <Button title='Add User' onPress={()=>addNewUser(fakeUserData())}/>
        <Text> Display All User </Text>
     
        <FlatList
        data={data}
        renderItem={({item,index})=>{
       
          return(
            <View style={{justifyContent:'space-between',flexDirection:'row',width:300,marginBottom:10}}>
              <Text style={{justifyContent:'center',alignSelf:'center'}}>{item}</Text>
              <Button title='DELETE'onPress={()=>deleteUser(index)}/>
            </View>
          )
        }}
        keyExtractor={(index)=>index}
        />
       
       
        <Button title='Delete All User' />

    </SafeAreaView>
  )
}

export default UserReduxPage

const styles = StyleSheet.create({
    mainContainer:{
        // flex:1,
        justifyContent:'center',
        // alignContent:'center',
        alignItems:'center'
    }
})
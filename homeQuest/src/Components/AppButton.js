import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const AppButton = ({title,color,onPress}) => {
  return (
   <TouchableOpacity style={[{backgroundColor:color},styles.btnContainer]} onPress={onPress}>
    <Text style={styles.btnText}>{title}</Text>
   </TouchableOpacity>
  )
}

export default AppButton

const styles = StyleSheet.create({
  btnContainer:{
    width:'70%',
    // Height:80,
    marginHorizontal:10,
    marginVertical:10,
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
    paddingHorizontal:20,
    paddingVertical:3,
    borderRadius:10,
    minWidth:80,
    
    
  },
  btnText:{
    color:'white',
    fontSize:19,
    fontWeight:'bold',
    padding:5,
    // width:70,
    // alignSelf:'center',
    // justifyContent:'center',
    // alignContent:'center',
    // alignItems:'center'
  },

})
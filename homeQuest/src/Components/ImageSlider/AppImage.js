import { StyleSheet, Text, View ,Image} from 'react-native'
import React from 'react'

const AppImage = ({source,width,height}) => {
  // console.log(source)
  return (
    <Image style={[styles.imageContainer,{width:width},{height:height}]} source={{uri:source}} alt="image not found" />
  
  
  )
}

export default AppImage

const styles = StyleSheet.create({
    imageContainer:{
        margin:10,
        // width:250,
        height:180,
        borderColor:'black',
        borderRadius:15,
        // overflow:'visible'
    }
})
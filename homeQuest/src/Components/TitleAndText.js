import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TitleAndText = ({title,text}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.divider}>:</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

export default TitleAndText

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        marginBottom:5,
    },
    title:{
        fontSize:14,
        fontWeight:'bold',
        width:'35%',
    },
    divider:{
        fontSize:14,
        fontWeight:'bold',
        width:5,
    },
    text:{
        fontSize:14,
        fontWeight:'400',
        width:'60%',
    },
})
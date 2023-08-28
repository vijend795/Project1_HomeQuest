import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Foundation } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const BtnAmenities = ({item}) => {
  return (
    <View style={styles.amenitiesContainer}>
      {item === 'Lift' && <Foundation name="elevator" size={24} color="black" />}
      {item === 'Parking' && <FontAwesome5 name="car" size={24} color="black" />}
      {item === 'Pet Friendly' && <MaterialIcons name="pets" size={24} color="black" />}
    </View>
  )
}

export default BtnAmenities

const styles = StyleSheet.create({
  amenitiesContainer:{
    // backgroundColor:'green',
    marginHorizontal:5,
    marginBottom:5,
    borderRadius:7,
    
  },

})
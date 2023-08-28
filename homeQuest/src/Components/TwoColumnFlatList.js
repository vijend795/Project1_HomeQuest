import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import BtnAmenities from "./BtnAmenities";

const TwoColumnFlatList = ({ data }) => {
  const mid = Math.ceil(data.length / 2);
  const column1 = data.slice(0, mid);
  const column2 = data.slice(mid);

  return (
    <View style={styles.listContainer}>
      <View >
      {
      column1.map((item,index)=>(
      <View key={index} style={styles.amenities}>
        <BtnAmenities item={item} />
        <Text>{item}</Text>
      </View>
      ))
      }
      </View>
      <View>
      {
      column2.map((item,index)=>(
      <View key={index} style={styles.amenities}>
        <BtnAmenities item={item} />
        <Text>{item}</Text>
      </View>
      ))
      }
      </View>
      
      
    </View>
  );
};

export default TwoColumnFlatList;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent:'space-between',
    marginHorizontal:20,
    
  },
  amenities: {
    flexDirection: "row",
    // paddingLeft:15,
  },
  amenitiesContainer: {
    flexWrap: "wrap",
  },
});

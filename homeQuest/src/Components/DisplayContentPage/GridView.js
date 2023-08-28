import { StyleSheet, Text, View,FlatList } from "react-native";
import React from "react";
import AddressCard from "../AddressCard";

const GridView = ({ propertyData ,navigation}) => {
  console.log("property data send to grid flat list ",propertyData)
  return (
    <View style={styles.mainContainer}>
      {
        <FlatList
          data={propertyData}
          renderItem={({ item }) => {
            // const address = Object.values(item.address).join(", ");
            // console.log(address)
            return (
              <AddressCard
                id={item.id}
                navigation={navigation}
              />
            );
          }}
          keyExtractor={(item) => item.id} // Assuming each item has a unique "id" property
        />
      }
      <Text></Text>
    </View>
  );
};

export default GridView;

const styles = StyleSheet.create({
  mainContainer:{
    // flex:1,
    // marginBottom:180,
  }
});

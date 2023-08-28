import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView, { Marker, Circle, Polyline, Overlay } from "react-native-maps";
import * as Location from "expo-location";
// import { Properties } from '../../DataApi/AddressesData';
import { useDispatch,useSelector } from "react-redux";
// import { addFavPropertySlice,removeFavPropertySlice } ;

import { addFavPropertySlice,removeFavPropertySlice } from "../../../ReduxToolKit/slices/FavPropertySlice";

const MapViewComponent = ({ propertyData, navigation }) => {
  return (
    <View style={styles.mapContainer}>
      <MapView
        style={{
          width: "100%",
          height: "100%",
          // marginTop:"-20%",
          
        }}
        initialRegion={{
          latitude: -41.28958343318995,
          longitude: 174.7742629154546,
          latitudeDelta: 0.1,
          longitudeDelta: 0.01,
        }}
      >
        {propertyData.map((property) => {
          // console.log(property.gCoordinate.latitude);
          // console.log(property.id);
          return (
            <Marker
              key={property.id}
              coordinate={property.gCoordinate}
              title={property.address.streetName}
              description={property.title}
              pinColor='gold'
            ></Marker>
          );
        })}
        
      </MapView>
    </View>
  );
};

export default MapViewComponent;

const styles = StyleSheet.create({
  mapContainer: {
    width: "99%",
    // height: "100%",
    // backgroundColor:'red',
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop:'-25%',
    zIndex:1000,
  },
});

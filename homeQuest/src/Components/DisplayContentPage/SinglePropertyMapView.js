import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView, { Marker, Circle, Polyline, Overlay } from "react-native-maps";
import * as Location from "expo-location";
// import { Properties } from '../../DataApi/AddressesData';
import { useDispatch,useSelector } from "react-redux";
// import { addFavPropertySlice,removeFavPropertySlice } ;

import { addFavPropertySlice,removeFavPropertySlice } from "../../../ReduxToolKit/slices/FavPropertySlice";

const SinglePropertyMapView = ({ propertyData, navigation }) => {
    // const latitudeV=propertyData.gCoordinate.latitude
    // const longitudeV=propertyData.gCoordinate.longitude
    
  return (
    <View style={styles.mapContainer}>
      <MapView
        style={{
          width: "100%",
          height: "100%",
          // marginTop:"-20%",
          
        }}
        initialRegion={{
          latitude:propertyData.gCoordinate.latitude,
          longitude: propertyData.gCoordinate.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
     
            <Marker
              key={propertyData.id}
              coordinate={propertyData.gCoordinate}
              title={propertyData.address.streetName}
              description={propertyData.description.shortDescription}
              pinColor='gold'
            ></Marker>
       
        
      </MapView>
    </View>
  );
};

export default SinglePropertyMapView;

const styles = StyleSheet.create({
  mapContainer: {
    flex:1,
    width: "100%",
    // height: "100%",
    // backgroundColor:'red',
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    // marginTop:'-25%',
    // zIndex:1000,
  },
});

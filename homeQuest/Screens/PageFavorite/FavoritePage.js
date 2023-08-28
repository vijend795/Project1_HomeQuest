import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import GridView from "../../src/Components/DisplayContentPage/GridView";
import MapViewComponent from "../../src/Components/DisplayContentPage/MapViewComponent";
import { useSelector } from "react-redux";
import SortFilter from "../../src/Components/SortFilter";

const FavoritePage = ({ navigation }) => {
  const favPropertyData = useSelector((state) => {
    return state.favProperties;
  });
  const allPropertiesData = useSelector((state) => {
    return state.allProperties;
  });

  const selectedData = () => {
    return allPropertiesData.filter((property) => {
      return favPropertyData.some((eachFavProperty) => {
        return property.id === eachFavProperty.id;
      });
    });
  };

  useEffect(() => {
    // setFavPropertyCount(favPropertyData.length)
    // console.log("Count fav Property :",favPropertyCount)
    setPropertyData(selectedData());
  }, [favPropertyData]);

  useEffect(() => {
    console.log("Fav property data changed");
    console.log("No of selected item :", selectedData().length);
    setPropertyData(selectedData());
  }, [propertyData]);
  
  // console.log("selected Data:",selectedData())
  const [propertyData, setPropertyData] = useState(selectedData);

  const [mapScreen, setMapScreen] = useState(false);
  const [displayFilter, setDisplayFilter] = useState(false);
  const [showSaleProperty, setShowSaleProperty] = useState(true);
  const [showLeaseProperty, setShowLeaseProperty] = useState(false);
  
  const handleQuickSortByFeature = () => {
    setDisplayFilter((prevState) => !prevState);
  };
  const handleCloseFilter = (childParam) => {
    setDisplayFilter(childParam);
  };
  const handleOnlySale = () => {
    console.log("Show only Property for Sale");
    setShowSaleProperty((prevState) => !prevState);
    setShowLeaseProperty((prevState) => !prevState);
  };
  const handleOnlyLease = () => {
    console.log("Show only Property for Lease");
    setShowLeaseProperty((prevState) => !prevState);
    setShowSaleProperty((prevState) => !prevState);
  };
  const handleSwitchMap = () => {
    // console.log("Map Screen Value 1:",mapScreen)
    // setMapScreen((prevMapScreen) => !prevMapScreen);
    if (mapScreen === false) {
      // console.log("Map Screen Value 1:",mapScreen)
      setMapScreen(true);
    } else {
      // console.log("Map Screen Value 2 :",mapScreen)
      setMapScreen(false);
    }
  };



  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.quickFilterContainer}>
        <TouchableOpacity
          onPress={handleQuickSortByFeature}
          style={styles.btnQuickSort}
        >
          <Text> sort by: Features </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleOnlySale}
          style={[
            styles.btnQuickSort,
            showSaleProperty ? { backgroundColor: "lightblue" } : null,
          ]}
        >
          <Text> For Sale </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOnlyLease} style={[
            styles.btnQuickSort,
            showLeaseProperty ? { backgroundColor: "lightblue" } : null,
          ]}>
          <Text> For Lease </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardContainer}>
        {mapScreen ? (
          <MapViewComponent
            propertyData={propertyData}
            navigation={navigation}
          />
        ) : (
          <GridView propertyData={propertyData} navigation={navigation} />
        )}
      </View>
      <TouchableOpacity
        style={styles.btnSwitchViewFloat}
        onPress={handleSwitchMap}
      >
        {mapScreen ? (
          <View style={styles.btnSwitchMap}>
            <FontAwesome5
              name="list"
              size={22}
              color="white"
              style={styles.iconSwitchMap}
            />
            <Text style={styles.textSwitchMap}>List View</Text>
          </View>
        ) : (
          <View style={styles.btnSwitchMap}>
            <FontAwesome5
              name="map-marked-alt"
              size={22}
              color="white"
              style={styles.iconSwitchMap}
            />
            <Text style={styles.textSwitchMap}>Map View</Text>
          </View>
        )}
      </TouchableOpacity>
      {displayFilter ? (
        <SortFilter filterCloseBtnStatus={handleCloseFilter} />
      ) : null}
    </SafeAreaView>
  );
};

export default FavoritePage;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // position:'absolute',
    // alignSelf:'center'
    marginBottom: 110,
  },
  quickFilterContainer: {
    width: "95%",
    flexDirection: "row",
    zIndex: 500,
    justifyContent: "flex-start",
  },
  btnQuickSort: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "rgb(250, 250, 250)",
    border: 1,
    borderColor: "blue",
    borderRadius: 15,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  cardContainer: {
    // backgroundColor: "red",
    // height:'83%',
    // marginTop: "-140%",
    // zIndex:1000,
  },
  btnSwitchView: {
    // marginTop: "-135%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    // zIndex:1000,
  },
  btnSwitchMap: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    // paddingHorizontal:8,
    // backgroundColor: "rgb(250, 250, 250)",
    // backgroundColor:'blue',
    borderRadius: 15,
    //   backgroundColor:'#1E90FF'
    // backgroundColor:'#4682B4'
    // backgroundColor:'#6495ED'
    backgroundColor: "#4169E1",
    // backgroundColor:'#0000CD'
  },
  iconSwitchMap: {
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  textSwitchMap: {
    color: "white",
    fontSize: 15,
    fontWeight: "800",
  },
  btnSwitchViewFloat: {
    position: "absolute",
    bottom: 0,
    marginBottom: 20,
    // justifyContent:'center',
    // alignContent:'center',
    // alignItems:'center',
    alignSelf: "center",
    // backgroundColor:'blue',
    borderRadius: 15,
  },
});

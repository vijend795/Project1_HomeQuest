import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import AddressCard from "../../src/Components/AddressCard";
// import { Properties } from "../../src/DataApi/AddressesData";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import GridView from "../../src/Components/DisplayContentPage/GridView";
import MapViewComponent from "../../src/Components/DisplayContentPage/MapViewComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import SortFilter from "../../src/Components/SortFilter";

const DisplayAllAddressPage = ({ navigation }) => {
  const [displayFilter, setDisplayFilter] = useState(false);
  const [showSaleProperty, setShowSaleProperty] = useState(true);
  const [showLeaseProperty, setShowLeaseProperty] = useState(false);
  const favProperties = useSelector((state) => {
    return state.favProperties;
  });
  // const [favPropertyData,setFavPropertyData]=useState(favProperties)
  const allPropertiesData = useSelector((state) => {
    return state.allProperties;
  });
  // console.log("All Property Data by redux :",allPropertiesData)
  // const [propertyData, setPropertyData] = useState(Properties);
  const [propertyData, setPropertyData] = useState(allPropertiesData);

  useEffect(() => {
    console.log("Display All property page has change in fav propeties");
    setPropertyData(allPropertiesData);
    // setFavPropertyData(favProperties)
  }, [favProperties]);

  useEffect(() => {
    setPropertyData(allPropertiesData);
    // setFavPropertyData(favProperties)
  }, [allPropertiesData]);

  const [searchCriteria, setSearchCriteria] = useState("");
  const [mapScreen, setMapScreen] = useState(false);

  useEffect(() => {
    // console.log("Search Criteria changed to :", searchCriteria);
  }, [searchCriteria]);

  const handleSearchProperty = () => {
    console.log("Property search by search field :", searchCriteria);
  };
  const handleBtnFav = () => {
    console.log("Fav button pressed -Navigate to fav page ");
  };
  const handleBtnFilter = () => {
    console.log("Advance Filter Button presses , open filter page");
  };
  const handleQuickSortByFeature = () => {
    // console.log("sort properties by feature like , rating, price , etc");
    setDisplayFilter((prevState) => !prevState);
    // console.log('display Filter' ,displayFilter)
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
  const handleCloseFilter = (childParam) => {
    setDisplayFilter(childParam);
  };
  useEffect(() => {}, []);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons
            name="search"
            size={20}
            color="#808080"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            value={searchCriteria}
            onChangeText={setSearchCriteria}
            placeholder="Search..."
            placeholderTextColor="#808080"
          />
        </View>
        <View style={styles.searchBtnContainer}>
          <Text style={styles.lineDivide}>|</Text>
          <TouchableOpacity onPress={handleBtnFilter}>
            <Ionicons
              name="filter-sharp"
              size={24}
              color="blue"
              style={styles.searchFilter}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.quickFilterContainer}>
        <TouchableOpacity
          onPress={handleQuickSortByFeature}
          style={styles.btnQuickSort}
        >
          <Text> Sort by: Features </Text>
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

export default DisplayAllAddressPage;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // position:'absolute',
    // justifyContent:'center',
    // alignContent:'center',
    // alignItems:'center',
    // alignSelf:'center'
    // flex:1,
    marginBottom: 110,
  },
  searchContainer: {
    flexDirection: "row",
    // marginTop: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    border: 1,
    borderColor: "grey",
    borderRadius: 8,
    backgroundColor: "rgb(250, 250, 250)",
    borderColor: "red",
    justifyContent: "space-between",
    // alignContent:'center',
    alignItems: "center",
    // alignSelf:'center',
    zIndex: 500,
  },
  searchIcon: {
    // backgroundColor:'red'
  },
  searchInput: {
    // backgroundColor:'grey'
    // justifyContent:'center',
    // alignContent:'center',
    // alignItems:'center',
    fontSize: 20,
    padding: 5,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchBtnContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",
    alignItems: "center",
  },
  searchFavorite: {
    paddingHorizontal: 5,
    alignSelf: "center",
  },
  searchFilter: {
    paddingHorizontal: 5,
    alignSelf: "center",
  },
  lineDivide: {
    fontSize: 25,
    color: "lightgrey",
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
    marginBottom: -70,
    // justifyContent:'center',
    // alignContent:'center',
    // alignItems:'center',
    alignSelf: "center",
    // backgroundColor:'blue',
    borderRadius: 15,
  },
});

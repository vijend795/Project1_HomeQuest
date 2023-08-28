import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
// import { Properties } from "../../src/DataApi/AddressesData";
import TitleAndText from "../../src/Components/TitleAndText";
import AppButton from "../../src/Components/AppButton";
import { useSelector, useDispatch } from "react-redux";
import AppImageSlider from "../../src/Components/ImageSlider/AppImageSlider";
import { Ionicons } from "@expo/vector-icons";
import {
  addFavPropertySlice,
  removeFavPropertySlice,
} from "../../ReduxToolKit/slices/FavPropertySlice";
import { Share } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import BtnAmenities from "../../src/Components/BtnAmenities";
import TwoColumnFlatList from "../../src/Components/TwoColumnFlatList";
import MapViewComponent from "../../src/Components/DisplayContentPage/MapViewComponent";
import SinglePropertyMapView from "../../src/Components/DisplayContentPage/SinglePropertyMapView";
import {ref,getStorage,getDownloadURL} from 'firebase/storage'
import { useEffect } from "react";

const AddressDetailPage = ({ navigation, route }) => {
  const storage=getStorage()
  const [showFullDescription, setShowFullDescription] = useState(false);

  const dispatch = useDispatch();
  const favPropertyData = useSelector((state) => {
    return state.favProperties;
  });
  const allPropertiesData = useSelector((state) => {
    return state.allProperties;
  });
  const [isFavorite, setIsFavorite] = useState(() => {
    return favPropertyData.some((property) => property.id === route.params.id);
  });

  console.log(route.params.id);
  const selectedProperty = allPropertiesData.filter(
    (property) => property.id === route.params.id
  )[0];
  console.log(selectedProperty);
  const address = Object.values(selectedProperty.address).join(", ");
  const coordinate = Object.values(selectedProperty.gCoordinate).join(", ");

  const handleSocialMediaShare = () => {
    console.log("Share Button Pressed");
    const options = {
      title: "Property Share",
      message: Object.values(selectedProperty.address).join(", "),
      uri: selectedProperty.image,
      // social: Share.Social.WHATSAPP, // Specify the platform here
    };

    Share.share(options)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log("Error while sharing media:", error);
      });
  };
  const handleEdit = () => {
    console.log("Share Button Pressed");
  };
  const handleAddToFav = () => {
    // console.log("Add to fav button presses");
    const selectedFavoriteProperty = { id: route.params.id };

    if (isFavorite === false) {
      // console.log("Item Not added to favorite , now adding id.... ",selectedFavoriteProperty);
      dispatch(addFavPropertySlice(selectedFavoriteProperty));
      setIsFavorite(true);
      // console.log("updated fav property list:",favPropertyData)
    } else {
      // console.log("Item is already added to favorite , now deleting.... :",selectedFavoriteProperty);
      dispatch(removeFavPropertySlice(selectedFavoriteProperty));
      setIsFavorite(false);
      //  console.log("updated fav property list:",favPropertyData)
    }
  };
  const fullDescriptionText = selectedProperty.description.longDescription;
  const fullDescriptionTextDisplayed = showFullDescription
    ? fullDescriptionText
    : fullDescriptionText.substring(0, 200) + "  ...";

  const handleShowFullDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  console.log(selectedProperty.allImageArray)
  const [propertyImageArray,setPropertyImageArray]=useState([])
  let counter =0
  const getImageArrayUrl=()=>{
    console.log("Counter :",counter)
    
    console.log("total property",selectedProperty.allImageArray.length)
    selectedProperty.allImageArray.map((item)=>{
      const pathReference=ref(storage,item)
      getDownloadURL(pathReference)
      .then((url)=>{
        setPropertyImageArray((prevPropertyImageArray) => [
          ...prevPropertyImageArray,
          url,
        ]);
      })
      .catch((error)=>{
        console.log("error while creating url for property image arrayimag :",error)
      })
    })
    // console.log("property image array :",propertyImageArray)
  }
 
  useEffect(()=>{
     getImageArrayUrl()
  },[])

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.cardImageContainer}>
          {/* <Image source={selectedProperty.image} style={styles.imgStyle} /> */}
          <AppImageSlider
            style={styles.selectedProperty}
            imagesArray={propertyImageArray}
          />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.title}>{address}</Text>
              <Text style={styles.shortDescription}>
                {selectedProperty.title}
              </Text>
            </View>
          </View>

          <View style={[styles.priceContainer, styles.titleContainer]}>
            <Foundation
              name="dollar"
              size={24}
              color="black"
              style={styles.dollarSign}
            />
            <Text style={styles.price}> {selectedProperty.price}</Text>
          </View>
          <View style={[styles.amenitiesContainer, styles.titleContainer]}>
            <TwoColumnFlatList data={selectedProperty.amenities} />
          </View>

          <View style={[ styles.titleContainer,{flexDirection:'column',alignItems:'flex-start'}]}>
            <Text style={styles.availableFromTitle}> Available From</Text>
            <Text style={styles.availableFromDate}> {selectedProperty.availableFrom}</Text>
          </View>

          <View style={[styles.titleContainer,{borderBottomWidth:0}]}>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.descriptionHeader}>Property Detail</Text>

              <Text style={styles.descriptionTitle}>
                Property id: {selectedProperty.id} | Listed on:{" "}
                {selectedProperty.createdOn}
              </Text>
              <Text style={styles.descriptionContent}>
                {fullDescriptionTextDisplayed}
              </Text>
             
              <TouchableOpacity
                style={styles.readMoreContainer}
                onPress={handleShowFullDescription}
              >
                <Text style={styles.readMoreText}>
                {
                  !showFullDescription ? "Read More":"Read Less"
                  }</Text>
                <AntDesign name={
                  !showFullDescription ? "down":"up"
                  } size={18} color="blue" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={ styles.mapContainer}>
            <SinglePropertyMapView propertyData={selectedProperty}/>
          </View>
          <View style={ styles.propertyManagerContainer}>
            <View style={styles.propertyManagerHeader}>
              <Image
              source={require("../../assets/HomeQuest/logo_transparent.png")}
              alt="Image Not Found"
              resizeMode='cover'
              style={styles.logoCompany}
              />  
            </View>
            <View style={styles.propertyManagerInfoContainer}>
                <Image
                source={require("../../assets/managerSampleImg.jpg")}
                alt="Image Not Found"
                style={styles.propManagerImg}
              />
              <View style={{flexDirection:'column'}}>
                <Text style={{fontSize:20,fontWeight:'bold',color:'blue'}}> {selectedProperty.assignManager.name}</Text>
                <Text style={{fontSize:15,fontWeight:600,color:'grey'}}> {selectedProperty.assignManager.designation}</Text>
              </View>
             
                
            </View>
            <View style={styles.propertyManagerBtn}>
              <TouchableOpacity style={styles.btnCall}>
                <Ionicons name="call-outline" size={24} color="black" />
                <Text style={styles.btnCallText}> Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnEmail}>
              <Ionicons name="md-mail" size={24} color="white" />
                <Text style={styles.btnEmailText}> Email</Text>
              </TouchableOpacity>
        
            </View>
          </View>
           

          <View style={styles.btnContainer}>
            <AppButton title="Edit" color="green" onPress={handleEdit} />
          </View>
        </View>

        <View style={styles.floatingBtnFavAndShare}>
          <TouchableOpacity style={styles.addToFav} onPress={handleAddToFav}>
            <Ionicons
              name={isFavorite ? "md-heart" : "md-heart-outline"}
              size={24}
              color="red"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addToFav}
            onPress={handleSocialMediaShare}
          >
            <AntDesign name="sharealt" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddressDetailPage;

const styles = StyleSheet.create({
  mainContainer: {
    // position:'absolute',
    // alignSelf:'center',
    // flex: 1,
    // justifyContent: "space-start",
    alignItems: "center",
    // marginBottom:50,
    // backgroundColor: "red",
  },
  cardImageContainer: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    // backgroundColor: "red",
    padding: 10,
  },
  infoContainer: {
    justifyContent: "space-between",
    width: "90%",
    // backgroundColor: "yellow",
  },
  imgStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  btnContainer: {
    // backgroundColor: "red",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    display:"none"
  },
  floatingBtnFavAndShare: {
    position: "absolute",
    top: 15,
    right: 20,
    flexDirection: "row",
  },
  addToFav: {
    marginLeft: 10,
  },
  titleContainer: {
    paddingVertical: 10,

    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "grey",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  shortDescription: {
    paddingVertical: 5,
    fontSize: 13,
    fontWeight: "bold",
  },
  priceContainer: {},
  dollarSign: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "red",
    borderRadius: 50,
  },
  price: {
    paddingVertical: 5,
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 5,
  },
  descriptionHeader: {
    fontSize: 25,
    color: "black",
    fontWeight: "bold",
    marginBottom: 8,
  },
  descriptionTitle: {
    fontSize: 15,
    color: "grey",
    marginBottom: 8,
  },
  descriptionContent: {
    // justifyContent:'space-evenly',
    // alignSelf:'auto',
    letterSpacing: 1.3,
    justifyContent: "space-evenly",
    textAlign: "justify",
    // maxHeight:150,
  },
  readMoreContainer: {
    flexDirection: "row",
    // justifyContent:'center',
    alignItems: "center",
  },
  readMoreText: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 15,
    marginRight: 5,
  },
  availableFromTitle:{
    fontSize:23,
    color:'blue'
  },
  availableFromDate:{
    fontSize:15,
    color:'grey'
  },
  mapContainer:{
    width:'100%',
    height:300,
    marginVertical:20,
    padding:2,
    borderWidth:2,
    // borderBttomColor:'blue',
    borderColor:'white',
    borderRadius:8,
  },
  propertyManagerContainer:{
    flex:1,
    borderRadius:15,
    backgroundColor:'white',
    marginBottom:10,
  },
  propertyManagerHeader:{
    backgroundColor:'royalblue',
    borderTopRightRadius:15,
    borderTopStartRadius:15,
    justifyContent:'center',
    alignItems:'center',
    
  
  },
  logoCompany:{
    width:180,
    height:65,
    // backgroundColor:'red',
    marginVertical:10,
    
    
  },
  propertyManagerInfoContainer:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    margin:10,
  },
  propManagerImg: {
    // justifyContent: "center",
    // alignSelf: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight:20,
    zIndex: 300,
  },
  propertyManagerBtn:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:20,
    marginVertical:10,
    
  },
  btnCall:{
    width:'40%',
    borderWidth:2,
    borderColor:'blue',
    justifyContent:'center',
    borderRadius:4,
    alignItems:'center',
    flexDirection:'row',
  },
  btnCallText:{
    marginVertical:10,
    alignSelf:'center',
    paddingLeft:5,
    fontWeight:'bold',
  },
  btnEmail:{
    width:'40%',
    backgroundColor:'blue',
    justifyContent:'center',
    borderRadius:4,
    alignItems:'center',
    flexDirection:'row',
  },
  btnEmailText:{
    alignSelf:'center',
    marginVertical:10,
    color:'white',
    paddingLeft:5,
    fontWeight:'bold',
  },
});

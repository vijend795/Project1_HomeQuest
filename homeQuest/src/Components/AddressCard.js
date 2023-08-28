import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import TitleAndText from "./TitleAndText";
import BtnAmenities from "./BtnAmenities";
import AppButton from "./AppButton";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavPropertySlice,
  removeFavPropertySlice,
} from "../../ReduxToolKit/slices/FavPropertySlice";
import { getDownloadURL, ref, getStorage } from "firebase/storage";
import { SocialMediaShare } from "../Utils/functions";

const AddressCard = ({ navigation, id }) => {
  //configure dispatch
  const dispatch = useDispatch();
  const storage = getStorage();
  //get favProperty data and all Property Data from Redux toolkit
  const favPropertyData = useSelector((state) => {
    return state.favProperties;
  });
  const allPropertiesData = useSelector((state) => {
    return state.allProperties;
  });

  //get the selected property data from allProperty by matching ID  from params
  const selectedProperty = allPropertiesData.filter(
    (property) => property.id === id
  )[0];

  const [favProperty, setFavProperty] = useState(selectedProperty);
  const {
    propertyID,
    address,
    price,
    area,
    amenities,
    imageProperty,
    lastUpdatedOn,
    assignManager,
  } = selectedProperty;
  console.log(
    "Property Image Url ",
    "for Selected property id : ",
    id,
    "is",
    assignManager.imageManager
  );

  //getting image url for manage image
  // const imgUrl=GetImageURIFromImagePath(selectedProperty.assignManager.imageManager)
  const [imgUrl, setImgUrl] = useState("");
  const getImageUrl = () => {
    console.log("path :", selectedProperty.assignManager.imageManager);
    const pathReference = ref(
      storage,
      selectedProperty.assignManager.imageManager
    );
    getDownloadURL(pathReference).then((url) => {
      console.log("final url:", url);
      setImgUrl(url);
    });
  };
  // getImageUrl()
  console.log("final image url", imgUrl);

  //getting image url for property Image
  const [propertyImg, setPropertyImg] = useState("");
  const getPropertyImgUrl = () => {
    const pathReference = ref(storage, selectedProperty.imageProperty);
    getDownloadURL(pathReference)
      .then((url) => {
        setPropertyImg(url);
      })
      .catch((error) => {
        console.log("error while creating url for imag :", error);
      });
  };

  useEffect(() => {
    console.log("Fav Property Change deducted in address card");
    // setFavProperty(selectedProperty)
    setIsFavorite(favPropertyData.some((property) => property.id === id));
  }, [favPropertyData]);

  // console.log(favPropertyData)
  //checking whether rendering property is already added to favProperties
  const [isFavorite, setIsFavorite] = useState(() => {
    return favPropertyData.some((property) => property.id === id);
  });

  //  console.log("isFavorite:",isFavorite)

  const handleMoreDetail = () => {
    console.log("Presses More Detail ");
    //here we need to set navigation for fav page or detail page stack
    navigation.navigate("Address Detail", { id });
  };

  const handleAddToFav = () => {
    // console.log("Add to fav button presses");
    const selectedFavoriteProperty = { id: id };

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
  const handleSocialMediaShare = () => {
    // SocialMediaShare(address,propertyImg,Share)
    SocialMediaShare(address, propertyImg);
  };

  // getPropertyImgUrl();
  // getImageUrl();

  useEffect(() => {
    getPropertyImgUrl();
    getImageUrl();
  }, []);
  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.managerInfoContainer}>
          {imgUrl ? (
            <Image
              // source={require("../../assets/managerSampleImg.jpg")}
              source={{ uri: imgUrl }}
              alt="Image Not Found"
              style={styles.propManagerImg}
            />
          ) : (
            <Text>Loading .....</Text>
          )}

          <Text style={styles.headerText}> {assignManager.name}</Text>
        </View>
        <View style={styles.headerIconBtnContainer}>
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
      <TouchableOpacity onPress={handleMoreDetail}>
        {propertyImg ? (
          <Image
            // source={require("../../assets/SamplePropertyImage.jpg")}
            source={{ uri: propertyImg }}
            style={styles.imgStyle}
          />
        ) : (
          <Text style={styles.imgStyle}> Image Loading ......</Text>
        )}

        <View style={styles.cardMiddleContainer}>
          <Text style={styles.lastUpdatedOn}>
            Last updated on :{lastUpdatedOn}
          </Text>
          <Text style={styles.addressProperty}>
            {Object.values(address).join(", ")}
          </Text>
          <View style={styles.areaContainer}>
            <Image
              source={require("../../assets/Icon/house-size.png")}
              style={styles.iconImg}
            />
            <Text style={styles.areaProperty}>{area}</Text>
          </View>

          <View style={styles.amenitiesContainer}>
            {
              <FlatList
                horizontal
                data={amenities}
                renderItem={({ item }) => {
                  return <BtnAmenities item={item} />;
                }}
                keyExtractor={(item, index) => index.toString()}
              />
            }
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AddressCard;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: "column",
    // alignContent: "center",
    backgroundColor: "#FFFFF0",
    // backgroundColor: "#FFFAFA",
    // backgroundColor: "#FAEBD7",
    // backgroundColor: "#FAF0E6",
    // backgroundColor: "#FFFAF0",

    // marginTop: 10,
    // marginBottom:10,
    paddingVertical: 10,
  },
  cardMiddleContainer: {
    flexDirection: "column",
    paddingLeft: 10,
  },
  headerContainer: {
    flexDirection: "row",
    zIndex: 500,
    justifyContent: "space-between",
    height: 40,
    // backgroundColor:'#1E90FF'
    // backgroundColor:'#4682B4'
    backgroundColor: "#6495ED",
    // backgroundColor:'#4169E1'
    // backgroundColor:'#0000CD'
  },
  headerIconBtnContainer: {
    flexDirection: "row",
  },
  managerInfoContainer: {
    flexDirection: "row",
  },
  propManagerImg: {
    justifyContent: "center",
    alignSelf: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    marginLeft: 5,
    zIndex: 300,
  },
  headerText: {
    fontFamily: "sans-serif",
    fontSize: 16,
    fontWeight: 800,
    justifyContent: "center",
    alignSelf: "center",
    paddingLeft: 10,
    flexWrap: "wrap",
    maxWidth: 800,
    color: "black",
    // backgroundColor:'red'
  },

  imgStyle: {
    width: "100%",
    height: 220,
    // borderRadius: 8,
    zIndex: 100,
  },
  // imgStyleLoading:{
  //   width: "100%",
  //   height: 220,
  //   justifyContent:'center',
  //   alignSelf:'center'
  // },
  addressProperty: {
    fontSize: 14,
    color: "blue",
    fontWeight: 700,
  },
  lastUpdatedOn: {
    fontWeight: 700,
    color: "green",
    paddingVertical: 4,
  },
  cardFooter: {
    justifyContent: "flex-end",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
  },

  amenitiesContainer: {
    flexDirection: "row",
    // flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 5,
    overflow: "hidden",
  },
  addToFav: {
    justifyContent: "center",
    // backgroundColor:'red',
    alignSelf: "center",
    marginRight: 15,
  },
  iconImg: {
    width: 25,
    height: 25,
    // margin:3,
    marginRight: 5,
  },
  areaContainer: {
    flexDirection: "row",
    // marginTop:5,
    paddingVertical: 5,
  },
  areaProperty: {
    fontSize: 15,
    fontWeight: 700,
  },
});

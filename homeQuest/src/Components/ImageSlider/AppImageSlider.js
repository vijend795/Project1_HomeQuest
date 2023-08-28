// https://www.npmjs.com/package/react-native-image-slider-box
// https://www.youtube.com/watch?v=5jCV9AKo5H0&ab_channel=SGCodes

import { StyleSheet, Text, View,Dimensions,FlatList } from "react-native";
import React, { useState } from "react";
// import { SliderBox } from "react-native-image-slider-box";
// import { FlatList } from "react-native-gesture-handler";
import AppImage from "./AppImage";
// import { ViewPropTypes } from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width;
const ITEM_HEIGHT = 300;



const AppImageSlider = ({imagesArray}) => {
    const [imgIndex,setImgIndex]=useState(0)
    const handleIndexChange=(index)=>{
        setImgIndex(index)
    }
  const renderItem=((itemData) =>{
    return(
        <AppImage source={itemData.item} width={ITEM_WIDTH*.95} height={ITEM_HEIGHT*.95}/>
    )
    })
  
  return (
    <View style={styles.container}>
      <FlatList 
        style={styles.imgContainer}
        
        data={imagesArray}
        // renderItem={(itemData)}
        renderItem={renderItem}
        keyExtractor={(item,index)=>`${index}`}
        //set horizontal scroll view 
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        snapToAlignment="center"
        decelerationRate="fast"
        onScrollToIndexFailed={() => {}}
        onMomentumScrollEnd={(event) => {
            const newIndex = Math.round(
              event.nativeEvent.contentOffset.x / ITEM_WIDTH
            );
            handleIndexChange(newIndex);
          }}
        
      />
       <View style={styles.pagination}>
        {imagesArray.map((_, i) => (
          <View
            key={i}
            style={[
              styles.paginationDot,
              i === imgIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default AppImageSlider;

const styles = StyleSheet.create({
  container: {
   
    // margin: 10,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderColor: "black",
    borderRadius: 15,
    // backgroundColor:"red",
    // marginTop:30,

  },
  imgContainer:{
    // alignContent:'center',
    // justifyContent:'center',
    // alignItems:'center',
    // height:'100%',
    // width:'100%',
    // width:200,
  },
  pagination: {
    position: 'absolute',
    bottom: 18,
    alignSelf: 'center',
    flexDirection: 'row',
    // width:'70%',
    // backgroundColor:'red',
    overflow:'hidden',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 6,
    // backgroundColor: '#ccc',
    backgroundColor:'black',
  },
  paginationDotActive: {
    backgroundColor: 'red',
  },

});

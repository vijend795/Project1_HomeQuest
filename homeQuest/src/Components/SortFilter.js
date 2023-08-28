import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

const SortFilter = ({filterCloseBtnStatus}) => {
    const handleCloseFilter=()=>{
        filterCloseBtnStatus(false)
      }
  const FilterButton = ({ buttonTitle1, buttonTitle2 }) => {
    return (
      <View style={styles.btnContainer}>
        <View style={styles.btnSubContainer}>
          <Text style={styles.btnText}>{buttonTitle1}</Text>
        </View>
        <View style={styles.btnSubContainer}>
          <Text style={styles.btnText}>{buttonTitle2}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.filterContainer}>
      <View
        style={styles.filterHeaderContainer}
      >
        <Text style={styles.filterHeaderTitle}>
          Sort by
        </Text>
        <TouchableOpacity onPress={handleCloseFilter}>
        <Text style={styles.filterHeaderCloseBtn} >
          Done
        </Text>
        </TouchableOpacity>
        
      </View>
      <View>
        <FilterButton buttonTitle1="Best Match" buttonTitle2="Featured" />
        <FilterButton buttonTitle1="Latest" buttonTitle2="Oldest" />
        <FilterButton buttonTitle1="Lowest Price" buttonTitle2="Highest Price" />
      </View>
    </View>
  );
};

export default SortFilter;

const styles = StyleSheet.create({
  filterContainer: {
    width: "100%",
    height: 260,
    backgroundColor: "beige",
    position: "absolute",
    bottom: 0,
    marginBottom: -110,
    alignSelf: "center",
    zIndex: 1200,
    // justifyContent:'center'
  },
  filterHeaderContainer:{
    
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 20,
        justifyContent: "space-between",
        borderBottomColor: "grey",
        borderBottomWidth: 2,
      
  },
  filterHeaderTitle:{
    fontSize: 20, fontWeight: "bold", color: "black" 
  },
  filterHeaderCloseBtn:{
     fontSize: 20, fontWeight: "bold", color: "blue" 
  },
  btnContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    
  },
  btnSubContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    // backgroundColor:'red',
    marginHorizontal:20,
    marginTop:10,
    borderWidth: 2,
    borderColor: "blue",
    
  },
  btnText: {
    
    paddingVertical:10,
    paddingHorizontal:20,
    fontSize: 18,
    fontWeight: 300,
    color: "blue",
    justifyContent: "center",
    alignSelf: "center",
    
  },
});

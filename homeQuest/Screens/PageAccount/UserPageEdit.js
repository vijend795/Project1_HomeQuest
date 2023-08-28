import React, { useContext, useState} from "react";
import {StyleSheet,Text,View,TextInput,Image,TouchableOpacity,ScrollView
} from "react-native";
import * as Location from "expo-location";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import {Picker} from '@react-native-picker/picker'
// import Picker from "react-native-picker";




export default UserPage = () => {


  const [userType, setUserType] = useState("guest");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [region, setRegion] = useState(null);
  const [contactNumber, setContactNumber] = useState("");
  const [userImage, setUserImage] = useState(null);

  // Get current location
  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("Current location:", location);
      // Use location to fetch region data from server or API
      setRegion("Region Name");
    } catch (error) {
      console.log(error);
    }
  };

  // Handle image selection
  const pickImage = async () => {
    console.log("Add function to pick an Image from directory")
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setUserImage(result.uri);
    }
  };

  const submitUserForm=()=>{
    console.log("New Suer form Submit in process ...")
    const newUser=[
      {firstName, lastName, email,password, address, region, contactNumber,userImage}
      ]
      console.log(newUser)
      addUser(newUser)
      // console.log("All Users :",users)
  }

  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.userTypeContainer}>
        <Text style={styles.userTypeTitle}>User Type</Text>
        <View style={styles.userTypePickerContainer}>
        <Picker
          selectedValue={userType}
          onValueChange={(value) => setUserType(value)}
        >
          <Picker.Item label="Admin" value="admin" />
          <Picker.Item label="Employee" value="employee" />
          <Picker.Item label="Guest" value="guest" />
        </Picker>
        </View>

      </View>
      
      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
      />

      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />

      <Text style={styles.label}>Region</Text>
      <TouchableOpacity style={styles.button} onPress={getCurrentLocation}>
        <Text style={styles.buttonText}>Get Current Location</Text>
      </TouchableOpacity>
      {region && <Text style={styles.region}>{region}</Text>}

      <Text style={styles.label}>Contact Number</Text>
      <TextInput
        style={styles.input}
        value={contactNumber}
        onChangeText={setContactNumber}
        keyboardType="numeric"
      />

      <Text style={styles.label}>User Image</Text>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick an Image</Text>
      </TouchableOpacity>
      {userImage && <Image source={{ uri: userImage }} style={styles.image} />}

      {/* Add a button to submit the form */}
      <TouchableOpacity style={styles.submitButton} onPress={submitUserForm}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight + 20,
    paddingHorizontal: 20,
  },
  userTypeContainer:{
    flexDirection:'row',
    width:'100%',
    // backgroundColor:'blue'
  },
  userTypeTitle:{
    flex:1,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
  userTypePickerContainer:{
    flex:1,
    fontSize: 16,
    fontWeight: "bold",
    // backgroundColor:'lightblue',
    borderColor:'black',
    // marginTop: 20,
    // backgroundColor:'yellow'
    
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    // backgroundColor:'red',
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  region: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 10,
    borderRadius: 75,
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});





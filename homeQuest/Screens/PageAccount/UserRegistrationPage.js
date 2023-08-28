import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    ImageBackground,
    SafeAreaView,
  } from "react-native";
  import React, { useContext, useState } from "react";
  import AppButton from "../../src/Components/AppButton";
  import { FontAwesome5 } from "@expo/vector-icons";
  import { Entypo } from "@expo/vector-icons";
  import {} from 'react-native'
  
  import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../src/Utils/Firebase";

import { AsyncStorageLoginInfoUpdate } from "../../src/Utils/functions";
  
  export default  UserRegistrationPage = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const pressRegisterHere = () => {
      console.log("new user Registration start...... ");
      createUserWithEmailAndPassword(auth, email, password)
        // createUserWithEmailAndPassword(auth, 'nidhi1@gmail.com', '12345678')
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // console.log('new user Created :',user)
          // ...
          navigation.navigate("Login");
        })
        .catch((error) => {
          console.log("error user registration:",error);
          
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    };
    return (
      <SafeAreaView style={styles.mainContainer}>
        <Text style={styles.formHeader}> New user Form</Text>
        <View style={styles.loginContainer}>
          <View style={styles.inputContainer}>
            {/* <FontAwesome5 name="user-alt" size={30} color="black" /> */}
            <Text style={styles.title}> Email ID :</Text>
            <TextInput
              style={styles.userNameInput}
              placeholder="User Email ID"
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            {/* <Entypo name="lock" size={30} color="black" /> */}
            <Text style={styles.title}> Password :</Text>
            <TextInput
              style={styles.userPasswordInput}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
  
          <AppButton
            title="Register Here"
            color="blue"
            onPress={pressRegisterHere}
            style={styles.loginBtn}
            titleStyle={styles.buttonText}
          />
          {/* <Text style={styles.userRegistrationText} onPress={pressNewUser}> New user register here !!!</Text> */}
        </View>
      </SafeAreaView>
    );
  };
  
  
  
  const styles = StyleSheet.create({
    mainContainer:{
      flex:1,
      backgroundColor:'white',
    },
    formHeader: {
      justifyContent: "center",
      margin: 10,
      alignSelf: "center",
      fontSize: 25,
      fontWeight: "bold",
    },
    title:{
        justifyContent:'center',
        alignSelf:'center' , 
        fontSize:20,
        fontWeight:'bold'
    },
    loginContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      // marginBottom:100,
      flexDirection: "column",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      paddingBottom: 100,
      width: "100%",
    },
    inputContainer: {
      flexDirection: "row",
    },
  
    loginBtn: {
      width: "60%",
      backgroundColor: "red",
    },
    buttonText: {
      color: "white",
    },
    userNameInput: {
      fontSize: 18,
      width: "60%",
    //   backgroundColor: "#FFA07A",
      backgroundColor: "lightgrey",
      justifyContent: "center",
      alignItems: "center",
      padding: 5,
      marginBottom: 10,
      marginLeft: 8,
      borderRadius: 8,
    },
    userPasswordInput: {
      fontSize: 15,
      width: "60%",
      justifyContent: "center",
      alignItems: "center",
    //   backgroundColor: "#2E8B57",
      backgroundColor: "lightgrey",
      padding: 5,
      marginBottom: 10,
      marginLeft: 8,
      borderRadius: 8,
    },
    backImage: {
      flex: 1,
      // resizeMode: 'contain',
      // resizeMode: 'cover',
      // resizeMode: 'center',
      resizeMode: "stretch",
      width: "100%",
      height: "33%",
      backgroundColor: "white",
      justifyContent: "center",
      // marginTop:20,
    },
    userRegistrationText: {
      color: "lightblue",
      fontSize: 12,
      marginTop: 8,
      fontWeight: "bold",
    },
  });
  
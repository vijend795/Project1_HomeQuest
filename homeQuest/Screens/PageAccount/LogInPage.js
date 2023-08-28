import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import AppButton from "../../src/Components/AppButton";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, provider } from "../../src/Utils/Firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setLastLoginUser } from "../../ReduxToolKit/slices/LastLoginSlice";
import { AsyncStorageLoginInfoUpdate } from "../../src/Utils/functions";
import { KeyboardAvoidingView } from "react-native";

const LogInPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

 
  const handleLoginEmailPassword = () => {
    console.log("user Name:", userEmail);
    console.log("user Password:", userPassword);
    console.log("Login Button Pressed !!! redirected to Dashboard Screen");
    const lastUser = {
      userEmail: userEmail,
      userStatus: "Logged In",
    };
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User Uid:", user.uid);
        console.log("User email:", userEmail);

        AsyncStorageLoginInfoUpdate(userEmail,"Logged In",dispatch);
        // console.log("login with existing user :",user)
        navigation.navigate("User Page Info");
        // ...
      })
      .catch((error) => {
        console.log("login Error");
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error Code", errorCode);
        console.log("Error Message", errorMessage);
      });
  };

  const pressNewUser = () => {
    console.log("redirect to User Registration page");
    navigation.navigate("Registration Page");
  };
  const loginWithGoogleID = () => {
    console.log("Login With Google ID: this functionality is not available");
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView behavior='height' style={styles.form}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logoImg}
          source={require("../../assets/HomeQuest/logo_transparent.png")}
        />
      </View>
      <View style={styles.loginContainer}>
        <View style={styles.inputContainer}>
          <FontAwesome5 name="user-alt" size={30} color="black" />
          <TextInput
            style={styles.userNameInput}
            placeholder="User Name"
            onChangeText={(text) => {
              setUserEmail(text);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Entypo name="lock" size={30} color="black" />
          <TextInput
            style={styles.userPasswordInput}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setUserPassword(text);
            }}
          />
        </View>

        <AppButton
          title="Log In"
          color="blue"
          onPress={handleLoginEmailPassword}
          style={styles.loginBtn}
          titleStyle={styles.buttonText}
        />
        <Text style={styles.userRegistrationText} onPress={pressNewUser}>
          New user register here !!!
        </Text>

        {/* <View style={styles.otherLoginContainer}>
                    <AppButton
                        style={styles.btnGoogleLogin}
                        title="Log in with Google id"
                        color="green"
                        onPress={loginWithGoogleID}
                    />
                </View> */}
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LogInPage;

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor:'white',
  },
  form:{
    flex:1,
    justifyContent:'center'
  },
  logoContainer: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    // alignItems:'center',
    alignSelf: "center",
    // backgroundColor:'red',
    marginTop: "30%",
    marginBottom: 30,
  },
  logoImg: {
    width: "90%",
    height: 200,
    // justifyContent:'center',
    alignSelf: "center",
  },
  otherLoginContainer: {
    // marginTop:5,
    // flex:1,
    // backgroundColor:'red',
    // color:'green'
  },
  btnGoogleLogin: {
    flex: 1,
    width: "100%",
    // marginTop:30,
    // color:'black',
    // backgroundColor:'red'
  },
  loginContainer: {
    // flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    // marginBottom:100,
    flexDirection: "column",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    // backgroundColor:'red',
    paddingBottom: 100,
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(211, 211, 211, 0.5);",
    paddingHorizontal:10,
    paddingTop:10,
    margin:5,
    borderRadius:8,
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
    // backgroundColor: "#FFA07A",
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
    // backgroundColor: "#2E8B57",
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
    marginVertical: 5,
  },
});

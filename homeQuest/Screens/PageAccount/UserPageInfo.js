import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../src/Utils/Firebase";

import TitleAndText from "../../src/Components/TitleAndText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setLastLoginUser } from "../../ReduxToolKit/slices/LastLoginSlice";
import { AsyncStorageLoginInfoUpdate } from "../../src/Utils/functions";
import AppButton from "../../src/Components/AppButton";

import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";

const UserPageInfo = ({ navigation }) => {
  const dispatch = useDispatch();

  const [activeUser, setActiveUser] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [lastLogin, setLastLogin] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setActiveUser(user);
        const metaData = user.metadata;
        setCreatedDate(metaData.creationTime);
        setLastLogin(metaData.lastSignInTime);
        // console.log(user)
      } else {
        // User is signed out
        console.log("user Logged out");
      }
    });
  }, []);

  const handleGetInfo = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("get user:", user);
      }
    });
  };

  const handleLogOut = () => {
    console.log("user Logging out ........");
    const lastUser = {
      userEmail: activeUser.email,
      userStatus: "Logged Out",
    };
    console.log("User credentials while logging out :", lastUser);
    signOut(auth)
      .then(() => {
        console.log("user Logged out successfully"),
          AsyncStorageLoginInfoUpdate(activeUser.email, "Logged Out", dispatch),
          Alert.alert(activeUser.email + "\nLogged Out Successfully:"),
          navigation.navigate("Last Login");
      })
      .catch((error) => {
        console.error("Error while Logging out :", error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Image
            source={require("../../assets/activeUserImageSample.png")}
            style={styles.imgUser}
          />
          <Text style={styles.userName}>Vijendra Singh</Text>
        </View>
        <Text style={styles.userID}>{activeUser.uid}</Text>

        <View style={styles.activeUserContainer}>
          <FontAwesome5 name="user-alt" size={23} color="blue" />
          <Text style={styles.activeUserEmail}> {activeUser.email}</Text>
        </View>

        <View style={styles.emailVerificationContainer}>
          {activeUser.emailVerified ? (
            <Text style={styles.emailVerificationStatus}>
              Email verified!!!
            </Text>
          ) : (
            <Text style={styles.emailVerificationStatus}>
              click here to verify Email
            </Text>
          )}
        </View>
        <View style={styles.btnContainer}>
          {/* <AppButton title="get Info" onPress={handleGetInfo} color='rgb(0, 0, 250)'/> */}
          <AppButton
            title="Log Out"
            onPress={handleLogOut}
            color="rgb(128, 0, 0)"
          />
        </View>
        <Text style={styles.bottomInfo}>
          {" "}
          account created on : {createdDate}
        </Text>
        <Text style={styles.bottomInfo}> last login at: {lastLogin}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserPageInfo;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
  },
  imgUser: {
    width: 200,
    height: 200,
    alignSelf: "center",
    borderRadius: 100,
    marginBottom: 10,
  },
  btnContainer: {
    // backgroundColor:'red',
    justifyContent: "center",
    alignItems: "center",
  },
  bottomInfo: {
    fontSize: 8,
    fontWeight: "bold",
    color: "grey",
    justifyContent: "center",
    alignSelf: "center",
  },
  emailVerificationContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  emailVerificationStatus: {
    fontSize: 10,
    color: "blue",
    fontWeight: "bold",
  },
  userName: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "blue",
  },
  userID: {
    justifyContent: "center",
    fontSize: 5,
    fontWeight: 700,
    color: "grey",
    alignSelf: "center",
    marginBottom: 10,
    marginTop: 5,
  },
  activeUserContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  activeUserEmail: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setLastLoginUser } from "../../ReduxToolKit/slices/LastLoginSlice";
import {getStorage,ref,getDownloadURL} from 'firebase/storage'
import { useState } from "react";
import { addProperty } from "../../ReduxToolKit/slices/AllPropertySlice";

import {getFirestore,collection,addDoc,getDocs} from 'firebase/firestore/lite'
import { app } from "./Firebase";
import {Share} from 'react-native'


//set data from Async Storage
export const AsyncStorageLoginInfoUpdate = async ( userEmail, loginStatus ,dispatch) => {

    
    const lastUser = {
        userEmail: userEmail,
        userStatus: loginStatus,
      };

  try {
    await AsyncStorage.setItem("lastUserEmail", userEmail);
    await AsyncStorage.setItem("lastUserStatus", loginStatus);

    console.log("user saved now updating Last login Slice");
    console.log("user:", userEmail, " saved");
    dispatch(setLastLoginUser(lastUser))
  } catch (error) {
    console.log("error while Async Storage Logged User ", error);
  }
};


//get data from Async Storage
export const AsyncStorageGetLoginInfo = () => async (dispatch) => {
    
    console.log("Update Last Login User when application Start")
    try {
      const lastEmail = await AsyncStorage.getItem("lastUserEmail");
      const lastStatus = await AsyncStorage.getItem("lastUserStatus");
      console.log("data sync from Async Storage :", lastEmail, ":", lastStatus);
      const lastUser = {
        userEmail: lastEmail,
        userStatus: lastStatus,
      };
      console.log("set all user status value in start of application")
      dispatch(setLastLoginUser(lastUser));
      console.log("last Login --- :", lastUser);
    } catch (error) {
      console.log("Error while getting status:", error);
    }
  };


  export const GetDataFromFirestore =async(dispatch) => {
    
  
    // const dispatch=useDispatch()
    console.log("getting data from firestore");
    try{ 
    const db =getFirestore(app)
    const dataCol = collection(db, 'PropertyNZ');
    const dataSnapshot = await getDocs(dataCol);
    const dataList = dataSnapshot.docs.map((doc) => doc.data());
    console.log("data get from firstore :",dataList)
    dataList.forEach((data) => {
      dispatch(addProperty(data));
    });
    // return dataList
    // setDataList(dataSnapshot.docs.map((doc) => doc.data()))

    }catch(error){
      console.log("error while getting data from firestore :",error)
    }

  };


  
export const SocialMediaShare=(addressObj,propertyImg)=>{
  console.log("Share property with Social Media")
  // console.log(image,address)

  const options = {
    title: 'Property Share',
    message:Object.values(addressObj).join(", "),
    uri: propertyImg,
    // social: Share.Social.WHATSAPP, // Specify the platform here
  };

  Share.share(options)
  .then((res) => {console.log(res);})
  .catch((error) => {console.log('Error while sharing media:', error)});
 
}


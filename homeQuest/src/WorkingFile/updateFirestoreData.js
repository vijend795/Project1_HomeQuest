import { app } from "../Utils/Firebase";

import { getFirestore, collection, addDoc ,getDocs} from "firebase/firestore/lite";

import { Button, StyleSheet, Text, View ,Image} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Properties1 } from "../DataApi/AddressesData";
import { useState } from "react";
import {ref,getDownloadURL,getStorage} from 'firebase/storage'
import { GetDataFromFirestore } from "../Utils/functions";


const UpdateFireStoreData = () => {
    const db =getFirestore(app)
    const storage=getStorage()
  console.log(Properties1[0])
  
 
  const handleAddData = async () => {
 
    try {
      console.log("Addition data to fireStore");
     //add single data
    // await addDoc(collection(db,'PropertyNZ'), Properties1[0]);

        //Add all data
      for (const property of Properties1) {
        await addDoc(collection(db,'PropertyNZ'), property);
      }
  
      console.log("Data added to Firestore");
      
    } catch (error) {
      console.log(error);
    }
  };
  const [image,setImage]=useState('')
  const handleGetData1=async()=>{
    GetDataFromFirestore()
  }
  const handleGetData = async() => {
    console.log("getting data from firestore");
    const dataCol = collection(db, 'PropertyNZ');
    const dataSnapshot = await getDocs(dataCol);
    const dataList = dataSnapshot.docs.map((doc) => doc.data());
    console.log("property Data:",dataList)
    
    const pathReference=ref(storage,dataList[2].assignManager.imageManager)
    getDownloadURL(pathReference)
    .then((url)=>{
      console.log('url:',url)
      setImage(url)
    })
    .catch((error)=>{
      console.log("error while creating url for imag :",error)
    })

  };
  return (
    <SafeAreaView>
      <Button title="Add Data to Firestore" onPress={handleAddData} />
      <Text>  

      </Text>
      <Button title="get Data to Firestore" onPress={handleGetData} />
      {
        image!=='' && (
          <View>
            <Text> Image ie here </Text>
            <Image source={{uri:image}} style={{ width: 300, height: 300 }}/>
          </View>
          
        )
      }
     
    </SafeAreaView>
  );
};

export default UpdateFireStoreData;

const styles = StyleSheet.create({});

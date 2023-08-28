import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import DisplayAllAddressPage from './Screens/PagesAddress/DisplayAllAddressPage';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigationAddress from './Screens/PageNavigation/StackNavigationAddress';
import TabNavigationAddress from './Screens/PageNavigation/TabNavigationAddress';
import { Provider } from 'react-redux';

import UserReduxPage from './Screens/UserPageForRedux/UserReduxPage';
import Store from './ReduxToolKit/Store';
import { useDispatch } from 'react-redux';


import { useEffect } from 'react';

import { AsyncStorageGetLoginInfo } from './src/Utils/functions';
import UpdateFireStoreData from './src/WorkingFile/updateFirestoreData';


export default function App() {

  return (
     <Provider store={Store}>
     

      <TabNavigationAddress /> 

      {/* <UpdateFireStoreData/> */}
      {/* <NavigationContainer> */}

         {/* <StackNavigationAddress/> */}
      
      {/* <UserReduxPage /> */}

      {/* </NavigationContainer> */}

      
    
     </Provider>
      
      
      
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

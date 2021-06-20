import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContainer from './Navigation/AppContainer';
import LoggedIn from './Navigation/LoggedIn';

import UserContext from "./Context/UserContext";

const App = () => {
  const [userData, setUserData] = useState({

    user: undefined,

  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <SafeAreaView style={{ flex: 1 }}>
        {userData.user !== undefined ? (<><LoggedIn /></>) : (<><AppContainer /></>)}

      </SafeAreaView>
    </UserContext.Provider>
  );
};

export default App;
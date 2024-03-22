import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();

export default function TabRoutes() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(_user => {
      setUser(_user);
    });

    return unsubscribe;
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={user ? 'Home' : 'Sign In'}
      screenOptions={{headerShown: false}}>
      {user ? (
        <Stack.Screen name="Home" component={Home} />
      ) : (
        <>
          <Stack.Screen name="Sign In" component={SignIn} />
          <Stack.Screen name="Sign Up" component={SignUp} />
        </>
      )}
    </Stack.Navigator>
  );
}

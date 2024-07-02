// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import AllocateScreen from './src/screens/AllocateScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import RoleForLoginScreen from './src/screens/RoleForLoginScreen';
import AdminScreen from './src/screens/AdminScreen';
import { RootStackParamList } from './src/types';
import OTPChangeScreen from './src/screens/OTPChangeScreen';

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RoleForLogin">
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Details" component={DetailsScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Allocate" component={AllocateScreen} options={{headerShown: false}} />
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown: false}} />
        <Stack.Screen name="RoleForLogin" component={RoleForLoginScreen} options={{headerShown: false}} />
        <Stack.Screen name="Admin" component={AdminScreen} options={{headerShown: false}} />
        <Stack.Screen name="OTPChange" component={OTPChangeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

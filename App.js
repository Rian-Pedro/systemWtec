import 'react-native-gesture-handler';

import { StyleSheet, Text, View, StatusBar  } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/routes/Home';
import Login from './src/routes/Login';
import Register from './src/routes/Register';
import Menu from './src/routes/Menu';

const Stack = new createStackNavigator();

function MyStacks() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
      <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
      <Stack.Screen name="Menu" component={Menu} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}


export default function App() {
  return (
    <>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor='#FF820E' />
        <MyStacks />
      </NavigationContainer>
    </>
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

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import MenuScreen from '../screens/MenuScreen';
import CartScreen from '../screens/CartScreen';
import PaymentScreen from '../screens/PaymentScreen';
import OrderStatusScreen from '../screens/OrderStatusScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen';
import CardPaymentScreen from '../screens/CardPaymentScreen';
import PixPaymentScreen from '../screens/PixPaymentScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
  <Stack.Navigator initialRouteName="Splash">
    <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Menu" component={MenuScreen} />
    <Stack.Screen name="Cart" component={CartScreen} />
    <Stack.Screen name="Payment" component={PaymentScreen} />
    <Stack.Screen name="OrderStatus" component={OrderStatusScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="CardPayment" component={CardPaymentScreen} />
    <Stack.Screen name="PixPayment" component={PixPaymentScreen} />

      {/* Adicione mais telas depois */}
    </Stack.Navigator>
  );
}


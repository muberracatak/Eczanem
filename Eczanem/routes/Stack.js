import * as React from 'react';
import QrScreen from '../src/screens/QrScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from '../components/bottomTab'
import Ayarlar from '../src/screens/Ayarlar'
import Anasayfa from '../src/screens/Anasayfa'
import Hesap from '../src/screens/Hesap'
import SplashScreenPharm from '../src/screens/pharmacist/SplashScreenPharm';
import LoginScreenPharm from '../src/screens/pharmacist/LoginScreenPharm';
import RegisterScreenPharm from '../src/screens/pharmacist/RegisterScreenPharm';
import SplashScreen from '../src/screens/user/SplashScreen';
import LoginScreen from '../src/screens/user/LoginScreen';
import RegisterScreen from '../src/screens/user/RegisterScreen';
import Chat from '../src/screens/chatApp/Chat';

const Stack = createNativeStackNavigator();
const StackNavigator = ({ navigation }) => {

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: { backgroundColor: '#263D73' },
                        headerTintColor: 'white',
                        contentStyle: { backgroundColor: 'white' },

                    }}>
                    <Stack.Screen
                        name="SplashScreen"
                        component={SplashScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Chat"
                        component={Chat}
                        options={{ headerShown: false }}
                    />

                    <Stack.Screen
                        name="LoginScreen"
                        component={LoginScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="RegisterScreen"
                        component={RegisterScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="SplashScreenPharm"
                        component={SplashScreenPharm}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="LoginScreenPharm"
                        component={LoginScreenPharm}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="RegisterScreenPharm"
                        component={RegisterScreenPharm}
                        options={{ headerShown: false }}
                    />


                    <Stack.Screen name="BottomTab"
                        component={BottomTab}
                        options={{
                            headerShown: false
                        }}
                    />

                    <Stack.Screen name="Anasayfa"
                        component={Anasayfa}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen name="QrScreen"
                        component={QrScreen}
                        options={{
                            headerShown: false
                        }}
                    />

                    <Stack.Screen name="Hesap"
                        component={Hesap}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen name="Ayarlar"
                        component={Ayarlar}
                        options={{
                            headerShown: false
                        }}
                    />
                </Stack.Navigator>

            </NavigationContainer >

        </>
    );
}

export default StackNavigator;
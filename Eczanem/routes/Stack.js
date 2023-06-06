import * as React from 'react';
import QrScreen from '../src/screens/QrScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from '../components/bottomTab'
import BottomTabEczaci from '../components/bottomTabEczaci'

import VoiceRecorder from '../src/screens/VoiceRecorder'
import Anasayfa from '../src/screens/Anasayfa'
import Hesap from '../src/screens/Hesap'
import SplashScreenPharm from '../src/screens/pharmacist/SplashScreenPharm';
import LoginScreenPharm from '../src/screens/pharmacist/LoginScreenPharm';
import RegisterScreenPharm from '../src/screens/pharmacist/RegisterScreenPharm';
import SplashScreen from '../src/screens/user/SplashScreen';
import LoginScreen from '../src/screens/user/LoginScreen';
import RegisterScreen from '../src/screens/user/RegisterScreen';
import Chat from '../src/screens/chatApp/Chat';
import PharmacyProfile from '../src/screens/user/PharmacyProfile'
import UserDetails from '../src/screens/user/UserDetails'
import EczacilarListesi from '../src/screens/EczacilarListesi'
import SiparisListesi from '../src/screens/pharmacist/SiparisListesi';
import EczaciHesap from '../src/screens/pharmacist/EczaciHesap';
import Kullanicilar from '../src/screens/chatApp/Kullanicilar';
import Eczacilar from '../src/screens/chatApp/Eczacilar';
import ChatEczacilar from '../src/screens/chatApp/ChatEczacilar';
import ChatDeneme from '../src/screens/chatApp/ChatDeneme';
import MapScreen from '../src/screens/MapScreen'
import Ionicons from 'react-native-vector-icons/Ionicons'

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
                        options={{ headerShown: true }}
                    />
                    <Stack.Screen
                        name="Görüşme"
                        component={ChatDeneme}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Kullanicilar"
                        component={Kullanicilar}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="ChatEczacilar"
                        component={ChatEczacilar}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Eczacilar"
                        component={Eczacilar}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="EczaciHesap"
                        component={EczaciHesap}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="LoginScreen"
                        component={LoginScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="SiparisListesi"
                        component={SiparisListesi}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="MapScreen"
                        component={MapScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="EczacilarListesi"
                        component={EczacilarListesi}
                        options={({ route, navigation }) => ({
                            title: "Eczacılar",
                            headerBackTitleVisible: false,
                            headerRight: () => (
                                <Ionicons
                                    name='map-sharp'
                                    size={27}
                                    color={'white'}
                                    onPress={() => navigation.navigate('MapScreen')}
                                />)
                        })}
                    />
                    <Stack.Screen
                        name="RegisterScreen"
                        component={RegisterScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="PharmacyProfile"
                        component={PharmacyProfile}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="UserDetails"
                        component={UserDetails}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="SplashScreenPharm"
                        component={SplashScreenPharm}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="BottomTabEczaci"
                        component={BottomTabEczaci}
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
                    <Stack.Screen name="VoiceRecorder"
                        component={VoiceRecorder}
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
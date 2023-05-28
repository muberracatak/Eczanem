import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import QrScreen from '../src/screens/QrScreen'
import { TouchableOpacity, Image } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import React, { useState, createContext, useContext, useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { NavigationContainer } from '@react-navigation/native';
import VoiceRecorder from '../src/screens/VoiceRecorder'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Anasayfa from '../src/screens/Anasayfa'
import Hesap from '../src/screens/Hesap'
import Chat from '../src/screens/chatApp/Chat'
import Home from '../src/screens/chatApp/Home'
import SiparisListesi from '../src/screens/pharmacist/SiparisListesi';
import EczaciHesap from '../src/screens/pharmacist/EczaciHesap';

import { onAuthStateChanged } from 'firebase/auth';
const AuthenticatedUserContext = createContext({});
import deneme from '../src/screens/deneme'


import Entypo from 'react-native-vector-icons/Entypo'
import Kullanicilar from '../src/screens/chatApp/Kullanicilar';
import Eczacilar from '../src/screens/chatApp/Eczacilar';
import ChatEczacilar from '../src/screens/chatApp/ChatEczacilar';
const Tab = createBottomTabNavigator();

function BottomTabEczaci({ route }) {

    const CustomTabBarButton = ({ children, navigation }) => {
        return (
            <TouchableOpacity
                style={{
                    width: 60,
                    height: 60,
                    backgroundColor: '#2634C0',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 33,
                    marginTop: -30,
                    borderWidth: 2,
                    borderColor: 'white',

                }}

            >
                <Image
                    style={{ width: 70, height: 70, borderRadius: 40 }}
                    source={require('../assets/eczane4.png')} />
            </TouchableOpacity>
        )

    }



    return (
        <Tab.Navigator>





            <Tab.Screen name="Siparisler" component={SiparisListesi}
                options={{
                    headerShown: false,
                    tabBarIcon: () => <MaterialCommunityIcons name="account" size={24} color="black" />
                }}
            />
            <Tab.Screen name="Hesap" component={EczaciHesap}
                options={{
                    headerShown: false,
                    tabBarIcon: () => <MaterialCommunityIcons name="account" size={24} color="black" />
                }}
                initialParams={{ emailAdres: route.params.emailAd }}
            />
            <Tab.Screen name="Sohbet" component={Eczacilar}
                options={{
                    headerShown: false,
                    tabBarIcon: () => <Ionicons name="chatbubbles-sharp" size={24} color="black" />
                }}
            />

        </Tab.Navigator>
    );
}

export default BottomTabEczaci;
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Image } from 'react-native';
import React, { useState, createContext, useContext, useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import VoiceRecorder from '../src/screens/VoiceRecorder'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Anasayfa from '../src/screens/Anasayfa'
import Hesap from '../src/screens/Hesap'
import Chat from '../src/screens/chatApp/Chat'
import Home from '../src/screens/chatApp/Home'
import EczacilarListesi from '../src/screens/EczacilarListesi'
import SiparisListesi from '../src/screens/pharmacist/SiparisListesi';
import Kullanicilar from '../src/screens/chatApp/Kullanicilar'
import QrScreen from '../src/screens/QrScreen'
import MapScreen from '../src/screens/MapScreen'

import { onAuthStateChanged } from 'firebase/auth';
const AuthenticatedUserContext = createContext({});
import deneme from '../src/screens/deneme'

const Tab = createBottomTabNavigator();

function BottomTab({ route }) {
    const CustomTabBarButton = ({ children, navigation }) => {
        return (
            <TouchableOpacity
                style={{
                    width: 60,
                    height: 60,
                    // backgroundColor: '#2634C0',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 33,
                    marginTop: -30,
                    borderWidth: 2,
                    borderColor: 'white',
                    opacity: 0.8, // Adjust the opacity as desired
                    padding: 5, // Adjust the padding as desired
                }}
            >
                <Image
                    style={{ width: 70, height: 70, borderRadius: 40 }}
                    source={require('../assets/eczane4.png')}
                />
            </TouchableOpacity>
        );
    };

    return (
        <Tab.Navigator
            tabBarOptions={{
                style: {
                    backgroundColor: '#ffffff', // Background color of the tab bar
                    borderTopWidth: 0, // Remove top border
                    elevation: 0, // Remove elevation for Android
                },
                showLabel: false, // Hide labels
                activeTintColor: '#2634C0', // Color of the active tab
                inactiveTintColor: 'gray', // Color of inactive tabs
            }}
        >
            <Tab.Screen
                name="Anasayfa"
                component={Anasayfa}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Entypo name="home" size={24} color={color} />
                    ),

                }}
            />

            <Tab.Screen
                name="QR"
                component={QrScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="qrcode" size={24} color={color} />
                    ),
                }}
            />


            <Tab.Screen
                name="list"
                component={VoiceRecorder}
                options={{
                    headerShown: false,
                    tabBarButton: (props) => <CustomTabBarButton {...props} />,
                }}
            />
            <Tab.Screen
                name="Kullanicilar"
                component={Kullanicilar}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="chatbubbles-sharp" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Hesap"
                component={Hesap}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" size={24} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default BottomTab;

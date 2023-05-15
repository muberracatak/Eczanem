import * as React from 'react';
import QrScreen from '../src/screens/QrScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from '../components/bottomTab'
import Dosya from '../src/screens/Dosya'
import Anasayfa from '../src/screens/Anasayfa'

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


                    <Stack.Screen name="Dosya"
                        component={Dosya}
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
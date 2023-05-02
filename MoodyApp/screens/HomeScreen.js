import { View, Text, ImageBackground, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
    const navigation = useNavigation();
    return (
        <View >

            <ImageBackground style={{ justifyContent: 'center', width: '100%', height: '100%', resizeMode: 'cover' }} source={require("../images/wallpaper.jpg")} >
                <Text style={{ marginLeft: 25, fontSize: 80, fontWeight: 'bold', color: 'white', width: '70%' }}>Go Near</Text>
                <Pressable style={{ borderWidth: 4, borderColor: '#306AB6', marginTop: 25, backgroundColor: '#9DBCE5', width: 200, height: 40, borderRadius: 20, marginLeft: 25, justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => navigation.navigate('SignIn')}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Giriş yap</Text>

                </Pressable>
                <Pressable style={{ borderWidth: 4, borderColor: '#306AB6', marginTop: 15, backgroundColor: '#9DBCE5', width: 200, height: 40, borderRadius: 20, marginLeft: 25, justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => navigation.navigate('SignUp')}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Kayıt ol</Text>

                </Pressable>
            </ImageBackground>
        </View>
    )
}

export default HomeScreen
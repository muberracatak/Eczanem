import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TextInput,
    Pressable, Button, Image
} from "react-native";
import styles from "./styles";
import Svg, { Ellipse, ClipPath } from "react-native-svg";
import { Auth } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';
const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { height, width } = Dimensions.get("window");
    const [error, setError] = useState('');
    const navigation = useNavigation();
    const handleSignIn = async () => {
        try {
            const user = await Auth.signIn(username, password);
            console.log('Sign in success: ', user);
            navigation.navigate('HomeScreen')
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <View >
            <Image source={require("../images/background.png")} style={{ position: 'absolute', width: 600, height: 900 }} />
            <View style={{ top: 500 }}>
                <Text style={{ left: 120, top: -400, fontSize: 35, margin: 10, fontWeight: '600', color: 'white' }}>Sign in</Text>

                <View style={{
                    marginBottom: 300,
                    ...StyleSheet.absoluteFill,
                    zIndex: -1,
                    justifyContent: 'center',
                }}>

                    <TextInput placeholder='Email' value={username} onChangeText={setUsername} style={{
                        height: 50,
                        borderWidth: 4,
                        borderColor: 'rgba(0, 0, 0, 0.2)',
                        marginHorizontal: 20,
                        marginVertical: 10,
                        borderRadius: 25,
                        paddingLeft: 10,
                        backgroundColor: 'white'
                    }} />
                    <TextInput
                        placeholder='Password'
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        style={{
                            height: 50,
                            borderWidth: 4,
                            borderColor: 'rgba(0, 0, 0, 0.2)',
                            marginHorizontal: 20,
                            marginVertical: 10,
                            borderRadius: 25,
                            paddingLeft: 10,
                            backgroundColor: 'white'
                        }} />
                </View>

                <View style={{ top: 10 }}>
                    <Pressable style={styles.button} onPress={handleSignIn}>
                        <Text style={styles.buttonText}>Sign in</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={() => navigation.navigate('SignupScreen')}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </Pressable>

                </View>


            </View>
            <View style={styles.container}>




            </View>
        </View>
    );
};

export default SignInScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Pressable } from 'react-native';
import { Auth } from 'aws-amplify';
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [confirmSignUp, setConfirmSignUp] = useState(false);
    const navigation = useNavigation();

    const handleSignUp = async () => {
        try {
            await Auth.signUp({ username, password });
            setConfirmSignUp(true);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleConfirmSignUp = async () => {
        try {
            await Auth.confirmSignUp(username, verificationCode);
            console.log('Sign up confirmed');
            // Navigate to sign in screen
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <View>
            <Image source={require("../images/background.png")} style={{ position: 'absolute', width: 600, height: 900 }} />

            {!confirmSignUp && (
                <View style={{ top: 500 }}>
                    <Text style={{ left: 120, top: -400, fontSize: 35, margin: 10, fontWeight: '600', color: 'white' }}>Sign up</Text>

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

                    <Pressable style={{
                        backgroundColor: '#5D4278',
                        height: 50,
                        width: 250,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 35,
                        marginHorizontal: 20,
                        marginVertical: 10,
                        borderWidth: 1,
                        borderColor: 'white',
                        left: 50, top: 10
                    }} onPress={handleSignUp}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: '600',
                            color: 'white',
                            letterSpacing: 0.5,

                        }}>Sign Up</Text>
                    </Pressable>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ top: 10, fontSize: 18, margin: 10, fontWeight: '600', color: 'white' }}>Already you have an account ?</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Pressable style={{
                            backgroundColor: '#5D4278',
                            height: 50,
                            width: 250,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 35,
                            marginHorizontal: 20,
                            marginVertical: 10,
                            borderWidth: 1,
                            borderColor: 'white',
                            top: 10
                        }} onPress={() => navigation.goBack()}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: '600',
                                color: 'white',
                                letterSpacing: 0.5,

                            }}>Sign in</Text>
                        </Pressable>

                    </View>
                </View>
            )}
            {confirmSignUp && (
                <View style={{ top: 200 }}>

                    <TextInput style={{
                        height: 50,
                        borderWidth: 4,
                        borderColor: 'rgba(0, 0, 0, 0.2)',
                        marginHorizontal: 20,
                        marginVertical: 10,
                        borderRadius: 25,
                        paddingLeft: 10,
                        backgroundColor: 'white'
                    }} value={verificationCode} onChangeText={setVerificationCode} />
                    <Pressable style={styles.button} onPress={handleConfirmSignUp}>
                        <Text style={styles.buttonText}>Confirm Sign Up</Text>
                    </Pressable>


                </View>
            )}


        </View>
    );
};

export default SignUpScreen;

import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TextInput,
    Pressable,
} from "react-native";
import styles from "./styles";
import Svg, { Image, Ellipse, ClipPath } from "react-native-svg";
import { Auth } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';

export default function App() {
    const { height, width } = Dimensions.get("window");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
    const [isRegistering, setIsRegistering] = useState(false);

    return (
        <View style={styles.container}>
            <View style={[StyleSheet.absoluteFill]}>
                <Svg height={height + 100} width={width}>
                    <ClipPath id="clipPathId">
                        <Ellipse cx={width / 2} rx={height} ry={height + 100} />
                    </ClipPath>
                    <Image
                        href={require("../images/login-background.jpg")}
                        width={width + 100}
                        height={height + 100}
                        preserveAspectRatio="xMidYMid slice"
                        clipPath="url(#clipPathId)"
                    />
                </Svg>

            </View>
            <View style={styles.bottomContainer}>
                <View style={[styles.formInputContainer]}>
                    <TextInput
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Email"
                        placeholderTextColor="black"
                        style={styles.textInput}
                    />
                    {isRegistering && (
                        <TextInput
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Full Name"
                            placeholderTextColor="black"
                            style={styles.textInput}
                        />
                    )}
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="black"
                        style={styles.textInput}
                    />
                    <View >
                        <Pressable style={styles.button} onPress={handleSignIn}>
                            <Text style={styles.buttonText}>LOG IN</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
}

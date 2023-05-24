import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('LoginScreen');
        }, 7000); // 3 saniye sonra LoginScreen'e yönlendirilecek
    }, [navigation]);

    const handlePharmPress = () => {
        navigation.navigate('SplashScreenPharm');
    };

    const handleButtonPress = () => {
        navigation.navigate('LoginScreen');
    };

    const handleButtonPressRegister = () => {
        navigation.navigate('RegisterScreen');
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../../assets/eczaci.png')}
                style={styles.logo}
            />
            <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
                <Text style={styles.buttonText}>Giriş Yap</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={handleButtonPressRegister}>
                <Text style={styles.buttonText}>Kayıt Ol</Text>
            </TouchableOpacity>
            <Text style={styles.footerText}>Eczacı mısınız?</Text>
            <TouchableOpacity style={styles.footerButton} onPress={handlePharmPress}>
                <Text style={[styles.buttonText, styles.footerButtonText]}>Eczacı Girişi</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#629DD9',
    },
    logo: {
        justifyContent: 'center',
        width: 250,
        height: 250,
        marginBottom: 30,
    },
    button: {
        width: '70%',
        height: 50,
        backgroundColor: '#eaeaea',
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#4190ce',
        fontWeight: 'bold',
        fontSize: 19,
        textAlign: 'center',
    },
    footerText: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16,
        marginTop: 15,
        fontWeight: 'bold',
        color: '#004C99',
    },
    footerButton: {
        marginTop: 10,
    },
    footerButtonText: {
        color: '#eaeaea',
    },
});

export default SplashScreen;
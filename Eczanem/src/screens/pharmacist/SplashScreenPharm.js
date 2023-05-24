import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';

const SplashScreenPharm = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('LoginScreenPharm');
        }, 7000); // 3 saniye sonra LoginScreen'e yönlendirilecek
    }, [navigation]);

    const handleUserPress = () => {
        navigation.navigate('SplashScreen');
    };

    const handleButtonPress = () => {
        navigation.navigate('LoginScreenPharm');
    };

    const handleButtonPressRegister = () => {
        navigation.navigate('RegisterScreenPharm');
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../../assets/eczanem.png')}
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
            <Text style={styles.footerText}>Eczacı değil misiniz?</Text>
            <TouchableOpacity style={styles.footerButton} onPress={handleUserPress}>
                <Text style={[styles.buttonText, styles.footerButtonText]}>Üye Girişi</Text>
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

export default SplashScreenPharm;
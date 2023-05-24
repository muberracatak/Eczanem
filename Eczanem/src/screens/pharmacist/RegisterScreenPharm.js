import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { auth } from '../../../components/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const RegisterScreenPharm = ({ navigation }) => {
    const [pharmacyName, setPharmacyName] = useState('');
    const [pharmacyCode, setPharmacyCode] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginPress = () => {
        navigation.navigate('LoginScreenPharm');
    };

    const handleRegister = () => {
        createUserWithEmailAndPassword(auth, email, password).then(userCredential => {
            const user = userCredential.user;
        }).catch(error => console.log(error.message));
        navigation.navigate('LoginScreenPharm');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Kayıt Ol</Text>
            <TextInput
                style={styles.input}
                placeholder="Eczane adını giriniz"
                value={pharmacyName}
                onChangeText={setPharmacyName}
            />
            <TextInput
                style={styles.input}
                placeholder="Eczane kodunu giriniz"
                value={pharmacyCode}
                onChangeText={setPharmacyCode}
            />
            <TextInput
                style={styles.input}
                placeholder="Adınızı giriniz"
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Soyadınızı giriniz"
                value={lastName}
                onChangeText={setLastName}
            />
            <TextInput
                style={styles.input}
                placeholder="E-posta adresinizi giriniz (example@example.com)"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Şifre giriniz"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Tekrar şifre giriniz"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Kayıt Ol</Text>
            </TouchableOpacity>
            <Text style={styles.footerText}>Zaten hesabınız var mı?</Text>
            <TouchableOpacity style={styles.footerButton} onPress={handleLoginPress}>
                <Text style={[styles.buttonText, styles.footerButtonText]}>Giriş Yap</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eaeaea',
    },
    input: {
        width: '80%',
        height: 50,
        marginVertical: 8,
        padding: 13,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
        marginBottom: 3,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        color: '#629DD9',
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 12,
    },
    button: {
        width: '60%',
        height: 50,
        backgroundColor: '#629DD9',
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#eaeaea',
        fontSize: 19,
        fontWeight: 'bold',
    },
    footerText: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16,
        marginTop: 15,
    },
    footerButton: {
        marginTop: 10,
    },
    footerButtonText: {
        color: '#629DD9',
    },
});

export default RegisterScreenPharm;
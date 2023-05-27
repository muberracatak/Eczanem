import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { auth } from '../../../components/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../../components/config';
import { ref, push, set } from 'firebase/database';
const RegisterScreen = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginPress = () => {
        navigation.navigate('LoginScreen');
    };

    const handleRegister = () => {
        const formattedBirthdate = birthdate.split('.').join('');

        createUserWithEmailAndPassword(auth, email, password).then(userCredential => {
            const user = userCredential.user;
            const userRef = ref(db, 'kullanıcılar'); // 'users' yerine kaydetmek istediğiniz veritabanı yolunu kullanın
            const newUserRef = push(userRef);
            const userData = {
                firstName,
                lastName,
                birthdate: formattedBirthdate,
                address,
                email,
                userId: user.uid,
                role: 'hasta'
            };
            set(newUserRef, userData)
                .then(() => {
                    console.log('Kullanıcı başarıyla veritabanına kaydedildi');
                })
                .catch((error) => {
                    console.error('Kullanıcı veritabanına kaydedilirken hata oluştu:', error);
                });
        }).catch(error => console.log(error.message));
        navigation.navigate('LoginScreen');
    };

    const formatBirthdate = (input) => {
        let formattedInput = input.replace(/\D/g, ''); // Remove non-numeric characters
        if (formattedInput.length > 2) {
            const day = formattedInput.slice(0, 2);
            const month = formattedInput.slice(2, 4);
            const year = formattedInput.slice(4);
            formattedInput = `${day}.${month}.${year}`;
        }
        return formattedInput;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Kayıt Ol</Text>
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
                placeholder="Doğum tarihinizi giriniz (gg.aa.yyyy)"
                value={formatBirthdate(birthdate)}
                onChangeText={text => setBirthdate(formatBirthdate(text))}
            />
            <TextInput
                style={styles.input}
                placeholder="Adresinizi giriniz"
                value={address}
                onChangeText={setAddress}
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

export default RegisterScreen;
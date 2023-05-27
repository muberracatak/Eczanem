import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { auth, db } from '../../../components/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, onValue, set, push } from 'firebase/database';
import { useRoute } from '@react-navigation/native';

const LoginScreenPharm = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [eczaneAd, setEczaneAd] = useState('');
    const [eczaneCode, setEczaneCode] = useState('');
    const [isim, setIsim] = useState('');
    const [soyisim, setSoyisim] = useState('');
    const [id, setId] = useState('');



    const handleRegisterPress = () => {
        navigation.navigate('RegisterScreenPharm');
    };

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('Oturum açan kullanıcı:', user.email, user.uid);
                setEmail(user.email);
                console.log('şifre : ', password)
                /*const usersRef = ref(db, 'eczacilar');
                const newUserRef = push(usersRef);
                const idliuser = {
                    eczaneAd: eczaneAd,
                    eczaneCode: eczaneCode,
                    isim: isim,
                    soyisim: soyisim,
                    email: email,
                    password: password,
                    userId: user.uid,
                    qr: ''
                };
                set(newUserRef, idliuser)
                    .then(() => {
                        console.log('Kullanıcı kaydedildi');
                    })
                    .catch((error) => {
                        console.log('Hata:', error);
                    });*/

                navigation.navigate('BottomTabEczaci', { emailAd: email });
            })
            .catch((error) => {
                console.log('Hata:', error.message);
            });

    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Eczacı Girişi</Text>
            <Image
                source={require('../../../assets/login.png')}
                style={styles.logo}
            />
            <TextInput
                style={styles.input}
                placeholder="E-posta adresinizi giriniz"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Şifrenizi giriniz"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Giriş Yap</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>Hesabınız yok mu?</Text>
            <TouchableOpacity style={styles.footerButton} onPress={handleRegisterPress}>
                <Text style={[styles.buttonText, styles.footerButtonText]}>Kayıt Ol</Text>
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
    logo: {
        justifyContent: 'center',
        width: 200,
        height: 200,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        color: '#629DD9',
        fontWeight: 'bold',
        fontSize: 30
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

export default LoginScreenPharm;
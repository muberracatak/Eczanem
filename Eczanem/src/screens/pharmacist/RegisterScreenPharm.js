import React, { useState, useRef } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { auth } from '../../../components/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../../../components/config';
import { ref, push, set } from 'firebase/database';
import MapView, { Marker } from 'react-native-maps';
import { MapScreen } from '../MapScreen';
const RegisterScreenPharm = ({ navigation }) => {
    const [id, setId] = useState('');
    const [pharmacyName, setPharmacyName] = useState('');
    const [pharmacyCode, setPharmacyCode] = useState('');
    const [pharmacyAdres, setPharmacyAdres] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [predictions, setPredictions] = useState([]);

    const [address, setAddress] = useState('');


    const mapRef = useRef(null);
    const [coordinates, setCoordinates] = useState(null);
    const [enlem, setEnlem] = useState(null);
    const [boylam, setBoylam] = useState(null);

    const handleLoginPress = () => {
        navigation.navigate('LoginScreenPharm');
    };
    const apiKey = 'AIzaSyAaMWs_VXz8T34g9QE83RRXB7cAz0K_6xU'; // API anahtarınızı buraya yerleştirin

    const handleRegister = () => {
        createUserWithEmailAndPassword(auth, email, password).then(userCredential => {
            const user = userCredential.user;
            console.log('kaydolan kullanıcı ', user.email)
            const usersRef = ref(db, 'eczacilar');
            const newUserRef = push(usersRef);
            const idliuser = {
                pharmacyName,
                pharmacyCode,
                firstName,
                lastName,
                email,
                password,
                pharmacyAdres,
                userId: user.uid,
                qr: '',
                gonderenKisi: '',
                enlem: enlem,
                boylam: boylam
            };
            set(newUserRef, idliuser)
                .then(() => {
                    console.log('Kullanıcı kaydedildi');
                    console.log(pharmacyName, pharmacyCode, firstName, lastName, email, password, pharmacyAdres)
                })
                .catch((error) => {
                    console.log('Hata:', error);
                });
        }).catch(error => console.log(error.message));
        navigation.navigate('LoginScreenPharm');

    };
    const handleSearch = () => {
        fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${address}&key=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.predictions) {
                    setPredictions(data.predictions);
                }
            })
            .catch((error) => {
                console.log('Hata:', error);
            });
    };
    const handleDoublePress = (event) => {
        const { coordinate } = event.nativeEvent;

        // Haritayı çift tıklanan noktaya zoom yap
        mapRef.current.animateToRegion({
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });
    };

    const handlePredictionPress = (prediction) => {
        const placeId = prediction.place_id;
        fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.result) {
                    const result = data.result;
                    const { lat, lng } = result.geometry.location;

                    // Enlem ve boylam koordinatlarını ayarla
                    setCoordinates({ latitude: lat, longitude: lng });
                    setEnlem(lat);
                    setBoylam(lng);
                    console.log(enlem, boylam)
                    // Haritayı seçilen adresin üzerine zoom yap
                    /*mapRef.current.animateToRegion({
                        latitude: lat,
                        longitude: lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    });*/
                }
            })
            .catch((error) => {
                console.log('Hata:', error);
            });
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
                style={{
                    width: '60%',
                    left: -40,
                    height: 50,
                    marginVertical: 8,
                    padding: 13,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                    backgroundColor: '#fff',
                    marginBottom: 3,
                }}
                placeholder="Eczane adresini giriniz"
                value={address}
                onChangeText={setAddress}
            />
            <TouchableOpacity style={{ padding: 10, backgroundColor: 'blue', top: -50, left: 120, borderRadius: 10 }} onPress={handleSearch}>
                <Text style={{ color: 'white' }}>Ara</Text>
            </TouchableOpacity>
            <View>
                {predictions.map((prediction) => (
                    <TouchableOpacity key={prediction.place_id} onPress={() => handlePredictionPress(prediction)}>
                        <Text>{prediction.description}</Text>
                    </TouchableOpacity>
                ))}
            </View>
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
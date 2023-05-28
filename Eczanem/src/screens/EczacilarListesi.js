import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import { db, auth } from '../../components/config';
import { ref, onValue, set, update } from 'firebase/database';
import CheckBox from '@react-native-community/checkbox';
import { onAuthStateChanged } from 'firebase/auth';
import MapView, { Marker } from 'react-native-maps';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import LottieView from 'lottie-react-native';

const EczaciListesi = ({ navigation, route }) => {
    const [eczacilar, setEczacilar] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const apiKey = 'AIzaSyAaMWs_VXz8T34g9QE83RRXB7cAz0K_6xU';
    const { url } = route.params;
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // Kullanıcı oturum açmış ise burası çalışır
                setCurrentUser({
                    _id: user.uid,
                    name: user.email,
                });
            } else {
                console.log('Kullanıcı oturum açmamış');
            }
        });
        const fetchEczacilar = async () => {
            const eczacilarRef = ref(db, 'eczacilar/');
            onValue(eczacilarRef, (snapshot) => {
                const eczacilarData = snapshot.val();
                const eczacilarArray = Object.values(eczacilarData);
                setEczacilar(eczacilarArray);

            });
        };
        fetchEczacilar();
    }, []);

    const qrGonder = () => {
        checkedItems.forEach((userId) => {
            const eczaci = eczacilar.find((item) => item.userId === userId);

            if (eczaci) {
                const qrRef = ref(db, 'eczacilar/' + userId);
                update(qrRef, {
                    email: eczaci.email,
                    firstName: eczaci.firstName,
                    lastName: eczaci.lastName,
                    password: eczaci.password,
                    pharmacyCode: eczaci.pharmacyCode,
                    pharmacyName: eczaci.pharmacyName,
                    pharmacyAdres: eczaci.pharmacyAdres,
                    qr: url,
                    gonderenKisi: currentUser._id,
                    userId: userId,
                    enlem: eczaci.enlem,
                    boylam: eczaci.boylam
                })
                    .then(() => {
                        console.log('Veri güncellendi.');
                    })
                    .catch((error) => {
                        console.log('Hata oluştu: ', error);
                    });
            }
        });
        alert('Reçeteniz başarıyla gönderildi');

        navigation.navigate('BottomTab');
    };
    const handleCheckboxToggle = (eczaci) => {
        const isChecked = checkedItems.includes(eczaci.userId);
        if (isChecked) {
            setCheckedItems(checkedItems.filter((id) => id !== eczaci.userId));
        } else {
            setCheckedItems([...checkedItems, eczaci.userId]);
        }
    };
    return (
        <View style={styles.container}>
            {eczacilar.map((eczaci) => (

                <View style={styles.eczaciContainer} key={eczaci.userId}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarText}>{eczaci.firstName.charAt(0)}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.adText}>{eczaci.pharmacyName}</Text>
                        <Text style={styles.soyadText}>{eczaci.lastName}</Text>
                    </View>
                    <CheckBox
                        style={{ position: 'absolute', right: 10 }}
                        value={checkedItems.includes(eczaci.userId)}
                        onValueChange={() => handleCheckboxToggle(eczaci)}
                        tintColors={{ true: '#0066CC', false: '#C0C0C0' }}
                    />
                </View>
            ))}
            <Button title="Gonder" onPress={qrGonder} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 10,
    },
    eczaciContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e1e5ea',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    avatarContainer: {
        backgroundColor: '#6c757d',
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: 20,
        color: '#ffffff',
    },
    infoContainer: {
        marginLeft: 10,
    },
    adText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    soyadText: {
        fontSize: 14,
        color: '#333333',
    },
});

export default EczaciListesi;

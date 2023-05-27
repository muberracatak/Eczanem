import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, ScrollView } from 'react-native';
import { db, auth } from '../../../components/config';
import { ref, onValue, set, update } from 'firebase/database';
import QRCode from 'react-native-qrcode-svg';
import { onAuthStateChanged } from 'firebase/auth';
import CheckBox from '@react-native-community/checkbox';

const SiparisListesi = ({ navigation, route }) => {
    const [eczacilar, setEczacilar] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [checkedItems, setCheckedItems] = useState([]);

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

    useEffect(() => {
        console.log('eczacilar:', eczacilar);
    }, [eczacilar]);

    // Oturum açmış kullanıcının QR değerine sahip olan eczacıları filtreleme
    const filteredEczacilar = eczacilar.filter((eczaci) => eczaci.userId === currentUser?._id);
    const handleCheckboxToggle = (eczaci) => {
        const isChecked = checkedItems.includes(eczaci.userId);
        if (isChecked) {
            setCheckedItems(checkedItems.filter((id) => id !== eczaci.userId));
        } else {
            setCheckedItems([...checkedItems, eczaci.userId]);
        }
    };
    return (
        <ScrollView>
            <View style={styles.container}>
                {filteredEczacilar.map((eczaci) => (
                    <View style={styles.eczaciContainer} key={eczaci.userId}>
                        {eczaci.qr ? (
                            <QRCode value={eczaci.qr} size={200} />
                        ) : (
                            <Text></Text>
                        )}
                        <CheckBox
                            style={{ position: 'absolute', right: 10 }}
                            value={checkedItems.includes(eczaci.userId)}
                            onValueChange={() => handleCheckboxToggle(eczaci)}
                            tintColors={{ true: '#0066CC', false: '#C0C0C0' }}
                        />
                    </View>

                ))}
                <Button title="Gonder" />
            </View>
        </ScrollView>
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

export default SiparisListesi;

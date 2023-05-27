import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { db } from '../../components/config';
import { ref, onValue, set, update } from 'firebase/database';
import CheckBox from '@react-native-community/checkbox';

const EczaciListesi = ({ navigation, route }) => {
    const [eczacilar, setEczacilar] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);
    const { url } = route.params;
    useEffect(() => {
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
                    qr: url,
                    userId: userId,
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
                        {/* <Text style={styles.avatarText}>{eczaci.firstName.charAt(0)}</Text> */}
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

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, ScrollView, TextInput, Modal } from 'react-native';
import { db, auth } from '../../../components/config';
import { ref, onValue, set, update } from 'firebase/database';
import QRCode from 'react-native-qrcode-svg';
import { onAuthStateChanged } from 'firebase/auth';
import CheckBox from '@react-native-community/checkbox';

const SiparisListesi = ({ navigation, route }) => {
    const [eczacilar, setEczacilar] = useState([]);
    const [kullanicilar, setKullanicilar] = useState([]);
    const [modalVisible, setModalVisible] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [checkedItems, setCheckedItems] = useState([]);
    const [inputValue, setInputValue] = useState('');

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
        const fetchKullanicilar = async () => {
            const kullanicilar = ref(db, 'kullanıcılar/');
            onValue(kullanicilar, (snapshot) => {
                const kullanicilarData = snapshot.val();
                const kullanicilarArray = Object.values(kullanicilarData);
                setKullanicilar(kullanicilarArray);
            });
        };
        fetchKullanicilar();
        fetchEczacilar();
    }, []);

    const handleCloseModal = () => {
        setModalVisible(false);
    }
    const handleInputChange = (text) => {
        setInputValue(text);
    };
    const handleSave = () => {
        console.log('Input value:', inputValue);

        checkedItems.forEach((gonderenKisi) => {
            const kullanici = kullanicilar.find((item) => item.userId === gonderenKisi);
            const eczaci = eczacilar.find((item) => item.userId === currentUser?._id);

            console.log('gonderen kisinin id si ', kullanici);

            if (kullanici && eczaci) {
                const qrRef = ref(db, 'kullanıcılar/' + gonderenKisi);
                update(qrRef, {
                    firstName: kullanici.firstName,
                    lastName: kullanici.lastName,
                    password: kullanici.password,
                    birthdate: kullanici.birthdate,
                    address: kullanici.address,
                    email: kullanici.email,
                    userId: gonderenKisi,
                    role: 'hasta',
                    fiyatlar: inputValue,
                    fiyatGonderenEczaci: eczaci.pharmacyName // Update with the value from eczacilar table
                })
                    .then(() => {
                        alert('Sipariş fiyat bilgisi başarıyla gönderildi');
                        navigation.navigate('BottomTab');
                    })
                    .catch((error) => {
                        console.log('Hata oluştu: ', error);
                    });
            }
        });

        setModalVisible(false);
    };





    useEffect(() => {
        console.log('eczacilar:', eczacilar);
    }, [eczacilar]);

    // Oturum açmış kullanıcının QR değerine sahip olan eczacıları filtreleme
    const filteredEczacilar = eczacilar.filter((eczaci) => eczaci.userId === currentUser?._id);
    const handleCheckboxToggle = (eczaci) => {
        const isChecked = checkedItems.includes(eczaci.gonderenKisi);
        if (isChecked) {
            setCheckedItems(checkedItems.filter((id) => id !== eczaci.gonderenKisi));
        } else {
            setCheckedItems([...checkedItems, eczaci.gonderenKisi]);
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
                            value={checkedItems.includes(eczaci.gonderenKisi)}
                            onValueChange={() => handleCheckboxToggle(eczaci)}
                            tintColors={{ true: '#0066CC', false: '#C0C0C0' }}
                        />
                    </View>
                ))}
                <Modal
                    visible={modalVisible}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={handleCloseModal}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        <View
                            style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}
                        >
                            <TextInput
                                style={{
                                    height: 40,
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    marginBottom: 10,
                                }}
                                value={inputValue}
                                onChangeText={handleInputChange}
                                placeholder="Enter a value"
                            />

                            <Button title="Save" onPress={handleSave} />

                            <Button title="Cancel" onPress={handleCloseModal} />
                        </View>
                    </View>
                </Modal>
                <Button title="Gonder" onPress={() => setModalVisible(true)} />
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

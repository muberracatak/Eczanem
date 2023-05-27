import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { db, auth } from '../../../components/config';
import { ref, onValue, set, update } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';

const PharmacyProfile = () => {
    const [eczacilar, setEczacilar] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const pharmacyData = {
        pharmacyName: 'MÜBZEYED ECZANESİ',
        phoneNumber: '1234567890',
        pharmacistName: 'Eczacı İsim',
        openingDays: 'Pazartesi - Cuma',
        openingHours: '09:00 - 18:00',
        address: 'Eczane Adresi',
        pharmacyImage: require('../../../assets/medicine-icon.png')
    };
    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                console.log('Kullanıcı çıkış yaptı');
                // İstediğiniz işlemleri yapabilirsiniz (örneğin, yönlendirme vb.)
                navigation.navigate('SplashScreen')
            })
            .catch((error) => {
                console.log('Çıkış yaparken bir hata oluştu:', error);
            });
    };
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
    const isOpen = true; // Eczane açık durumu, dinamik olarak güncellenmesi gerekiyorsa uygun şekilde ayarlanmalıdır
    const filteredEczacilar = eczacilar.filter((eczaci) => eczaci.userId === currentUser?._id);

    const navigation = useNavigation();

    const handleLogout = () => {
        navigation.navigate('LoginScreen');
    };

    const handleGoBack = () => {
        navigation.navigate('Anasayfa');
    };

    const handleOpenChat = () => {
        navigation.navigate('ChatScreen');
    };

    return (
        <View style={styles.container}>
            <ScrollView>

                {filteredEczacilar.map((eczaci) => (
                    <View style={styles.container}>
                        <View style={styles.header} key={eczaci.userId}>

                        </View>
                        <View style={styles.topContainer}>
                            <Image style={styles.image} />
                            <Text style={styles.pharmacyName}>{eczaci.pharmacyName}</Text>
                            <View style={isOpen ? styles.openStatusOpen : styles.openStatusClosed}>
                                <Text style={styles.openStatusText}>{isOpen ? 'AÇIK' : 'KAPALI'}</Text>
                            </View>
                        </View>
                        <View style={styles.bottomContainer}>
                            <View style={styles.detailBox}>
                                <View style={styles.detailRow}>
                                    <Icon name="user" size={16} color="#2196f3" style={styles.icon} />
                                    <View>
                                        <Text style={styles.detailTitle}>Eczacı:</Text>
                                        <Text style={styles.detailText}>{eczaci.firstName}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.detailBox}>
                                <View style={styles.detailRow}>
                                    <Icon name="phone" size={16} color="#2196f3" style={styles.icon} />
                                    <View>
                                        <Text style={styles.detailTitle}>Telefon:</Text>
                                        <Text style={styles.detailText}>{pharmacyData.phoneNumber}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.detailBox}>
                                <View style={styles.detailRow}>
                                    <Icon name="calendar" size={16} color="#2196f3" style={styles.icon} />
                                    <View>
                                        <Text style={styles.detailTitle}>Açık Günler:</Text>
                                        <Text style={styles.detailText}>{pharmacyData.openingDays}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.detailBox}>
                                <View style={styles.detailRow}>
                                    <Icon name="clock-o" size={16} color="#2196f3" style={styles.icon} />
                                    <View>
                                        <Text style={styles.detailTitle}>Açık Saatler:</Text>
                                        <Text style={styles.detailText}>{pharmacyData.openingHours}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.detailBox}>
                                <View style={styles.detailRow}>
                                    <Icon name="map-marker" size={16} color="#2196f3" style={styles.icon} />
                                    <View>
                                        <Text style={styles.detailTitle}>Adres:</Text>
                                        <Text style={styles.detailText}>{pharmacyData.address}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                ))}



            </ScrollView>
            <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
                <Text style={styles.logoutButtonText}>ÇIKIŞ YAP</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 15,
        backgroundColor: '#2196f3'
    },
    iconButton: {
        padding: 10
    },
    topContainer: {
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#2196f3'
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10
    },
    pharmacyName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 10
    },
    openStatusOpen: {
        backgroundColor: '#00e676',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 10,
        marginBottom: 10
    },
    openStatusClosed: {
        backgroundColor: '#ff1744',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginBottom: 10
    },
    openStatusText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff'
    },
    bottomContainer: {
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    detailBox: {
        marginBottom: 15,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#f5f5f5'
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6
    },
    icon: {
        marginRight: 15
    },
    detailTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000'
    },
    detailText: {
        fontSize: 18,
        color: '#333333',
        marginTop: 5
    },
    logoutButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#2196f3',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8
    },
    logoutButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    }
});

export default PharmacyProfile;
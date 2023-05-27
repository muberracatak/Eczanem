import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../../components/config';
import { database } from '../../../components/config';

const UserDetails = () => {
    const [user, setUser] = useState({
        username: '',
        birthdate: '',
        age: '',
        diseases: [],
        address: '',
    });
    const [newDisease, setNewDisease] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userSnapshot = await database().collection('oldUsers').doc('user1').get();
                if (userSnapshot.exists) {
                    const userData = userSnapshot.data();
                    const age = calculateAge(userData.birthdate);
                    setUser(prevState => ({
                        ...prevState,
                        username: userData.username,
                        birthdate: userData.birthdate,
                        age: age,
                        address: userData.address,
                    }));
                }
            } catch (error) {
                console.log('Error fetching user details: ', error);
            }
        };

        fetchUserDetails();
    }, []);

    const calculateAge = birthdate => {
        const today = new Date();
        const birthdateArray = birthdate.split('/');
        const birthMonth = parseInt(birthdateArray[1]) - 1;
        const birthDay = parseInt(birthdateArray[0]);
        const birthYear = parseInt(birthdateArray[2]);

        let age = today.getFullYear() - birthYear;

        if (
            today.getMonth() < birthMonth ||
            (today.getMonth() === birthMonth && today.getDate() < birthDay)
        ) {
            age--;
        }

        return age.toString() + ' Yaş';
    };

    const renderDisease = ({ item }) => {
        return <Text style={styles.disease}>{item}</Text>;
    };

    const handleLogout = () => {
        // Logout işlemleri
        navigation.navigate('LoginScreen');
    };

    const handleGoBack = () => {
        navigation.navigate('Anasayfa');
    };

    const handleOpenChat = () => {
        navigation.navigate('ChatScreen');
    };

    const handleAddDisease = () => {
        if (newDisease.trim() !== '') {
            setUser(prevState => ({
                ...prevState,
                diseases: [...prevState.diseases, newDisease],
            }));
            setNewDisease('');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack} style={styles.iconButton}>
                    <Icon name="arrow-left" size={24} color="#ffffff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleOpenChat} style={styles.iconButton}>
                    <Icon name="comments" size={24} color="#ffffff" />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={styles.topContainer}>
                    <Image
                        style={styles.image}
                        source={require('../../../assets/old.png')}
                    />
                    <Text style={styles.pharmacyName}>{user.username}</Text>
                    <Text style={styles.openStatusText}>{user.age}</Text>
                </View>

                <View style={styles.bottomContainer}>
                    <View style={styles.detailBox}>
                        <View style={styles.detailRow}>
                            <Icon
                                name="birthday-cake"
                                size={20}
                                color="#666"
                                style={styles.icon}
                            />
                            <Text style={styles.detailTitle}>Doğum Tarihi</Text>
                        </View>
                        <Text style={styles.detailText}>{user.birthdate}</Text>
                    </View>

                    <View style={styles.detailBox}>
                        <View style={styles.detailRow}>
                            <Icon name="medkit" size={20} color="#666" style={styles.icon} />
                            <Text style={styles.detailTitle}>Hastalıklar</Text>
                        </View>
                        <FlatList
                            data={user.diseases}
                            renderItem={renderDisease}
                            keyExtractor={(item, index) => index.toString()}
                            ListEmptyComponent={
                                <Text style={styles.detailText}>Hastalık bulunmamaktadır.</Text>
                            }
                        />
                        <View style={styles.addDiseaseContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Hastalık adı giriniz..."
                                value={newDisease}
                                onChangeText={setNewDisease}
                            />
                            <TouchableOpacity
                                style={styles.addButton}
                                onPress={handleAddDisease}>
                                <Text style={styles.addButtonLabel}>EKLE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.detailBox}>
                        <View style={styles.detailRow}>
                            <Icon
                                name="map-marker"
                                size={20}
                                color="#666"
                                style={styles.icon}
                            />
                            <Text style={styles.detailTitle}>Adres</Text>
                        </View>
                        <Text style={styles.detailText}>{user.address}</Text>
                    </View>
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>ÇIKIŞ YAP</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 15,
        backgroundColor: '#2196f3',
    },
    iconButton: {
        padding: 10,
    },
    topContainer: {
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#2196f3',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10,
    },
    pharmacyName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 10,
    },
    openStatusOpen: {
        backgroundColor: '#00e676',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 10,
        marginBottom: 10,
    },
    openStatusClosed: {
        backgroundColor: '#ff1744',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginBottom: 10,
    },
    openStatusText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    bottomContainer: {
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    detailBox: {
        marginBottom: 15,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    icon: {
        marginRight: 15,
    },
    detailTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
    },
    detailText: {
        fontSize: 18,
        color: '#333333',
        marginTop: 5,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 10,
        paddingHorizontal: 50,
    },
    addDiseaseContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: '#2196f3',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
        marginLeft: 10,
    },
    addButtonLabel: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    logoutButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#2196f3',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    logoutButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default UserDetails;
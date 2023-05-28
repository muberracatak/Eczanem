import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { db } from '../../../components/config';
import { ref, onValue } from 'firebase/database';
import CheckBox from '@react-native-community/checkbox';

const Kullanicilar = ({ navigation, route }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchEczacilar = async () => {
            const eczacilarRef = ref(db, 'eczacilar/');
            onValue(eczacilarRef, (snapshot) => {
                const eczacilarData = snapshot.val();
                const eczacilarArray = Object.values(eczacilarData);
                setUsers(eczacilarArray);
            });
        };

        fetchEczacilar();
    }, []);

    return (
        <View style={styles.container}>
            {users.map((user) => (
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('Görüşme', {
                            userMail: user.email,
                            userId: user.userId,
                        })
                    }
                    style={styles.userContainer}
                    key={user.userId}
                >
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: user.avatarURL }}
                            style={styles.avatarImage}
                        />
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.nameText}>{user.pharmacyName}</Text>
                        <Text style={styles.lastNameText}>{user.lastName}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 10,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#E8E8E8',
    },
    avatarContainer: {
        backgroundColor: '#CCCCCC',
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    infoContainer: {
        marginLeft: 10,
    },
    nameText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    lastNameText: {
        fontSize: 14,
        color: '#333333',
    },
});

export default Kullanicilar;

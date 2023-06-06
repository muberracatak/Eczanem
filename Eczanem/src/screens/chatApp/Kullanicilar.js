import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { db } from '../../../components/config';
import { ref, onValue } from 'firebase/database';
import CheckBox from '@react-native-community/checkbox';
import Fontisto from 'react-native-vector-icons/Fontisto'
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
            <Text style={styles.title}>ECZACILAR</Text>
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
                        <Fontisto name='hipchat' size={30} color={'white'} />
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.nameText}>{user.pharmacyName}</Text>

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
        backgroundColor: '#629DD9',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#E8E8E8',
    },
    avatarContainer: {

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
        color: 'white'
    },
    statusText: {
        fontSize: 14,
        color: '#666666',
    }, title: {
        fontSize: 30,
        fontWeight: '800',
        color: 'black',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10,
        letterSpacing: 2,
        borderBottomWidth: 2,
        borderBottomColor: '#0066CC',
    },
});

export default Kullanicilar;

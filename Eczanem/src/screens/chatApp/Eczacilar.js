import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import { db } from '../../../components/config';
import { ref, onValue, set, update } from 'firebase/database';
import CheckBox from '@react-native-community/checkbox';

const Eczacilar = ({ navigation, route }) => {
    const [user, setUser] = useState([]);
    const [mail, setMail] = useState([]);
    useEffect(() => {
        const fetchEczacilar = async () => {
            const eczacilarRef = ref(db, 'eczacilar/');
            onValue(eczacilarRef, (snapshot) => {
                const eczacilarData = snapshot.val();

                const eczacilarArray = Object.values(eczacilarData);
                setUser(eczacilarArray);
            });
        };

        fetchEczacilar();
    }, []);


    return (
        <View style={styles.container}>
            {user.map((kisi) => (
                <TouchableOpacity onPress={() => navigation.navigate('Chat', { userMail: kisi.email, userId: kisi.userId })} style={styles.eczaciContainer} key={kisi.userId}>
                    <View style={styles.avatarContainer}>
                        {/* <Text style={styles.avatarText}>{eczaci.firstName.charAt(0)}</Text> */}
                    </View>
                    <TouchableOpacity style={styles.infoContainer} >
                        <Text style={styles.adText}>{kisi.firstName}</Text>
                        <Text style={styles.soyadText}>{kisi.lastName}</Text>
                    </TouchableOpacity>

                </TouchableOpacity>
            ))}

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

export default Eczacilar;

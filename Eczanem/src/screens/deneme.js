import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from '../../components/config';
import { ref, onValue } from 'firebase/database';

const Deneme = ({ navigation }) => {
    const [addresses, setAddresses] = useState([]);
    const [names, setNames] = useState([]);
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const starCountRef = ref(db, 'kullanıcılar/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            const userAddresses = Object.values(data).map((item) => item.address);
            const userNames = Object.values(data).map((item) => `${item.firstName} ${item.lastName}`);
            const role = Object.values(data).map((item) => item.role)[0]; // Assuming the role is the same for all users
            setAddresses(userAddresses);
            setNames(userNames);
            setUserRole(role);
        });
    }, []);

    const canAccessChat = userRole === 'eczacı';

    return (
        <View style={styles.container}>
            <FlatList
                data={names}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <View style={styles.avatarContainer}>
                            <Text style={styles.avatarText}>{item.charAt(0)}</Text>
                        </View>
                        <TouchableOpacity onPress={() => canAccessChat && navigation.navigate('Chat')} style={styles.textContainer}>
                            <Text style={styles.name}>{item}</Text>
                            <Text style={styles.address}>{addresses}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    // Styles...

});

export default Deneme;

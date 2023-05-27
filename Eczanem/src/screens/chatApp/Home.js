import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, Button } from 'react-native';
import { Auth, db } from '../../../components/config'

const styles = StyleSheet.create({
    view: {
        width: '100%',
        height: '100%',
        padding: 25,
    },
});

export default function Loginscreen({ navigation }) {


    const [user, setUser] = useState(null); // This user
    const [users, setUsers] = useState([]); // Other Users

    useEffect(() => {
        const currentUser = Auth.currentUser;
        const userRef = db.ref('kullanicilar').child(currentUser.uid);

        userRef.on('value', (snapshot) => {
            const userData = snapshot.val();
            setUser(userData);
        });

        return () => {
            userRef.off('value');
        };
    }, []);

    useEffect(() => {
        if (user) {
            const usersRef = db.ref('kullanicilar');
            const role = user.role === 'Hasta' ? 'Eczaci' : 'Hasta';

            usersRef
                .orderByChild('role')
                .equalTo(role)
                .on('value', (snapshot) => {
                    const userArray = [];

                    snapshot.forEach((childSnapshot) => {
                        const userData = childSnapshot.val();
                        userArray.push(userData);
                    });

                    setUsers(userArray);
                });

            return () => {
                usersRef.off('value');
            };
        }
    }, [user]);

    return (
        <View>
            <View style={{ padding: 10, backgroundColor: '#b1b1b1', paddingTop: 55 }}>
                <Text style={{ fontSize: 24, fontWeight: '800' }}>Welcome {user?.name}</Text>
            </View>

            <View style={styles.view}>
                <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 20 }}>
                    Here is the list of {user?.role === 'Student' ? 'Teachers' : 'Students'}
                </Text>

                <View style={{ marginBottom: 40 }}>
                    <FlatList
                        data={users}
                        renderItem={({ item }) => (
                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#b1b1b1', marginBottom: 20 }}>
                                <Text style={{ fontSize: 18, fontWeight: '400', marginBottom: 8 }}>{item.name}</Text>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>

                <Button
                    title="Log Out"
                    style={{ alignSelf: 'center' }}
                    onClick={() => Auth.signOut()}
                />
            </View>
        </View>
    );
}
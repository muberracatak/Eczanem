import { View, SafeAreaView, StyleSheet, Pressable, Image } from 'react-native';
import React from 'react'
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,
} from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DATA from '../components/Post/data'
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const myCustomShare = async () => {
        const shareOptions = {
            message: 'Order your next meal from FoodFinder App. I\'ve already ordered more than 10 meals on it.',
            url: files.appLogo,
            // urls: [files.image1, files.image2]
        }

        try {
            const ShareResponse = await Share.open(shareOptions);
            console.log(JSON.stringify(ShareResponse));
        } catch (error) {
            console.log('Error => ', error);
        }
    };
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.userInfoSection}>
                <Text style={{ fontSize: 35, fontWeight: 'bold', margin: 10, padding: 10, marginLeft: -10 }}>Profile</Text>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Image source={require('../images/image.png')} style={{ width: 80, height: 80 }} />
                    <View style={{ marginLeft: 20 }}>
                        <Title style={[styles.title, {
                            marginTop: 15,
                            marginBottom: 5,
                        }]}>{DATA[0].username}</Title>
                        <Caption style={styles.caption}>@muberracatak</Caption>

                    </View>
                    <Pressable onPress={() => navigation.navigate('EditProfileScreen')}>
                        <AntDesign name="rightcircleo" size={30} color="gray" style={{ right: -100, top: 20 }} />
                    </Pressable>
                </View>

            </View>
            <View style={{ height: 1, backgroundColor: 'lightgrey', width: 350, left: 20 }} />




            <View style={styles.menuWrapper}>
                <Text style={{ fontSize: 22, fontWeight: '600', margin: 9, padding: 9 }}>Account settings</Text>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <AntDesign name="user" size={24} color="black" />
                        <Text style={styles.menuItemText}>Personal information</Text>
                        <View style={{ height: 1, backgroundColor: 'lightgrey', width: 350, left: -220, top: 40 }} />

                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <MaterialIcons name="payments" size={24} color="black" />
                        <Text style={styles.menuItemText}>Payments and payouts</Text>
                        <View style={{ height: 1, backgroundColor: 'lightgrey', width: 350, left: -230, top: 40 }} />

                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={myCustomShare}>
                    <View style={styles.menuItem}>
                        <Foundation name="page" size={24} color="black" />
                        <Text style={styles.menuItemText}>Taxes</Text>
                        <View style={{ height: 1, backgroundColor: 'lightgrey', width: 350, left: -90, top: 40 }} />

                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { }}>
                    <View style={styles.menuItem}>
                        <MaterialIcons name="security" size={24} color="black" />
                        <Text style={styles.menuItemText}>Login & security</Text>
                        <View style={{ height: 1, backgroundColor: 'lightgrey', width: 350, left: -170, top: 40 }} />

                    </View>
                </TouchableRipple>

            </View>
        </SafeAreaView>
    )
}

export default ProfileScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
});
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import deprecatedPropType from 'deprecated-react-native-prop-types';

const PharmacyHomeScreen = () => {
    const [address, setAddress] = React.useState('Ferhat sok. sarıgazi mah daire:3 kat:5 Üsküdar / İstanbul '); // Adres bilgisi state'i
    return (
        <View>
            <ScrollView>
                <View style={styles.container}>
                    <Image source={require('../../assets/anasayfa.png')} style={styles.logo} />
                    <View style={styles.addressContainer}>
                        <View style={styles.addressBox}>
                            <Text style={styles.addressText}>{address}</Text>

                        </View>
                    </View>
                    <View >
                        <YoutubeIframe
                            height={300}
                            width={400}
                            videoId='sADJf7GDgqk'
                        />
                    </View>
                    <View style={styles.container}>
                        <YoutubeIframe
                            height={300}
                            width={400}
                            videoId='_9J5UHv1Ojs'
                        />
                    </View>


                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 50,
    },
    addressContainer: {
        alignItems: 'flex-start',
        marginBottom: 30,
    },
    addressLabel: {
        color: '#555',
        fontSize: 16,
        marginBottom: 10,
    },
    addressBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        borderRadius: 5,
        padding: 10,
    },
    addressText: {
        flex: 1,
        color: '#333',
        fontSize: 16,
    },
    locationButton: {
        backgroundColor: '#3f51b5',
        padding: 10,
        borderRadius: 5,
    },
    locationButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#3f51b5',
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
    },
    footerText: {
        color: '#ccc',
        fontSize: 12,
    },
});

export default PharmacyHomeScreen;

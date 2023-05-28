import React, { useState, useRef, useEffect } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { db } from '../../components/config';
import { ref, onValue } from 'firebase/database';

const MapScreen = () => {
    const apiKey = 'AIzaSyAaMWs_VXz8T34g9QE83RRXB7cAz0K_6xU'; // Replace with your actual API key

    const [coordinates, setCoordinates] = useState([]);
    const [eczaciAd, setEczaciAd] = useState('');

    useEffect(() => {
        const fetchEczacilar = async () => {
            const eczacilarRef = ref(db, 'eczacilar/');
            onValue(eczacilarRef, (snapshot) => {
                const eczacilarData = snapshot.val();
                const eczacilarArray = Object.values(eczacilarData);

                const coords = eczacilarArray.map((eczacilar) => ({
                    latitude: eczacilar.enlem,
                    longitude: eczacilar.boylam,
                }));
                const isim = eczacilarArray.map((eczacilar) => (
                    eczacilar.pharmacyName
                ))
                setCoordinates(coords);
                setEczaciAd(isim);
            });
        };

        fetchEczacilar();
    }, []);

    const handleDoublePress = (event) => {
        const { coordinate } = event.nativeEvent;

        mapRef.current.animateToRegion({
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });
    };

    const mapRef = useRef(null);

    return (
        <View style={{ flex: 1 }}>
            {coordinates && (
                <MapView
                    ref={mapRef}
                    provider={MapView.PROVIDER_GOOGLE}
                    providerProps={{
                        apiKey: apiKey,
                    }}
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: coordinates.length > 0 ? coordinates[0].latitude : 0,
                        longitude: coordinates.length > 0 ? coordinates[0].longitude : 0,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    onDoublePress={handleDoublePress}
                >
                    {coordinates.map((coord, index) => (
                        <Marker
                            key={index}
                            coordinate={coord}
                            image={require('../../assets/eczane.png')}
                            title="ECZANE"
                        //description={eczaciAd}
                        />
                    ))}
                </MapView>
            )}
        </View>
    );
};

export default MapScreen;

import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
    const apiKey = 'AIzaSyAaMWs_VXz8T34g9QE83RRXB7cAz0K_6xU'; // API anahtarınızı buraya yerleştirin

    const [address, setAddress] = useState('');
    const [predictions, setPredictions] = useState([]);
    const [coordinates, setCoordinates] = useState(null);
    const mapRef = useRef(null);

    const handleSearch = () => {
        fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${address}&key=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.predictions) {
                    setPredictions(data.predictions);
                }
            })
            .catch((error) => {
                console.log('Hata:', error);
            });
    };

    const handlePredictionPress = (prediction) => {
        const placeId = prediction.place_id;
        fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.result) {
                    const result = data.result;
                    const { lat, lng } = result.geometry.location;

                    // Enlem ve boylam koordinatlarını ayarla
                    setCoordinates({ latitude: lat, longitude: lng });

                    // Haritayı seçilen adresin üzerine zoom yap
                    mapRef.current.animateToRegion({
                        latitude: lat,
                        longitude: lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    });
                }
            })
            .catch((error) => {
                console.log('Hata:', error);
            });
    };

    const handleDoublePress = (event) => {
        const { coordinate } = event.nativeEvent;

        // Haritayı çift tıklanan noktaya zoom yap
        mapRef.current.animateToRegion({
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                    style={{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 1, marginRight: 10, paddingHorizontal: 10 }}
                    placeholder="Adres girin"
                    value={address}
                    onChangeText={setAddress}
                />
                <TouchableOpacity style={{ padding: 10, backgroundColor: 'blue' }} onPress={handleSearch}>
                    <Text style={{ color: 'white' }}>Ara</Text>
                </TouchableOpacity>
            </View>
            <View>
                {predictions.map((prediction) => (
                    <TouchableOpacity key={prediction.place_id} onPress={() => handlePredictionPress(prediction)}>
                        <Text>{prediction.description}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            {coordinates && (
                <MapView
                    ref={mapRef}
                    provider={MapView.PROVIDER_GOOGLE}
                    providerProps={{
                        apiKey: apiKey,
                    }}
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: coordinates.latitude,
                        longitude: coordinates.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    onDoublePress={handleDoublePress}
                >
                    <Marker
                        coordinate={coordinates}
                        image={require('../../assets/old.png')}
                        title="ECZANE"
                    />
                </MapView>
            )}
        </View>
    );
};

export default MapScreen;
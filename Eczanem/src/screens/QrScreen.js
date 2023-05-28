import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Button } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, db } from '../../components/config'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import QRCode from 'react-native-qrcode-svg';
import LottieView from 'lottie-react-native';


const ImagePickerScreen = ({ navigation }) => {
    const [imageUri, setImageUri] = useState(null);
    const [imageType, setImageType] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [downloadURL, setDownloadURL] = useState(null);
    const [success, setSuccess] = useState(false);


    const uploadImage = async (uri, type) => {
        const storageRef = ref(storage, `image/jpg`);
        const snapshot = await uploadBytes(storageRef, uri);
        const downloadUrl = await getDownloadURL(snapshot.ref);
        setDownloadURL(downloadUrl);
        console.log('Uploaded a blob or file!', snapshot.ref);
        console.log('Download URL:', downloadUrl);
    };


    const openCamera = () => {
        launchCamera({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                setImageUri(response.uri);
                setImageType(response.type);
                uploadImage(response.uri, response.type);
            }
        });
    };

    const openImageLibrary = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                setImageUri(response.uri);
                setImageType(response.type);
                uploadImage(response.uri, response.type);
            }
        });
    };
    const gonderildi = () => {
        navigation.navigate('EczacilarListesi', { url: downloadURL })
        setSuccess(true);
    }

    const renderQRCode = () => {


        if (downloadURL) {
            return (
                <View style={{ top: 200, left: 10 }}>

                    <QRCode value={downloadURL} size={200} />
                    <View style={{ top: 30 }}>
                        <Button title='Eczacilara gonder' onPress={gonderildi} />
                    </View>
                </View>
            );
        } else {
            return null;
        }
    };

    return (
        <View style={styles.container}>
            {renderQRCode()}
            <LottieView
                autoPlay
                style={{ height: 300, alignSelf: 'center', top: -160 }}
                speed={1}
                loop={true}
                source={require('../../assets/recete.json')}
            />
            <ActionButton buttonColor="#2e64e5" style={{ top: 500 }}>
                <ActionButton.Item
                    buttonColor="#9b59b6"
                    title="Fotoğraf Çek"
                    onPress={openCamera}>
                    <Icon name="camera-outline" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item
                    buttonColor="#3498db"
                    title="Fotoğraf albümünden seç"
                    onPress={openImageLibrary}>
                    <Icon name="md-images-outline" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 300,
        marginVertical: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default ImagePickerScreen;
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../components/config'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import QRCode from 'react-native-qrcode-svg';

const ImagePickerScreen = () => {
    const [imageUri, setImageUri] = useState(null);
    const [imageType, setImageType] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [downloadURL, setDownloadURL] = useState(null);
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

    const renderQRCode = () => {
        if (downloadURL) {
            return (
                <View style={{ top: 10, left: 10 }}>
                    <QRCode value={downloadURL} size={200} />
                </View>
            );
        } else {
            return null;
        }
    };

    return (
        <View style={styles.container}>
            {/*{imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
            <TouchableOpacity style={styles.button} onPress={openCamera}>
                <Text style={styles.buttonText}>Take a Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={openImageLibrary}>
                <Text style={styles.buttonText}>Choose from Library</Text>
            </TouchableOpacity>
            {/*{imageUrl && <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />}*/}

            {renderQRCode()}
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

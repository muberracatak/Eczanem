import React, { useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import ImagePicker from 'react-native-image-picker';
import { Button, Image, View, StyleSheet } from 'react-native';
import { launchCamera, launchImageLibrary, showImagePicker } from 'react-native-image-picker';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

const QRCodeGenerator = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [fileData, setFileData] = useState([])
    const option = {
        includeBase64: true,
        storageOptions: {
            skipBackup: true,
            path: 'image'
        },
        mediaType: 'photo',
        quality: 1,
        saveToPhotos: true
    };
    const openCamera = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fileData)
        };
        launchCamera(option, (res) => {
            if (res.didCancel) {
                console.log('user cancelled')
            } else if (res.errorCode) {
                console.log('Image picker error', res.errorMessage)
            } else {
                const source = { uri: res.uri };
                console.log('response', JSON.stringify(res))
                setFileData(res.assets[0].base64)
                setFileUri(res.assets[0].uri)
                console.log('id : ', res.assets[0].id)
                console.log('uri : ', res.assets[0].uri)
                console.log('fileName : ', res.assets[0].fileName)
                console.log('fileSize : ', res.assets[0].fileSize)
                console.log('type : ', res.assets[0].type)

            }
        })
    }
    const selectImage = () => {
        launchImageLibrary(option, (res) => {
            if (res.didCancel) {
                console.log('cancelled image selection')
            }
            else {
                const source = { uri: res.uri };
                console.log('response', JSON.stringify(res))
                //setFileData(res.assets[0].base64)
                setImageUrl(res.assets[0].uri)
                //setImageSource(res.uri);
                //setQRCodeValue(res.uri);
                console.log('id : ', res.assets[0].id)
                console.log('uri : ', res.assets[0].uri)
                console.log('fileName : ', res.assets[0].fileName)
                console.log('fileSize : ', res.assets[0].fileSize)
                console.log('type : ', res.assets[0].type)
            }
        })
    }
    const renderQRCode = () => {
        if (imageUrl) {
            return (
                <View style={{ top: 200, left: 90 }}>
                    <Image style={{ width: 150, height: 150, marginLeft: 2, padding: 2 }} source={{ uri: `data:image/jpeg;base64,` + imageUrl }} />

                    <QRCode value={imageUrl} size={200} />
                </View>

            )
                ;
        } else {
            return null;
        }
    };

    return (
        <View>
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
                    onPress={selectImage}>
                    <Icon name="md-images-outline" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
        </View>
    );
};

export default QRCodeGenerator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});
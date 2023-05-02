import React, { useState } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Text,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import QRCode from "react-native-qrcode-svg"
import BottomTab from '../../components/bottomTab';

import { launchCamera, launchImageLibrary, showImagePicker } from 'react-native-image-picker';
const App = () => {
    const [imageSource, setImageSource] = useState(null);
    const [qrCodeValue, setQRCodeValue] = useState(null);
    const [pic, setPic] = useState('')
    const [singleData, setSingleData] = useState([]);

    const [fileData, setFileData] = useState([])
    const [fileUri, setFileUri] = useState(null)
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

    const selectImage = () => {
        launchImageLibrary(option, (res) => {
            if (res.didCancel) {
                console.log('cancelled image selection')
            }
            else {
                const source = { uri: res.uri };
                console.log('response', JSON.stringify(res))
                setFileData(res.assets[0].base64)
                setFileUri(res.assets[0].uri)
                setImageSource(res.uri);
                setQRCodeValue(res.uri);
                console.log('id : ', res.assets[0].id)
                console.log('uri : ', res.assets[0].uri)
                console.log('fileName : ', res.assets[0].fileName)
                console.log('fileSize : ', res.assets[0].fileSize)
                console.log('type : ', res.assets[0].type)
            }
        })
    }
    const renderFileData = () => {
        if (fileData) {
            const base64Data = `data:image/jpeg;base64,${fileData}`;
            return (
                <View>
                    <Image style={{ width: 150, height: 150, marginLeft: 2, padding: 2 }} source={{ uri: base64Data }} />
                    <QRCode
                        value={base64Data}
                        size={150}
                        color='black'
                        backgroundColor='white'
                    />
                </View>
            )
        }
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={{ backgroundColor: '#007AFF', padding: 10, margin: 20, borderRadius: 10 }} onPress={selectImage}>
                <Text style={{ color: 'white', fontSize: 18 }}>Select Image</Text>
            </TouchableOpacity>
            <QRCode
                value={'https://www.google.com'}
                size={150} //boyutunu artırabiliriz. Default değeri 100’dür
                color={'purple'} //rengini değiştirebiliriz
                enableGradient={true} //gradient renk tasarlamak için öncelikle bu     değeri true yapmalıyız
                linearGradient={['red', 'purple', 'white']} //istenilen renklerle kombin yapabiliriz.
            />
            {imageSource && (
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={{ uri: imageSource }}
                        style={{ width: 200, height: 200, marginTop: 20 }}
                    />
                    <QRCode
                        value={qrCodeValue}
                        size={200}
                        bgColor='black'
                        fgColor='white'
                    />
                </View>
            )}

        </View>
    );
};

export default App;

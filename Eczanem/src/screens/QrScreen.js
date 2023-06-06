import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button, ScrollView, TextInput, Modal } from 'react-native';
import { db, auth, storage } from '../../components/config';
import { ref, onValue, set, update } from 'firebase/database';
import QRCode from 'react-native-qrcode-svg';
import { onAuthStateChanged } from 'firebase/auth';
import CheckBox from '@react-native-community/checkbox';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import LottieView from 'lottie-react-native';
import Fontisto from 'react-native-vector-icons/Fontisto'

const QrScreen = ({ navigation, route }) => {
    const [eczacilar, setEczacilar] = useState([]);
    const [kullanicilar, setKullanicilar] = useState([]);
    const [modalVisible, setModalVisible] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [checkedItems, setCheckedItems] = useState([]);
    const [inputValue, setInputValue] = useState('');

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

    const gonderildi = () => {
        navigation.navigate('EczacilarListesi', { url: downloadURL })
        setSuccess(true);
    }
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // Kullanıcı oturum açmış ise burası çalışır
                setCurrentUser({
                    _id: user.uid,
                    name: user.email,
                });
            } else {
                console.log('Kullanıcı oturum açmamış');
            }
        });


        const fetchKullanicilar = async () => {
            const kullanicilar = ref(db, 'kullanıcılar/');
            onValue(kullanicilar, (snapshot) => {
                const kullanicilarData = snapshot.val();
                const kullanicilarArray = Object.values(kullanicilarData);
                setKullanicilar(kullanicilarArray);
            });
        };
        fetchKullanicilar();

    }, []);


    /* const renderQRCode = () => {
         <View style={styles.container}>
             {filteredEczacilar.map((eczaci) => (
                 <View style={styles.eczaciContainer} key={eczaci.userId}>
                     {eczaci.fiyatlar ? (
                         <>
                             <Text>{eczaci.fiyatGonderenEczaci}  </Text>
                             <Text>{eczaci.fiyatlar} TL </Text>
 
                         </>
 
                     ) : (
                         null
                     )}
                 </View>
 
             ))}
 
         </View>
     }*/



    // Oturum açmış kullanıcının QR değerine sahip olan eczacıları filtreleme
    console.log('currentUser:', currentUser);
    console.log('kullanicilar:', kullanicilar);

    const filteredEczacilar = kullanicilar.filter((kullanici) => kullanici.userId === currentUser?._id);

    const renderQRCode = () => {

        return (

            <View style={{ top: 10, left: 10 }}>

                {filteredEczacilar.map((eczaci) => (
                    <View style={styles.eczaciContainer} key={eczaci.userId}>
                        {eczaci.fiyatlar ? (
                            <View style={styles.bubbleContainer}>
                                <Text style={styles.bubbleText}>{eczaci.fiyatGonderenEczaci} nin gönderdiğiniz reçete için verdiği fiyat değeri  </Text>
                                <Text style={styles.bubbleText}>{eczaci.fiyatlar} TL </Text>


                            </View >

                        ) : (
                            null
                        )}
                    </View>
                ))}



                <ActionButton buttonColor="#2e64e5" style={{ top: 150 }}>
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
    console.log('filteredEczacilar:', filteredEczacilar);

    return (

        <View style={styles.container}>
            <LottieView
                autoPlay
                style={{ height: 300, top: -110 }}
                speed={1}
                loop={true}
                source={require('../../assets/recete.json')}
            />
            <View style={styles.bubbleContainer}>
                <Text style={styles.bubbleText}>
                    Bu sayfada reçete yükleme işlemi yapabilirsiniz.
                </Text>
            </View>
            {renderQRCode()}
            {downloadURL ? (
                <View style={{ top: -90 }}>
                    <QRCode value={downloadURL} size={200} />
                    <View style={{ top: 30 }}>
                        <Button title='Eczacilara gonder' onPress={() => navigation.navigate('EczacilarListesi', { url: downloadURL })} />
                    </View></View>

            ) : (
                null
            )}
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
    eczaciContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e1e5ea',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    avatarContainer: {
        backgroundColor: '#6c757d',
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: 20,
        color: '#ffffff',
    },
    infoContainer: {
        marginLeft: 10,
    },
    adText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    soyadText: {
        fontSize: 14,
        color: '#333333',
    },
    bubbleContainer: {
        backgroundColor: '#629DD9',
        borderRadius: 15,
        padding: 10,
        marginTop: 20,
        top: -330,

    },
    bubbleText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
});
export default QrScreen;
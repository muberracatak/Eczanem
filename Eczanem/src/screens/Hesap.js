import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { db } from '../../components/config';
import { ref, push, set } from 'firebase/database';

const App = () => {
    const [ad, setAd] = useState('');
    const [soyad, setSoyad] = useState('');
    const [adres, setAdres] = useState('');
    const [yas, setYas] = useState('');
    const [hastaliklar, setHastaliklar] = useState([]);
    const [hastalikAdi, setHastalikAdi] = useState('');

    const saveUser = () => {
        const usersRef = ref(db, 'kullanıcılar');
        const newUserRef = push(usersRef);

        const user = {
            Ad: ad,
            Soyad: soyad,
            Adres: adres,
            Yas: yas,
            Hastaliklar: hastaliklar
        };

        set(newUserRef, user)
            .then(() => {
                console.log('Kullanıcı kaydedildi');
                setAd('');
                setSoyad('');
                setAdres('');
                setYas('');
                setHastalikAdi('');
                setHastaliklar([])
            })
            .catch((error) => {
                console.log('Hata:', error);
            });
    };
    const handleHastalikEkle = () => {
        if (hastalikAdi.trim() !== '') {
            setHastaliklar([...hastaliklar, hastalikAdi]);
            setHastalikAdi('');
        }
    };
    return (
        <View>
            <TextInput
                placeholder="Adınızı girin"
                value={ad}
                onChangeText={(text) => setAd(text)}
            />
            <TextInput
                placeholder="Soyadınızı girin"
                value={soyad}
                onChangeText={(text) => setSoyad(text)}
            />
            <TextInput
                placeholder="Yaşınızı girin"
                value={yas}
                onChangeText={(text) => setYas(text)}
            />
            <TextInput
                placeholder="Adresinizi girin"
                value={adres}
                onChangeText={(text) => setAdres(text)}
            />
            <TextInput
                placeholder="Hastalıklarınızı girin"
                value={hastalikAdi}
                onChangeText={(text) => setHastalikAdi(text)}
            />
            <Button title="Hastalık Ekle" onPress={handleHastalikEkle} />

            <Button title="Kaydet" onPress={saveUser} />
        </View>
    );
};

export default App;

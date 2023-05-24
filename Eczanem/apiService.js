import { View, Text } from 'react-native'
import React from 'react'
import { Auth, database } from './components/config'

export const SignupUser = (email, password) => {
    return new Promise(function (resolve, reject) {
        Auth().createUserWithEmailAndPassword(email, password).then((snapshot) => {
            resolve('Sign up successfully');
        }).catch(error => {
            reject(error);
        });
    });
}

export const submitUser = (Id, Ad, Soyad) => {
    return new Promise(function (resolve, reject) {
        let key;
        if (Id != null) {
            key = Id;
        }
        else {
            key = database()
                .ref()
                .push().key
        }

        let dataToSave = {
            Id: key,
            Ad: Ad,
            Soyad: Soyad,
        };
        database().ref('users')
            .update(dataToSave)
            .then(snapshot => {
                resolve(snapshot);
            })
            .catch(err => {
                reject(err);
            });
    })
}
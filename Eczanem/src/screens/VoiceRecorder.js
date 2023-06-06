import React, { useState, useEffect } from 'react';
import { Button, View, PermissionsAndroid, Platform } from 'react-native';
import AudioRecorderPlayer, {
    AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';

const VoiceRecorder = () => {
    const [recorder, setRecorder] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const audioRecorderPlayer = new AudioRecorderPlayer();

    useEffect(() => {
        // Cleanup when unmounting the component
        return () => {
            if (audioRecorderPlayer) {
                audioRecorderPlayer.stopRecorder();
                audioRecorderPlayer.removeRecordBackListener();
            }
        };
    }, []);

    // Check permissions
    const checkPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const grants = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                ]);

                console.log('write external storage', grants);

                if (
                    grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                    grants['android.permission.READ_EXTERNAL_STORAGE'] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                    grants['android.permission.RECORD_AUDIO'] ===
                    PermissionsAndroid.RESULTS.GRANTED
                ) {
                    console.log('Permissions granted');
                    return true;
                } else {
                    console.log('All required permissions not granted');
                    return false;
                }
            } catch (err) {
                console.warn(err);
                return false;
            }
        }
    };

    const startRecording = async () => {
        const recordable = await checkPermission();
        console.log('permissions/recordable', recordable);
        if (recordable) {
            try {
                // audioRecorderPlayer.setAudioSource(AudioSourceAndroidType.MIC);
                const result = await audioRecorderPlayer.startRecorder();
                setRecorder(audioRecorderPlayer);
                setIsRecording(true);
                console.log('Recording started');
            } catch (error) {
                console.error('Error while starting recording:', error);
            }
        } else {
            return;
        }
    };

    const stopRecording = async () => {
        if (recorder) {
            const audioPath = await recorder.stopRecorder();
            setIsRecording(false);
            console.log('audioPath', audioPath);
            console.log('Recording stopped');


        }
    };

    return (
        <View style={{ height: 500, width: 500 }}>
            <Button
                title={isRecording ? 'Stop Recording' : 'Start Recording'}
                onPress={isRecording ? stopRecording : startRecording}
            />
        </View>
    );
};

export default VoiceRecorder;
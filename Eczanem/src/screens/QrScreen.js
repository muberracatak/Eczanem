import React from 'react';
import { StyleSheet, View } from 'react-native';
import YouTube from 'react-native-youtube';
import YoutubeIframe from 'react-native-youtube-iframe';

const VideoScreen = () => {
    const { data } = "PeGfX7W1mJk"
    return (
        <View style={styles.container}>
            <YoutubeIframe
                height={500}
                width={400}
                videoId='PeGfX7W1mJk'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    video: {
        alignSelf: 'stretch',
        height: 300,
    },
});

export default VideoScreen;

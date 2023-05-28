import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

const Home = () => {
    return (
        <View>
            <LottieView
                autoPlay
                style={{ height: 300, alignSelf: 'center', top: 10 }}
                speed={1}
                loop={true}
                source={require('../../../assets/recete.json')}
            />
        </View>
    )
}

export default Home
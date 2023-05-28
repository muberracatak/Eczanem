import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity } from 'react-native';
import { ref, onValue, push, serverTimestamp } from 'firebase/database';
import { auth, db } from '../../../components/config';
import { onAuthStateChanged } from 'firebase/auth';
import AudioRecorderPlayer, {
    AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import Icon from 'react-native-vector-icons/FontAwesome';

const ChatScreen = ({ route }) => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const { userMail, userId } = route.params;
    const [recorder, setRecorder] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const audioRecorderPlayer = new AudioRecorderPlayer();
    const [recipientUser, setRecipientUser] = useState({
        _id: userId, // Alıcı kullanıcı kimliği
        name: userMail, // Alıcı kullanıcı adı
    });
    const [currentUser, setCurrentUser] = useState(null); // Ekledik

    useEffect(() => {
        const chatRef = ref(db, 'chat');

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser({
                    _id: user.uid,
                    name: user.email,
                });
            } else {
                console.log('Kullanıcı oturum açmamış');
            }
        });

        const unsubscribe = onValue(chatRef, (snapshot) => {
            if (snapshot.exists()) {
                const messageList = [];

                snapshot.forEach((childSnapshot) => {
                    const { _id, text, createdAt, user } = childSnapshot.val();
                    messageList.push({
                        _id,
                        text,
                        createdAt: new Date(createdAt),
                        user,
                    });
                });

                setMessages(messageList.reverse());
            } else {
                setMessages([]);
            }
        });

        return () => {

            unsubscribe();

        };
    }, []);



    const handleSend = () => {
        if (inputText.trim() !== '') {
            const newMessage = {
                _id: messages.length + 1,
                text: inputText,
                user: {
                    _id: currentUser._id, // Mesaj gönderen kullanıcının kimliği
                    name: currentUser.name, // Mesaj gönderen kullanıcının adı
                },
                createdAt: new Date(),
            };

            push(ref(db, 'chat'), { // Firebase'e kaydetme işlemi
                _id: newMessage._id,
                text: newMessage.text,
                createdAt: serverTimestamp(),
                user: {
                    _id: newMessage.user._id,
                    name: newMessage.user.name,
                },
            });

            setInputText('');
        }
    };
    const renderMessage = ({ item }) => {
        const isSentMessage = item.user._id === currentUser._id;
        const messageContainerStyle = {
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            alignSelf: isSentMessage ? 'flex-end' : 'flex-start',
            backgroundColor: isSentMessage ? '#DCF8C5' : '#F5F5F5',
            borderRadius: 10,
            maxWidth: '80%',
            marginVertical: 5,
            marginLeft: isSentMessage ? 50 : 0, // Add this line for received messages
            marginRight: isSentMessage ? 0 : 50, // Add this line for sent messages
        };
        const messageTextStyle = {
            textAlign: isSentMessage ? 'right' : 'left',
            color: isSentMessage ? '#000000' : '#000000',
        };

        return (
            <View style={messageContainerStyle}>
                <Text style={messageTextStyle}>
                    {isSentMessage ? '' : `${item.user.name}: `}
                    {item.text}
                </Text>
            </View>
        );
    };





    return (
        <View style={{ flex: 1 }}>
            {/*<Text style={{ fontSize: 18, fontWeight: 'bold', padding: 10 }}>{recipientUser.name}</Text>*/}
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item._id.toString()}
                inverted={true}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#ccc', padding: 10 }}>
                <TextInput
                    style={{ flex: 1, marginRight: 10, paddingVertical: 5, paddingHorizontal: 10, borderWidth: 1, borderColor: '#ccc' }}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Mesajınızı buraya yazın..."
                />
                <TouchableOpacity style={{ marginRight: 10 }} onPress={handleSend}>
                    <Icon name="send" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: isRecording ? 'red' : 'green',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Icon name={isRecording ? 'stop' : 'microphone'} size={24} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ChatScreen;

import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { ref, onValue, push, serverTimestamp } from 'firebase/database';
import { auth, db } from '../../../components/config';
import { onAuthStateChanged } from 'firebase/auth';

const ChatScreen = ({ route }) => {
    const [messages, setMessages] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const { userMail, userId } = route.params;
    const [recipientUser, setRecipientUser] = useState({
        _id: userId, // Alıcı kullanıcı kimliği
        name: userMail, // Alıcı kullanıcı adı
    });

    console.log(userMail, userId)
    useEffect(() => {
        const chatRef = ref(db, 'chat');

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

    const onSend = async (newMessages) => {
        const { _id, text, createdAt, user } = newMessages[0];

        await push(ref(db, 'chat'), {
            _id,
            text,
            createdAt: serverTimestamp(),
            user,
        });
    };

    if (!currentUser) {
        return null;
    }

    return (
        <GiftedChat
            messages={messages}
            onSend={(newMessages) => onSend(newMessages)}
            user={currentUser}
            inverted={true}
            placeholder="Mesajınızı buraya yazın..."
            showUserAvatar={true}
            renderUsernameOnMessage={true}
            // Alıcı kullanıcı bilgilerini ekliyoruz
            additionalProps={{ recipientUser }}
        />
    );
};

export default ChatScreen;

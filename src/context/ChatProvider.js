import React, { createContext, useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

export const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState({});

  // Initialize Firebase Firestore
  const db = firestore();

  // Function to fetch messages from Firestore
  const fetchMessages = async (id) => {
    try {
      const querySnapshot = await db
        .collection('chats')
        .eq('id', id)
        .orderBy('data_hora')
        .get();

      const messages = querySnapshot.docs.map((doc) => doc.data());

      setMessages({ remetente: messages, destinatario: [] });

      return { remetente: messages, destinatario: [] };
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = (newMessage) => {
    console.log('newMessage');
    console.log(newMessage);
    db.collection('chatMessages').add({
      content: newMessage.content,
      sent: newMessage.sent,
      sentBy: newMessage.sentBy,
    });
  };

  return (
    <ChatContext.Provider value={{ messages, fetchMessages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

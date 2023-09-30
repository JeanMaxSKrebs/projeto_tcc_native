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


  // Function to send a new message to Firestore
  const sendMessage = async (newMessage) => {
    try {
      await db.collection('chats').add({
        remetente_id: 1, // Replace with the sender's ID
        destinatario_id: 2, // Replace with the recipient's ID
        mensagem: newMessage,
        data_hora: new Date(),
      });

      // Since Firestore provides real-time updates, there's no need to update the state here.
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, fetchMessages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

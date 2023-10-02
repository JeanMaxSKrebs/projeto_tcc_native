import React, { createContext, useState, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';

export const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState({});

  // Initialize Firebase Firestore

  // Function to fetch messages from Firestore
  const fetchMessages = async (id) => {
    try {
      // console.log('id');
      // console.log(id);

      const docRef = firestore().doc(`chats/${id}`).collection('chat');
      const docSnapshot = await docRef.get();
      // console.log('docSnapshot');
      // console.log(docSnapshot);
      const chats = [];

      docSnapshot.forEach((chatDoc) => {
        const chatId = chatDoc.id;
        const chatData = chatDoc.data();
        // console.log('Chat ID:', chatId);
        // console.log('Dados da Chat:', chatData);

        // Adicione os dados do chat a um objeto e inclua o ID
        const chat = {
          id: chatId,
          nome: chatData.nome,
          mensagens: chatData.messages.map((message) => {
            // Converter o campo "sent" para uma string no formato ISO 8601
            const sentISO = message.sent ? message.sent.toDate().toISOString() : null;
            // console.log('sentISO');
            // console.log(sentISO);
            return {
              ...message,
              sent: sentISO,
            };
          }),
        };

        // Adicione o objeto chat ao array de chats
        chats.push(chat);

      });
      // console.log('chats');
      // console.log(chats);
      setMessages(chats);
      return chats;
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

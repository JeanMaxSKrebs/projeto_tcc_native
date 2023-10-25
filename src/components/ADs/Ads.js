import React, { useState } from 'react';
import { View, Button, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AdsPopup from './AdsPopup';
import MeuButtonMetade from '../MeuButtonMetade';
import { COLORS } from '../../assets/colors';

const Ads = ({ id }) => {
    const [isPopupVisible, setPopupVisibility] = useState(true);

    let imageUrl = "https://dqnwahspllvxaxshzjow.supabase.co/storage/v1/object/sign/ads/ifsul_logo.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhZHMvaWZzdWxfbG9nby5qcGVnIiwiaWF0IjoxNjk4MjIyOTQ1LCJleHAiOjE3Mjk3NTg5NDV9.Jpd0HaMCSgQ5bgKq9hA3C3ohT1liBjohExmHoHzN8U8&t=2023-10-25T08%3A35%3A45.182Z";


    if (id === 'matheus') {
        imageUrl = "https://dqnwahspllvxaxshzjow.supabase.co/storage/v1/object/sign/ads/ifsul_logo.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhZHMvaWZzdWxfbG9nby5qcGVnIiwiaWF0IjoxNjk4MjIyOTQ1LCJleHAiOjE3Mjk3NTg5NDV9.Jpd0HaMCSgQ5bgKq9hA3C3ohT1liBjohExmHoHzN8U8&t=2023-10-25T08%3A35%3A45.182Z"
    } else if (id === 'miguel') {
        imageUrl = "https://dqnwahspllvxaxshzjow.supabase.co/storage/v1/object/sign/ads/ifsul_logo.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhZHMvaWZzdWxfbG9nby5qcGVnIiwiaWF0IjoxNjk4MjIyOTQ1LCJleHAiOjE3Mjk3NTg5NDV9.Jpd0HaMCSgQ5bgKq9hA3C3ohT1liBjohExmHoHzN8U8&t=2023-10-25T08%3A35%3A45.182Z"
    }

    const adsData =
    {
        title: id,
        description: `Anúncio do ${id}`,
        image: imageUrl,
    };

    if (!isPopupVisible) {
        return null; // Nã,o renderiza nada se o pop-up não estiver visível
    }

    return (
        <View style={styles.container} >
            {console.log('adsData')}
            {console.log(adsData)}
            <View style={styles.popup}>
                <AdsPopup
                    adsData={adsData}
                />
                <TouchableOpacity onPress={() => setPopupVisibility(false)}
                    style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
};

export default Ads;

const styles = StyleSheet.create({
    container: {
        zIndex: 2,
        position: 'absolute',
        top: 0,
        backgroundColor: COLORS.background,
        width: '100%',
        height: 100,

    },
    popup: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        marginTop: 0,
    },
    closeButton: {
        alignSelf: 'flex-start',
        width: 25,
        height: 25,
        justifyContent: 'center',
        backgroundColor: 'red',
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        textAlign: 'center',
    },
});

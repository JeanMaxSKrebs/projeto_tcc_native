// ImagePicker.js

import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import MeuButtonMetade from '../MeuButtonMetade';
import Texto from '../Texto';
import { COLORS } from '../../assets/colors';


const ImagePicker = ({ onPress }) => {
    const [imageUri, setImageUri] = useState(null);

    const handleLaunchCamera = () => {
        const options = {
            mediaType: 'photo', // Define o tipo de mídia (foto)
            quality: 0.5, // Define a qualidade da imagem (0 a 1)
        };

        launchCamera(options, (response) => {
            console.log('camera');

            console.log(options);
            console.log(response);
            if (response.didCancel) {
                console.log('Usuário cancelou a captura de imagem');
            } else if (response.error) {
                console.log('Erro ao capturar imagem:', response.error);
            } else {
                const selectedImageUri = response.assets[0].uri;
                setImageUri(selectedImageUri);
                // Chame a função de callback com o URI da imagem selecionada
                onPress(selectedImageUri);
            }
        });
    };

    const handleLaunchImageLibrary = () => {
        const options = {
            mediaType: 'photo', // Define o tipo de mídia (foto)
            quality: 0.5, // Define a qualidade da imagem (0 a 1)
        };

        launchImageLibrary(options, (response) => {
            console.log('library');

            console.log(options);
            console.log(response);
            if (response.didCancel) {
                console.log('Usuário cancelou a seleção de imagem');
            } else if (response.error) {
                console.log('Erro ao selecionar imagem:', response.error);
            } else {
                const selectedImageUri = response.assets[0].uri;
                setImageUri(selectedImageUri);
                // Chame a função de callback com o URI da imagem selecionada
                onPress(selectedImageUri);
            }
        });
    };

    const zerar = () => {
        setImageUri(null)
    };

    const renderPlaceholder = (value) => {
        if (value !== '') {
            return <Text style={{
                textAlign: 'left',
                fontSize: 10,
                marginBottom: 1,
                color: 'gray'
            }}>
                {value}
            </Text>

        }
        return null;
    };

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            {/* {console.log('imageUri2')}
            {console.log(imageUri)} */}
            {imageUri !== undefined && imageUri !== null
                ? (
                    <View>
                        <View style={{ width: '65%', marginTop: 10 }}  >
                            {renderPlaceholder(imageUri ? 'Nova Logo' : '')}
                        </View>
                        <Image
                            style={{ width: 200, height: 200 }} source={{ uri: imageUri }}
                        />

                    </View>
                ) : (
                    <View>
                        <Text style={{ width: '65%', marginTop: 10 }} >
                            {renderPlaceholder(imageUri ? 'Nova Logo' : '')}

                        </Text>
                    </View>
                )
            }
            <View style={{ flexDirection: 'row' }}>
                <MeuButtonMetade width={'auto'} cor={COLORS.primaryShadow} texto="Capturar Foto" onClick={handleLaunchCamera}
                />
                <MeuButtonMetade width={'auto'} cor={COLORS.primaryShadow} texto="Selecionar Foto" onClick={handleLaunchImageLibrary}
                />
                {imageUri !== undefined && imageUri !== null &&
                    <MeuButtonMetade width={'auto'} cor={'red'} texto="X"
                        onClick={zerar}
                    />
                }
            </View >

        </View >
    );
};

export default ImagePicker;

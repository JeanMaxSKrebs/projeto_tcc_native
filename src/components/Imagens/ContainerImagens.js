import Swiper from 'react-native-swiper';
import { StyleSheet, Text, Image, View, Modal, Button } from 'react-native';
import { COLORS } from '../../assets/colors';
import styled from 'styled-components/native';
import React, { useEffect, useContext, useState } from 'react';
import MeuButtonMetade from '../MeuButtonMetade';

export const TextPlaceholder = styled.Text`
  /* background-color: red; */
  text-align: center;
  font-size: 18px;
  margin-bottom: 1px;
  color: gray;
`;

const ContainerImagens = ({ listImagens, alterar }) => {

    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    // console.log('listImagens');
    // console.log(listImagens);
    // console.log('alterar');
    // console.log(alterar);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalAction, setModalAction] = useState('');

    const routeImagem = (item) => {
        setModalAction(item);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalAction('')
        setModalVisible(false);
    };

    const handleSlideChange = index => {
        console.log('Slide alterado:', index);
        setActiveSlideIndex(index);
    };

    const CustomPrevButton = () => {
        return <Text style={styles.prevButton}>‹</Text>;
    };

    const CustomNextButton = () => {
        return <Text style={styles.nextButton}>›</Text>;
    };


    const renderPlaceholder = (value) => {
        if (value !== '') {
            return <TextPlaceholder>{value}</TextPlaceholder>;
        }
        return null;
    };

    const AddModal = ({ activeSlideIndex }) => {
        console.log('activeSlideIndex')
        console.log(activeSlideIndex)
        return (
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Adicionar Item</Text>
                    {/* Conteúdo do modal de Adicionar */}
                    {/* TODO adicioar foto*/}
                    <MeuButtonMetade width={'auto'} texto="Fechar" onClick={closeModal} />
                </View>
            </View>
        );
    };

    const UpdateModal = ({ activeSlideIndex }) => {
        console.log('activeSlideIndex')
        console.log(activeSlideIndex)
        return (
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Atualizar Item</Text>
                    {/* Conteúdo do modal de Atualizar */}
                    {/* TODO atualizar foto*/}

                    <MeuButtonMetade width={'auto'} texto="Fechar" onClick={closeModal} />
                </View>
            </View>
        );
    };

    const DeleteModal = ({ activeSlideIndex }) => {
        console.log('activeSlideIndex')
        console.log(activeSlideIndex)
        return (
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Excluir Item</Text>
                    {/* Conteúdo do modal de Excluir */}
                    {/* TODO Excluir foto*/}
                    <MeuButtonMetade width={'auto'} texto="Fechar" onClick={closeModal} />
                </View>
            </View>
        );
    };

    return (
        <View style={[styles.container, { height: alterar ? 400 : 350 }]}>
            <>
                {renderPlaceholder('Salão de Festa')}
                <Swiper
                    index={0}
                    style={styles.wrapper}
                    onIndexChanged={handleSlideChange}
                    showsButtons={true}
                    prevButton={<CustomPrevButton />}
                    nextButton={<CustomNextButton />}>
                    {listImagens.map((image, index) => {
                        return (
                            <>
                                <View style={styles.slide} key={index}>
                                    <Image
                                        source={{ uri: image }}
                                        style={{ width: 300, height: 250, borderRadius: 15 }}
                                    />
                                </View>
                            </>
                        )
                    })}
                </Swiper>
                {alterar && (
                    <View style={styles.buttonModal}>
                        <MeuButtonMetade texto="Adicionar" width={'auto'}
                            onClick={() => routeImagem('Adicionar')} />
                        <MeuButtonMetade texto="Atualizar" width={'auto'}
                            onClick={() => routeImagem('Atualizar')} />
                        <MeuButtonMetade texto="Excluir" cor={'red'} width={'auto'}
                            onClick={() => routeImagem('Excluir')} />
                    </View>
                )}

                <Modal visible={modalVisible} animationType="slide">
                    {console.log('modalVisible')}
                    {console.log(modalVisible)}
                    {console.log('modalAction')}
                    {console.log(modalAction)}
                    {modalAction === 'Adicionar' && (
                        <AddModal activeSlideIndex={activeSlideIndex} />
                    )}
                    {modalAction === 'Atualizar' && (
                        <UpdateModal activeSlideIndex={activeSlideIndex} />
                    )}
                    {modalAction === 'Excluir' && (
                        <DeleteModal activeSlideIndex={activeSlideIndex} />
                    )}
                </Modal>

            </>
        </View>
    )
}

export default ContainerImagens;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        margin: 10,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: COLORS.secundary,

    },
    texto: {
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: COLORS.primaryDark,
    },
    prevButton: {
        color: COLORS.secundary,
        fontSize: 50,
    },
    nextButton: {
        color: COLORS.secundary,
        fontSize: 50,
    },
    wrapper: {
    },

    buttonModal: {
        margin: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },

    slide: {
        alignSelf: 'center',
    },
    edit: {
        marginLeft: 50
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});
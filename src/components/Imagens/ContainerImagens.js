import Swiper from 'react-native-swiper';
import { StyleSheet, Text, Image, View, Modal, ToastAndroid, FlatList } from 'react-native';
import { COLORS } from '../../assets/colors';
import styled from 'styled-components/native';
import React, { useEffect, useContext, useState } from 'react';
import MeuButtonMetade from '../MeuButtonMetade';
import ImagePicker from '../Camera/ImagePicker';
import { SalaoContext } from '../../context/SalaoProvider';
import Texto from '../Texto';

export const TextPlaceholder = styled.Text`
  /* background-color: red; */
  text-align: center;
  font-size: 18px;
  margin-bottom: 1px;
  color: gray;
`;

const ContainerImagens = ({ alterar, salao }) => {

    const [indexCategoriaSelected, setIndexCategoriaSelected] = useState('');
    const [categoriaSelected, setCategoriaSelected] = useState('');
    const [imagem, setImagem] = useState(null);
    const [listImagens, setListImagens] = useState(salao.imagens ? salao.imagens : null);
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    // console.log('listImagens');
    // console.log(listImagens);
    // console.log('alterar');
    // console.log(alterar);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalAction, setModalAction] = useState('');
    const { updateImagem, deleteImagem } = useContext(SalaoContext);

    const showToast = message => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };

    const categorias = [
        'salao',
        'entrada',
        'jardim',
        'area livre',
        'buffet',
        'danca',
        'playground',
        'cozinha',
        'banheiro',
    ]
    const categoriasNome = [
        'Salão',
        'Entrada',
        'Jardim',
        'Área Livre',
        'Buffet',
        'Dança',
        'Playground',
        'Cozinha',
        'Banheiro',
    ]


    const adicionar = () => {
        // listImagens
        // activeSlideIndex
        console.log('listImagens');
        console.log(listImagens);
        console.log('imagem');
        console.log(imagem);
        console.log('categoriaSelected')
        console.log(categoriaSelected)

        const newSalao = {
            id: salao.id,
            nome: salao.nome,
            logo: salao.logo,
            cidade: salao.cidade,
            endereco: salao.endereco,
            descricao: salao.descricao,
            capacidade: salao.capacidade,
            imagens: listImagens,
            newImagem: imagem,
            tipo: categoriaSelected
        };
        console.log('newSalao');
        console.log(newSalao);

        {
            updateImagem(newSalao) ?
                (() => {
                    closeModal();
                    showToast(`Sucesso ao Adicionar Imagem`);
                }
                )
                :
                (() => {
                    closeModal();
                    showToast(`Falha ao Adicionar Imagem`);
                }
                )
        }
    };
    const excluir = () => {
        // console.log('listImagens');
        // console.log(listImagens);
        // console.log('categoriaSelected')
        // console.log(categoriaSelected)
        // console.log('activeSlideIndex')
        // console.log(activeSlideIndex)


        let listImagensCategoria = [...listImagens[categoriaSelected]];
        listImagensCategoria.splice(activeSlideIndex, 1);
        console.log('listImagensCategoria');
        console.log(listImagensCategoria);

        let listImagensNova = listImagens;
        listImagensNova[categoriaSelected] = listImagensCategoria;
        console.log('listImagensNova');
        console.log(listImagensNova);
        // console.log('listImagensAntiga');
        // console.log(listImagensAntiga);

        const newSalao = {
            id: salao.id,
            nome: salao.nome,
            logo: salao.logo,
            cidade: salao.cidade,
            endereco: salao.endereco,
            descricao: salao.descricao,
            capacidade: salao.capacidade,
            imagens: listImagensNova,
            tipo: categoriaSelected
        };
        // console.log('newSalao');
        // console.log(newSalao);
        // console.log('newSalao');
        // console.log(listImagens[categoriaSelected]);
        // console.log(listImagensNova[categoriaSelected]);

        {
            deleteImagem(newSalao) ?
                (() => {
                    closeModal();
                    showToast(`Sucesso ao Excluir Imagem`);
                }
                )
                :
                (() => {
                    closeModal();
                    showToast(`Falha ao Excluir Imagem`);
                }
                )
        }
    };


    const handleImageSelected = (imageUri) => {
        console.log('imageUri');
        console.log(imageUri);
        setImagem(imageUri);
    };

    const routeImagem = (item, categoria, index) => {
        setIndexCategoriaSelected(index);
        setCategoriaSelected(categoria);
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

    const AddModal = () => {
        // console.log('activeSlideIndex')
        // console.log(activeSlideIndex)
        // console.log('categoriaSelected')
        // console.log(categoriaSelected)

        return (
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Adicionar Imagem</Text>
                    <Text style={styles.modalTitle}>{categoriasNome[indexCategoriaSelected]}</Text>
                    {/* Conteúdo do modal de Adicionar */}
                    {/* TODO adicioar foto*/}
                    {imagem !== undefined && imagem !== null &&
                        <View>
                            <View style={{ width: '65%' }} >
                                {renderPlaceholder('Nova Imagem')}
                            </View>
                            <View style={{ borderWidth: 3, borderColor: 'black', borderRadius: 10 }}>
                                <Image
                                    style={{ width: 300, height: 300 }}
                                    source={{ uri: imagem }}
                                    resizeMode="cover"
                                />
                            </View>

                        </View>
                    }
                    <ImagePicker onPress={handleImageSelected} />

                    <MeuButtonMetade width={200} texto="Adicionar"
                        onClick={() => { closeModal(); adicionar(); }} />
                    <MeuButtonMetade texto="Fechar" cor={'red'} width={200}
                        onClick={closeModal} />
                </View>
            </View >
        );
    };

    const DeleteModal = () => {
        console.log('activeSlideIndex')
        console.log(activeSlideIndex)
        console.log('categoriaSelected')
        console.log(categoriaSelected)
        return (
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Excluir Imagem</Text>
                    <Text style={styles.modalTitle}>{categoriasNome[indexCategoriaSelected]}</Text>
                    <View>
                        <View style={{ width: '65%' }} >
                            {renderPlaceholder('Imagem Selecionada')}
                        </View>
                        <View style={{ borderWidth: 3, borderColor: 'black', borderRadius: 10 }}>

                            <Image
                                style={{ width: 300, height: 300 }}
                                source={{ uri: salao.imagens[categoriaSelected][activeSlideIndex] }}
                                resizeMode="cover"
                            />
                        </View>
                    </View>
                    {/* Conteúdo do modal de Excluir */}
                    {/* TODO Excluir foto*/}
                    <MeuButtonMetade width={200} texto="Confirmar Exclusão"
                        onClick={() => { closeModal(); excluir(); }} />
                    <MeuButtonMetade texto="Fechar" cor={'red'} width={200}
                        onClick={closeModal} />
                </View>
            </View>
        );
    };

    return (
        <View style={{ marginBottom: 100 }}>
            <>
                {categorias.map((categoria, indexCategoria) => {
                    // console.log('categoria');
                    // console.log(categoria);
                    // console.log('indexCategoria');
                    // console.log(indexCategoria);
                    return (
                        <>
                            <View style={[styles.container, { height: alterar ? 400 : 350 }]}>

                                {renderPlaceholder(categoriasNome[indexCategoria])}

                                <Swiper
                                    index={0}
                                    style={styles.wrapper}
                                    onIndexChanged={handleSlideChange}
                                    showsButtons={true}
                                    prevButton={<CustomPrevButton />}
                                    nextButton={<CustomNextButton />}
                                >
                                    {salao && salao.imagens[categoria].map((image, index) => {
                                        return (
                                            <>
                                                <View style={styles.slide} key={categoria + index}>
                                                    <Image
                                                        source={{ uri: image }}
                                                        key={categoria + index}
                                                        style={{ width: 280, height: 250, borderRadius: 15 }}
                                                    />
                                                </View>
                                            </>
                                        )
                                    })}

                                </Swiper>
                                {alterar && (
                                    <View style={styles.buttonModal}>
                                        <MeuButtonMetade texto="Adicionar" width={'auto'}
                                            onClick={() => routeImagem('Adicionar', categoria, indexCategoria)} />
                                        <MeuButtonMetade texto="Excluir" cor={'red'} width={'auto'}
                                            onClick={() => routeImagem('Excluir', categoria, indexCategoria)} />
                                    </View>
                                )}
                            </View>
                        </>

                    )
                })}

                <Modal visible={modalVisible} animationType="slide">
                    {/* {console.log('modalVisible')}
                    {console.log(modalVisible)}
                    {console.log('modalAction')}
                    {console.log(modalAction)} */}
                    {modalAction === 'Adicionar' && (
                        <AddModal />
                    )}
                    {modalAction === 'Excluir' && (
                        <DeleteModal />
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
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});
/* eslint-disable react/no-unstable-nested-components */
import React, { useRef, useState } from 'react';
import { View, Image, Text, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { COLORS } from '../../assets/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import MeuButtonMetade from '../../components/MeuButtonMetade';
import MeuButton from '../../components/MeuButton';
import DeleteButton from '../../components/DeleteButton';

const Button = styled.TouchableHighlight`
  width: auto;
  height: auto;
  margin-right: auto;
  flex-direction: row;
  align-items: center;
`;

const Profile = styled.View`
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: auto;
`;

const Div = styled.View`
  background-color: ${COLORS.secundary};
  width: 100%;
  height: auto;
  padding: 10px;
  margin-bottom: 25px;
  border-radius: 30px;
  color: ${COLORS.primary};
`;

const Botao = styled.TouchableHighlight`
  width: auto;
  margin: 10px;
  padding: 0 40px 0 40px;
  border-radius: 30px;
`;
const BotaoOpcao = styled.TouchableHighlight`
  width: auto;
  padding: 0 40px 0 40px;
  background-color: ${({ active }) =>
    active ? COLORS.primary : COLORS.terciary};
  border-radius: 30px;
`;
const Opcoes = styled.View`
  background-color: ${COLORS.terciary};
  align-items: center;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  border-radius: 30px;
`;
const Container = styled.View`
  color: black;
  text-align: center;
  margin-top: 10px;
  align-items: center;
  justify-content: space-between; 
  flex-direction: column;
`;

const TextNome = styled.Text`
  font-size: 25px;
  text-align: justify;
  color: ${COLORS.primary};
  padding-left: 26px;
`;

const TextDescricao = styled.Text`
  font-size: 20px;
  color: ${COLORS.primary};
  padding: 15px;
`;

const TextCapacidade = styled.Text`
  font-size: 20px;
  color: ${COLORS.primary};
  padding: 15px;
`;
const TextCidade = styled.Text`
  font-size: 20px;
  color: ${COLORS.primary};
  padding: 15px;
`;

const Item = ({ item, onPress, onPressAgenda }) => {
  const [activeButton, setActiveButton] = useState('image');
  const [images, setImages] = useState([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);

  console.log('item');
  console.log(item);

  const toggleModal = () => {
    // console.log('me clicou');
    setModalVisible(!isModalVisible);
  };

  const renderModal = (item) => {
    // console.log('item');
    // console.log(item);
    return (
      <Modal transparent={true}>
        <TouchableOpacity onPress={toggleModal} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableWithoutFeedback >
            <View style={{ padding: 10, backgroundColor: COLORS.background, borderRadius: 15, width: '60%', alignItems: 'center' }}>
              <MeuButton onClick={() => { toggleModal(); onPress(); }} texto={'Ver Perfil'} />
              <MeuButton onClick={() => { toggleModal(); onPressAgenda('agenda'); }} texto={'Ver Agenda'} />
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal >
    )
  }

  const handleButtonPress = button => {
    setActiveButton(button);
    // console.log('button');
    // console.log(button);
  };
  /**/

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

  return (
    <>
      <Div>
        <Profile>
          <Button onPress={onPress} underlayColor="transparent">
            <>
              {console.log('item.logo')}
              {console.log(item.logo)}
              {item.logo
                ? (
                  <View>
                    <Image source={{ uri: item.logo }} style={{  borderRadius: 15, width: 60, height: 60 }}
                      onError={() => console.log('Image failed to load')}
                    />
                  </View>)
                : (
                  <Icon
                    name="person-circle-outline"
                    size={60}
                    color={COLORS.primaryDark}
                  />)
              }
              <TextNome>{item.nome}</TextNome>
            </>
          </Button>
          <TouchableOpacity onPress={toggleModal}>
            <Icon name="ellipsis-vertical" size={40} color="black" />
          </TouchableOpacity>
        </Profile>
        {isModalVisible
          ? renderModal(item)
          : null
        }

        {activeButton === 'menu' ? (
          <>
            <Container style={{ height: 300 }}>
              <TextDescricao>{item.descricao}</TextDescricao>
              <TextCidade>Cidade: {item.cidade}</TextCidade>
              <TextCapacidade>Capacidade: {item.capacidade}</TextCapacidade>
              <Botao
                onPress={onPress}
                underlayColor="transparent"
                style={{ backgroundColor: COLORS.primary }}>
                <Text>Ver Perfil</Text>
              </Botao>
            </Container>
          </>
        ) : (
          <Container style={{ height: 300 }}>
            <Swiper
              index={0}
              style={styles.wrapper}
              onIndexChanged={handleSlideChange}
              showsButtons={true}
              prevButton={<CustomPrevButton />}
              nextButton={<CustomNextButton />}>
              {/* {images.map((image, index) => ( */}
              {item.imagens.salao.map((image, index) => {
                // console.log('Image:', image);
                // console.log('index:', index);
                // console.log('item.uid:', item.uid); 
                const uniqueKey = `${item.uid}_${index}`;
                // console.log('uniqueKey:', uniqueKey);

                return (
                  <>
                    <View style={styles.slide} key={uniqueKey}>
                      <Image
                        source={{ uri: image }}
                        key={uniqueKey + image}
                        style={{ width: 280, height: 250, borderRadius: 15 }}
                      />
                    </View>
                  </>
                )
              })}
            </Swiper>
            <Botao
              onPress={onPress}
              underlayColor="transparent"
              style={{ backgroundColor: COLORS.primary }}>
              <Text>Ver Perfil</Text>
            </Botao>
            {/* <Text>Slide Atual: {activeSlideIndex+1}</Text> */}
          </Container>
        )}
        <Opcoes>
          <BotaoOpcao
            onPress={() => handleButtonPress('menu')}
            underlayColor="transparent"
            active={activeButton === 'menu'}>
            <Icon name="menu" size={60} color="black" />
          </BotaoOpcao>
          <BotaoOpcao
            onPress={() => handleButtonPress('image')}
            underlayColor="transparent"
            active={activeButton === 'image'}>
            <Icon name="image" size={60} color="black" />
          </BotaoOpcao>
        </Opcoes>
      </Div>
    </>
  );
};
export default Item;

const styles = {
  prevButton: {
    color: '#FFF34D',
    fontSize: 50,
  },
  nextButton: {
    color: '#FFF34D',
    fontSize: 50,
  },

  container: {
    flex: 1,
  },

  wrapper: {},

  slide: {
    padding: 5,
  },
};

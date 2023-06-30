/* eslint-disable react/no-unstable-nested-components */
import React, {useRef, useState} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import AppIntroSlider from 'react-native-app-intro-slider';
import Swiper from 'react-native-swiper';

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
  margin: 5px;
  border-radius: 30px;
  color: ${COLORS.primary};
`;

const Botao = styled.TouchableHighlight`
  width: auto;
  height: auto;
  /* margin: 0 0 0 0px; */
  padding: 0 40px 0 40px;
  background-color: ${({active}) => active ? COLORS.primary : COLORS.terciary};
  border-radius: 30px;
`;

const Opcoes = styled.View`
  background-color: ${COLORS.terciary};
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: auto;
  justify-content: center;
  border-radius: 30px;
`;
const Container = styled.View`
  color: black;
  text-align: center;
  margin-top: 10px;
  /* padding: 25px; */
  align-items: center;
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
`;

const TextCapacidade = styled.Text`
  font-size: 20px;
  color: ${COLORS.primary};
  margin-left: 5px;
`;
const TextCidade = styled.Text`
  font-size: 20px;
  color: ${COLORS.primary};
  margin-left: 5px;
`;

const Item = ({item, onPress}) => {
  const [activeButton, setActiveButton] = React.useState(null);
  const [images, setImages] = useState([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  /**/

  const handleButtonPress = button => {
    setActiveButton(button);
    console.log('button');
    console.log(button);
  };
  /**/

  const handleSlideChange = index => {
    setActiveSlideIndex(index);
    // console.log('Slide alterado:', index+1);
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
              <Icon
                name="person-circle-outline"
                size={60}
                color={COLORS.primaryDark}
              />
              <TextNome>{item.nome}</TextNome>
            </>
          </Button>
          <Icon name="ellipsis-vertical" size={40} color="black" />
        </Profile>

        {activeButton === 'menu' ? (
          <>
          <Container style={{height: 350}}>
              <TextDescricao>{item.descricao}</TextDescricao>
              <TextCidade>Cidade: {item.cidade}</TextCidade>
              <TextCapacidade>Capacidade: {item.capacidade}</TextCapacidade>
              <Botao
                onPress={onPress}
                underlayColor="transparent"
                style={{backgroundColor: COLORS.primary}}>
                <Text>Visualizar</Text>
              </Botao>
            </Container>
          </>
        ) : (
          <Container style={{height: 350}}>
            <Swiper
              index={0}
              style={styles.wrapper}
              onIndexChanged={handleSlideChange}
              showsButtons={true}
              prevButton={<CustomPrevButton />}
              nextButton={<CustomNextButton />}>
              {/* {images.map((image, index) => ( */}
              {item.imagens.map((image, index) => (
                <>
                  {/* <View style={styles.slide}> */}
                    <Image
                      source={{uri: image}}
                      style={{width: 320, height: 300, borderRadius: 15}}
                    />
                  {/* </View> */}
                </>
              ))}
            </Swiper>
            <Botao
              onPress={onPress}
              underlayColor="transparent"
              style={{backgroundColor: COLORS.primary}}>
              <Text>Visualizar</Text>
            </Botao>
            {/* <Text>Slide Atual: {activeSlideIndex+1}</Text> */}
          </Container>
        )}
        <Opcoes>
          <Botao
            onPress={() => handleButtonPress('menu')}
            underlayColor="transparent"
            active={activeButton === 'menu'}>
            <Icon name="menu" size={60} color="black" />
          </Botao>
          <Botao
            onPress={() => handleButtonPress('image')}
            underlayColor="transparent"
            active={activeButton === 'image'}>
            <Icon name="image" size={60} color="black" />
          </Botao>
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

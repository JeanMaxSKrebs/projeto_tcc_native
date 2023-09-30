/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect, useContext } from 'react';
import { Alert, Button, ToastAndroid } from 'react-native';
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import { Container, FlatList, ContainerImage } from './styles';
import MeuButton from '../../components/MeuButton';
import MeuButtonMetade from '../../components/MeuButtonMetade';
import AnotherButtonMetade from '../../components/AnotherButtonMetade';
import Loading from '../../components/Loading';
import { SaloesContext } from '../../context/SaloesProvider';
import DeleteButton from '../../components/DeleteButton';
import Swiper from 'react-native-swiper';
import { CommonActions } from '@react-navigation/native';

import { COLORS } from '../../assets/colors';
import Voltar from '../../components/Voltar';

const Salao = ({ route, navigation }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [festasRealizadas, setfestasRealizadas] = useState('0');
  const [festasAgendadas, setfestasAgendadas] = useState('0');
  const [id, setId] = useState('');
  const [imagens, setImagens] = useState([]);
  const [logo, setLogo] = useState('');

  const [loading, setLoading] = useState(false);
  const [activeButton, setActiveButton] = React.useState(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // console.log('route');
  // console.log(route);
  console.log(route.params.value);

  const salao = route.params.value

  const voltar = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (route.params.value === null) {
      setNome('');
      setDescricao('');
      setUid('');
      setImagens([]);
      setLogo('');
    } else {
      // console.log(route.params.value);
      setNome(route.params.value.nome);
      setDescricao(route.params.value.descricao);
      setEndereco(route.params.value.endereco)
      setCidade(route.params.value.cidade)
      setCapacidade(route.params.value.capacidade)
      setId(route.params.value.uid);
      setImagens(route.params.value.imagens);
      setLogo(route.params.value.logo);
    }

  }, [route]);

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


  const routeGerenciador = item => {
    // console.log('gerenciador');
    // console.log(item);
    switch (item) {

      case 'Orcar':
        console.log(salao);
        navigation.dispatch(
          CommonActions.navigate({
            name: 'Orcamentos',
            params: { salao: salao, cliente: true }
          }),
        );
        break;
      case 'Conversar':
        navigation.dispatch(
          CommonActions.navigate({
            name: 'Chats',
            params: { salao: salao }
          }),
        );
        break;

      case 'Reservar':
        navigation.dispatch(
          CommonActions.navigate({
            name: 'Reservar',
            params: { salao: salao, cliente: true }
          }),
        );
        break;
      default:
        navigation.dispatch(
          CommonActions.navigate({
            name: 'Manutencao',
            params: { value: item }
          }),
        );
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Voltar texto="Voltar" onClick={() => voltar()} />
      </View>
      <ScrollView>
        <Container>
          <View style={styles.slide}>
            {logo && (
              <Image
                source={{ uri: logo }}
                key={logo}
                style={{ width: 280, height: 250, borderRadius: 15 }}
              />
            )}
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Text style={styles.nome} >{nome}</Text>
            <Text style={styles.descricao} >{descricao}</Text>
            <Text style={styles.endereco}>{endereco}</Text>
            <Text style={styles.cidade}>{cidade}</Text>
            <Text style={styles.capacidade}>Capacidade: {capacidade}</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <MeuButtonMetade texto="Orçar" onClick={() => routeGerenciador('Orcar')} style={{ width: '45%' }} />
            <MeuButtonMetade texto="Reservar" onClick={() => routeGerenciador('Reservar')} style={{ width: '45%' }} />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <MeuButtonMetade texto="Ver Agenda" onClick={() => routeGerenciador('VerAgenda')} style={{ width: '45%' }} />
            <MeuButtonMetade texto="Conversar" onClick={() => routeGerenciador('Conversar')} style={{ width: '45%' }} />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <AnotherButtonMetade prefixo={festasRealizadas} texto="Festas Realizadas" onClick={() => routeGerenciador('TelaReservas')} style={{ width: '45%' }} />
            <AnotherButtonMetade prefixo={festasAgendadas} texto="Festas Agendadas" onClick={() => routeGerenciador('TelaReservas')} style={{ width: '45%' }} />
          </View>
          <ContainerImage>
            <Swiper
              index={0}
              style={styles.wrapper}
              onIndexChanged={handleSlideChange}
              showsButtons={true}
              prevButton={<CustomPrevButton />}
              nextButton={<CustomNextButton />}>
              {/* {images.map((image, index) => ( */}
              {imagens.map((image, index) => (
                <>
                  <View style={styles.slide} key={index}>
                    {logo && (

                      <Image
                        source={{ uri: image }}
                        key={image}
                        style={{ width: 280, height: 250, borderRadius: 15 }}
                      />
                    )}
                  </View>
                </>
              ))}
            </Swiper>
          </ContainerImage>

        </Container>
        {/* {loading && <Loading />} */}
        {/* <AddFloatButton onClick={() => routeSalao(null)} /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Salao;

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
    alignItems: 'center',
  },
};

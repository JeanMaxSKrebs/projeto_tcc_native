import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import Texto from "../Texto";
import { COLORS } from '../../assets/colors';
import Icon from 'react-native-vector-icons/Ionicons';


const ListaItensOrcamentos = ({ itemOrcamento, onPress, direita, icone }) => {
  // console.log('itemteste')
  // console.log(itemOrcamento)

  const [quantidade, setQuantidade] = useState(itemOrcamento.quantidade);
  const [quantidadeMaxima, setQuantidadeMaxima] = useState(itemOrcamento.quantidadeMaxima);

  const [nome, setNome] = useState(itemOrcamento.itens.nome);
  const [descricao, setDescricao] = useState(itemOrcamento.itens.descricao);
  const [imagem, setImagem] = useState(itemOrcamento.itens.imagem);

  const [novoNome, setNovoNome] = useState(itemOrcamento.novoNome);
  const [novaDescricao, setNovaDescricao] = useState(itemOrcamento.novaDescricao);
  const [novaImagem, setNovaImagem] = useState(itemOrcamento.novaImagem);
  return (
    <View>
      {direita ?
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={novaImagem ? { uri: novaImagem } : { uri: imagem }}
            resizeMode="cover"
          />
          <View style={styles.descricao}>
            <Texto tamanho={20} texto={novoNome ? novoNome : nome} />
            <Texto tamanho={14} texto={novaDescricao ? novaDescricao : descricao} />
            <Texto tamanho={14} texto={`Quantidade: ${quantidade}`} />
          </View>
          <View style={styles.quantidade}>
            <TouchableOpacity style={styles.areaButton} onPress={() => onPress(icone)}>
              <View style={styles.buttonPlus}>
                {icone === "atualizar" ? (
                  <Texto tamanho={0} texto={<Icon name="create" color={COLORS.primary} size={35} />}></Texto>
                ) : icone === "adicionar" ? (
                  <Texto tamanho={0} texto={<Icon name="add" color={COLORS.primary} size={35} />}></Texto>
                ) : (
                  <Texto tamanho={0} texto={<Icon name="close" color={COLORS.red} size={35} />}></Texto>
                )
                }
              </View>
            </TouchableOpacity >
          </View>
        </View>
        :
        <View style={styles.container}>
          <View style={styles.quantidade}>
            <TouchableOpacity style={styles.areaButton} onPress={() => onPress(icone)}>
              <View style={styles.buttonPlus}>
                {icone === "atualizar" ? (
                  <Texto tamanho={0} texto={<Icon name="create" color={COLORS.primary} size={35} />}></Texto>
                ) : icone === "adicionar" ? (
                  <Texto tamanho={0} texto={<Icon name="add" color={COLORS.primary} size={35} />}></Texto>
                ) : (
                  <Texto tamanho={0} texto={<Icon name="close" color={COLORS.red} size={35} />}></Texto>
                )
                }
              </View>
            </TouchableOpacity >
          </View>
          <View style={styles.descricao}>
            <Texto tamanho={20} texto={itemOrcamento.novo_nome ? itemOrcamento.novo_nome : itemOrcamento.itens.nome} />
            <Texto tamanho={14} texto={itemOrcamento.nova_descricao ? itemOrcamento.nova_descricao : itemOrcamento.itens.descricao} />
            <Texto tamanho={14} texto={`Quantidade Máxima: ${itemOrcamento.quantidadeMaxima}`} />
          </View>
          <Image
            style={styles.image}
            source={itemOrcamento.nova_imagem ? { uri: itemOrcamento.nova_imagem } : { uri: itemOrcamento.itens.imagem }}
            resizeMode="cover"
          />
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 15,
    borderColor: COLORS.secundary,
    width: '100%',
    height: 100,
    marginBottom: 5,
    alignItems: 'center',
  },
  image: {
    // borderWidth: 2,
    // borderRadius: 15,
    // borderColor: COLORS.secundary,
    width: '25%',
    aspectRatio: 1,
    marginRight: 5,
  },
  descricao: {
    width: '50%',
    justifyContent: 'center'
  },
  quantidade: {
    width: '25%',
  },
  buttonPlus: {
    backgroundColor: COLORS.black,
    borderRadius: 15,
    width: '60%',
    aspectRatio: 1,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  areaButton: {
    // backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },

});

export default ListaItensOrcamentos;



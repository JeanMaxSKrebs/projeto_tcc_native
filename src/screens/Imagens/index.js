import { Image, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { COLORS } from "../../assets/colors";
import MeuButtonMetade from "../../components/MeuButtonMetade";
import Texto from "../../components/Texto";
import Voltar from "../../components/Voltar";
import { View } from "../Orcamento/styles";
import Swiper from "react-native-swiper";
import ContainerImagens from "../../components/Imagens/ContainerImagens";


const Imagens = ({ route, navigation }) => {
    const voltar = () => {
        navigation.goBack();
    };

    const salao = route.params.salao ? route.params.salao : '';

    return (
        <SafeAreaView>
            <ScrollView>
                <Voltar texto="Voltar" onClick={() => voltar()} />
                <View style={styles.container}>
                    {salao && (
                        <>
                            <ContainerImagens alterar={true} salao={salao} />
                        </>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView >
    );
};

export default Imagens;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
});
import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import {
    StyleSheet,
    View,
    ImageBackground,
    Image,
    Text,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}

const Home = () => {
    const navigation = useNavigation();
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [selectedUf, setSelectedUf] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then((response) => {
            if (response.status !== 200) {
                return;
            }
            const ufInitials = response.data.map((uf) => uf.sigla);
            setUfs(ufInitials);
        });
    }, []);

    useEffect(() => {
        if (selectedUf === '0') {
            return;
        }
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then((response) => {
            if (response.status !== 200) {
                return;
            }
            const citiesData = response.data.map((city) => city.nome);
            setCities(citiesData);
        });
    }, [selectedUf]);

    function handleNavigateToPoints() {
        if (!selectedUf || !selectedCity) {
            return;
        }
        navigation.navigate('Points', {
            uf: selectedUf,
            city: selectedCity,
        });
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ImageBackground
                source={require('../../assets/home-background.png')}
                style={styles.container}
                imageStyle={{ width: 274, height: 368 }}
            >
                <View style={styles.main}>
                    <Image source={require('../../assets/logo.png')} />
                    <View>
                        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
                        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <RNPickerSelect
                        value={selectedUf}
                        style={pickerSelectStyles}
                        onValueChange={(value) => setSelectedUf(value)}
                        useNativeAndroidPickerStyle={false}
                        placeholder={{ value: null, label: "Selecione um estado" }}
                        items={ufs.map((uf) => {
                            return {
                                label: uf,
                                value: uf,
                            };
                        })}
                        Icon={() => <Feather style={styles.selectIcon} name="chevron-down" size={24} color="#6C6C80" />}
                    />

                    <RNPickerSelect
                        value={selectedCity}
                        style={pickerSelectStyles}
                        onValueChange={(value) => setSelectedCity(value)}
                        useNativeAndroidPickerStyle={false}
                        placeholder={{ value: null, label: "Selecione uma cidade" }}
                        items={cities.map((city) => {
                            return {
                                label: city,
                                value: city,
                            };
                        })}
                        Icon={() => <Feather style={styles.selectIcon} name="chevron-down" size={24} color="#6C6C80" />}
                    />

                    <RectButton style={styles.button} onPress={handleNavigateToPoints}>
                        <View style={styles.buttonIcon}>
                            <Feather name="arrow-right" color="#FFF" size={24} />
                        </View>
                        <Text style={styles.buttonText}>
                            Entrar
                        </Text>
                    </RectButton>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
        paddingVertical: 8,
        color: '#6C6C80',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
        paddingVertical: 8,
        color: '#6C6C80',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
    },
  
    main: {
        flex: 1,
        justifyContent: 'center',
    },
  
    title: {
        color: '#322153',
        fontSize: 32,
        fontFamily: 'Ubuntu_700Bold',
        maxWidth: 260,
        marginTop: 64,
    },
  
    description: {
        color: '#6C6C80',
        fontSize: 16,
        marginTop: 16,
        fontFamily: 'Roboto_400Regular',
        maxWidth: 260,
        lineHeight: 24,
    },
  
    footer: {},
  
    select: {},

    button: {
        backgroundColor: '#34CB79',
        height: 60,
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 8,
    },
  
    buttonIcon: {
        height: 60,
        width: 60,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    selectIcon: {
        top: 18,
        right: 6
    },
  
    buttonText: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF',
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
    }
});

export default Home;

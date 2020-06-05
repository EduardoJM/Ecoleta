import React, { useEffect, useState } from 'react';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Linking, Image, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import { RectButton } from 'react-native-gesture-handler';
import * as MailComposer from 'expo-mail-composer';
import api from '../../services/api';

interface RouteParams {
    pointId: number;
};

interface Data {
    point: {
        image: string;
        image_url: string;
        name: string;
        email: string;
        whatsapp: string;
        city: string;
        uf: string;
    };
    items: {
        title: string;
    }[];
}

const Detail = () => {
    const [data, setData] = useState<Data>({} as Data);

    const navigation = useNavigation();
    
    const route = useRoute();
    const routeParams = route.params as RouteParams;

    useEffect(() => {
        api.get(`points/${routeParams.pointId}`).then((response) => {
            setData(response.data);
        });
    }, []);
    

    function handleNavigateBack() {
        navigation.goBack();
    }

    function handleComposeMail() {
        MailComposer.composeAsync({
            subject: 'Interesse na coleta de resíduos',
            recipients: [data.point.email],
        });
    }

    function handleWhatsapp() {
        // added the +55 because in the backend and in the web frontend
        // the number format is used as xxaaaaannnn,
        // xx -> DDD
        // aaaaa -> first five digits (original four and the added 9)
        // nnnn -> last four digits
        // and this linking whatsapp:// use the format
        // +region number
        // +region = 55 for brazil
        Linking.openURL(`whatsapp://send?phone=+55${data.point.whatsapp}&text=Tenho interesse em informações sobre coleta de resíduos`);
    }

    if (!data.point) {
        return null;
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Feather name="arrow-left" size={20} color="#34cb79" />
                </TouchableOpacity>

                <Image style={styles.pointImage} source={{ uri: data.point.image_url }} />

                <Text style={styles.pointName}>
                    {data.point.name}
                </Text>

                <Text style={styles.pointItems}>
                    {data.items.map((item) => item.title).join(', ')}
                </Text>

                <View style={styles.address}>
                    <Text style={styles.addressTitle}>Endereço</Text>
                    <Text style={styles.addressContent}>{data.point.city}, {data.point.uf}</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <RectButton style={styles.button} onPress={handleWhatsapp}>
                    <FontAwesome name="whatsapp" size={20} color="#FFF" />
                    <Text style={styles.buttonText}>Whatsapp</Text>
                </RectButton>

                <RectButton style={styles.button} onPress={handleComposeMail}>
                    <Feather name="mail" size={20} color="#FFF" />
                    <Text style={styles.buttonText}>E-mail</Text>
                </RectButton>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
        paddingTop: 20 + Constants.statusBarHeight,
    },
  
    pointImage: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
        borderRadius: 10,
        marginTop: 32,
    },
  
    pointName: {
        color: '#322153',
        fontSize: 28,
        fontFamily: 'Ubuntu_700Bold',
        marginTop: 24,
    },
  
    pointItems: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        lineHeight: 24,
        marginTop: 8,
        color: '#6C6C80'
    },
  
    address: {
        marginTop: 32,
    },
    
    addressTitle: {
        color: '#322153',
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
    },
  
    addressContent: {
        fontFamily: 'Roboto_400Regular',
        lineHeight: 24,
        marginTop: 8,
        color: '#6C6C80'
    },
  
    footer: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#999',
        paddingVertical: 20,
        paddingHorizontal: 32,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    
    button: {
        width: '48%',
        backgroundColor: '#34CB79',
        borderRadius: 10,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
  
    buttonText: {
        marginLeft: 8,
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Roboto_500Medium',
    },
});

export default Detail;

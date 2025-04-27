import { getContatoById } from '@/api/services/contato';
import { useGlobalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';

export default function Detalhes() {
    const local = useGlobalSearchParams();
    const [dados, setDados] = useState<Contato | null>();

    const handleObterDados = async (id: string) => {
        try {
            const data = await getContatoById(id);
            setDados(data);
        } catch (error) {
            Alert.alert("Erro", "Não foi possível encontrar o contato.");
        }
    };


    useEffect(() => {
        console.log(local.id)
        if (typeof local.id == "string")handleObterDados(local.id);
    }, [local]);

    return (
        <View style={styles.container}>
            {dados && <>
                <Image source={{ uri: dados.foto }} style={styles.image} />
            <Text style={styles.text}>Nome: {dados.nome}</Text>
            <Text style={styles.text}>Email: {dados.email}</Text>
            <Text style={styles.text}>Telefone: {dados.telefone}</Text>
            <Text style={styles.text}>Endereço: {dados.endereco}</Text>
            </>}
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
        color: '#333',
    },
});
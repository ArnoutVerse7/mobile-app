import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

export default function ProductCard({ image, name, description }) {
    return (
        <View style={styles.card}>
            <Image source={image} style={styles.image} />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.description}>{description}</Text>
            <Button title="Bekijk" onPress={() => alert(`${name} geselecteerd`)} />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        width: '100%',
        maxWidth: 300,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 8,
        marginBottom: 8,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 8,
        textAlign: 'center',
    },
});

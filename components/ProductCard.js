// Dit component toont één product als een kaartje met afbeelding, naam, beschrijving, prijs en een knop.
// Props: image, name, description, price, onPress
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ProductCard = ({ image, name, description, price, onPress }) => {
    return (
        // Hele kaart is klikbaar
        <TouchableOpacity onPress={onPress} activeOpacity={0.95}>
            <View style={styles.card}>
                {/* Productafbeelding */}
                <Image source={image} style={styles.image} />
                {/* Productnaam */}
                <Text style={styles.name}>{name}</Text>
                {/* Korte beschrijving */}
                <Text style={styles.description}>{description}</Text>
                {/* Prijs */}
                <Text style={styles.price}>€ {price}</Text>
                {/* Shop-knop */}
                <TouchableOpacity
                    onPress={onPress}
                    activeOpacity={0.8}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Shop Product</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 20,
        borderRadius: 10,
        padding: 15,
        backgroundColor: '#f5f5f5',
    },
    image: {
        width: '100%',
        height: 150,
        marginBottom: 10,
        borderRadius: 10,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#222',
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    price: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#ff6f00', // oranje
        paddingVertical: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default ProductCard;
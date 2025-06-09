import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';

const ProductCard = ({ image, name, description, price, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.card}>
                <Image source={image} style={styles.image} />
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.price}>€ {price}</Text>
                <Button title="Bekijk product" onPress={onPress} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 20,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        padding: 15,
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
    },
    description: {
        fontSize: 14,
        marginBottom: 5,
    },
    price: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
    },
});

export default ProductCard;
// This component is used to display a product card with an image, name, description, and price.
// It also includes a button to view the product details, which triggers the onPress function passed as a prop.
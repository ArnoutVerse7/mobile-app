import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ProductCard from '../components/ProductCard';

import kitsImage from '../images/Kits.avif';
import retroImage from '../images/Retro.webp';
import trainingImage from '../images/training.webp';

const products = [
    {
        name: 'Kits',
        description: 'These are our kits.',
        price: 49.99,
        image: kitsImage,
    },
    {
        name: 'Retro Kits',
        description: 'Retro Kits from everywhere.',
        price: 59.99,
        image: retroImage,
    },
    {
        name: 'Training Gear',
        description: 'Find the training gear for you.',
        price: 39.99,
        image: trainingImage,
    },
];

const HomeScreen = ({ navigation }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Onze Producten</Text>
            {products.map((product, index) => (
                <ProductCard
                    key={index}
                    image={product.image}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    onPress={() =>
                        navigation.navigate('ProductDetails', { product })
                    }
                />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default HomeScreen;

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

const ProductDetails = ({ route }) => {
    const { product } = route.params;
    const [quantity, setQuantity] = useState(1);

    const increase = () => setQuantity(quantity + 1);
    const decrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const unitPrice = Number(product.price) || 0;
    const totalPrice = (unitPrice * quantity).toFixed(2);

    return (
        <View style={styles.container}>
            {product.image?.uri && (
                <Image source={product.image} style={styles.image} />
            )}

            <Text style={styles.name}>{product.name || product.title}</Text>
            <Text style={styles.description}>{product.description || product.subtitle}</Text>
            <Text style={styles.price}>€ {unitPrice.toFixed(2)}</Text>

            <View style={styles.quantityContainer}>
                <Button title="-" onPress={decrease} />
                <Text style={styles.quantity}>{quantity}</Text>
                <Button title="+" onPress={increase} />
            </View>

            <Text style={styles.total}>Totaal: € {totalPrice}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 20,
        borderRadius: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    description: {
        marginVertical: 10,
        fontSize: 16,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        justifyContent: 'space-between',
        width: 150,
    },
    quantity: {
        fontSize: 18,
        marginHorizontal: 10,
    },
    total: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default ProductDetails;

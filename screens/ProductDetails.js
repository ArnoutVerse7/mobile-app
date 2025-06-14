// Dit scherm toont de details van één product en laat toe het aantal te kiezen en toe te voegen aan het winkelmandje.
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { CartContext } from '../components/CartContext';

const ProductDetails = ({ route }) => {
    // Haal het product op uit de route parameters
    const { product } = route.params;
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useContext(CartContext);

    // Verhoog/verlaag het aantal
    const increase = () => setQuantity(quantity + 1);
    const decrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    // Prijsberekening
    const unitPrice = Number(product.price) || 0;
    const totalPrice = (unitPrice * quantity).toFixed(2);

    // Voeg toe aan winkelmandje
    const handleAddToCart = () => {
        addToCart({ ...product, quantity });
    };

    return (
        <View style={styles.container}>
            {/* Productafbeelding */}
            {product.image?.uri && (
                <Image source={product.image} style={styles.image} />
            )}

            {/* Productnaam, beschrijving, prijs */}
            <Text style={styles.name}>{product.name || product.title}</Text>
            <Text style={styles.description}>{product.description || product.subtitle}</Text>
            <Text style={styles.price}>€ {unitPrice.toFixed(2)}</Text>

            {/* Kies aantal */}
            <View style={styles.quantityContainer}>
                <TouchableOpacity style={styles.orangeButton} onPress={decrease}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantity}</Text>
                <TouchableOpacity style={styles.orangeButton} onPress={increase}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>

            {/* Totaalprijs en knop */}
            <Text style={styles.total}>Total: € {totalPrice}</Text>
            <TouchableOpacity style={styles.addCartButton} onPress={handleAddToCart}>
                <Text style={styles.buttonText}>Add to cart</Text>
            </TouchableOpacity>
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
    orangeButton: {
        backgroundColor: '#FF8800',
        padding: 5,
        borderRadius: 8,
        minWidth: 30,
        alignItems: 'center',
    },
    addCartButton: {
        backgroundColor: '#FF8800',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
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
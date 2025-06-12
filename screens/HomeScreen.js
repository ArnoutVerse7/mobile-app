import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import ProductCard from '../components/ProductCard';

const HomeScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://api.webflow.com/v2/sites/67abaae39a449d1e22641632/products', {
            headers: {
                Authorization: 'Bearer 6c24c294fbecdcd14e5e2e3ca88426e33c74de20ffef2f561946cdb6f22b8398',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                const formatted = data.items.map((item) => {
                    const productData = item.product.fieldData;
                    const skuData = item.skus[0].fieldData;

                    return {
                        id: item.product.id,
                        name: productData.name,
                        description: productData.description,
                        price: (skuData.price.value / 100).toFixed(2),
                        image: { uri: skuData['main-image'].url },
                    };
                });
                setProducts(formatted);
            })
            .catch((error) => {
                console.error('Fout bij ophalen:', error);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#1e88e5" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
            <Text style={styles.title}>Our shirts</Text>
            <View style={styles.cardList}>
                {products.map((product, index) => (
                    <ProductCard
                        key={product.id || index}
                        image={product.image}
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        onPress={() =>
                            navigation.navigate('ProductDetails', { product })
                        }
                    />
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        backgroundColor: '#f2f2f2',
    },
    container: {
        padding: 16,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 24,
        color: '#333',
    },
    cardList: {
        gap: 20,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
        backgroundColor: '#f2f2f2',
    },
});

export default HomeScreen;

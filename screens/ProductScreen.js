import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import ProductCard from '../components/ProductCard';

const ProductScreen = ({ navigation }) => {
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
                console.error('Fout bij ophalen producten:', error);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Our shirts</Text>
            {products.map((product, index) => (
                <ProductCard
                    key={product.id || index}
                    image={product.image}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    onPress={() => navigation.navigate('ProductDetails', { product })}
                />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    header: { fontSize: 22, fontWeight: 'bold', marginVertical: 15 },
});

export default ProductScreen;

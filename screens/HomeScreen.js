import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import ProductCard from '../components/ProductCard';
import BlogCard from '../components/BlogCard'; // Zorg dat je deze component hebt

const HomeScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch('https://api.webflow.com/v2/sites/67abaae39a449d1e22641632/products', {
                headers: {
                    Authorization: 'Bearer 6c24c294fbecdcd14e5e2e3ca88426e33c74de20ffef2f561946cdb6f22b8398',
                },
            }).then(res => res.json()),
            fetch('https://api.webflow.com/v2/collections/67bcb99cd183ebc0de35724c/items', {
                headers: {
                    Authorization: 'Bearer efe35a4eb52c2a8a8e51245f7aee31004a283a3cbcf9ca75f750c77df5a06a35',
                },
            }).then(res => res.json()),
        ])
            .then(([productData, blogData]) => {
                const formattedProducts = productData.items.map(item => ({
                    id: item.product.id,
                    title: item.product.fieldData.name,
                    subtitle: item.product.fieldData.description,
                    price: ((item.skus[0]?.fieldData.price.value || 0) / 100).toFixed(2),
                    image: { uri: item.skus[0]?.fieldData['main-image']?.url },
                }));
                const formattedBlogs = blogData.items.map(item => ({
                    id: item._id,
                    title: item.fieldData.name,
                    content: item.fieldData['maintext'],
                    image: item.fieldData['evoshirts']?.url,
                }));
                setProducts(formattedProducts.slice(0, 2)); // alleen eerste 2
                setBlogs(formattedBlogs.slice(0, 2));
            })
            .catch(err => console.error('Fout bij ophalen homepage data:', err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Our shirts</Text>
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    image={product.image}
                    name={product.title}
                    description={product.subtitle}
                    price={product.price}
                    onPress={() => navigation.navigate('ProductDetails', { product })}
                />
            ))}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Products')}>
                <Text style={styles.buttonText}>Shop more</Text>
            </TouchableOpacity>

            <Text style={styles.header}>Latest blog posts</Text>
            {blogs.map((post, index) => (
                <BlogCard
                    key={post.id || index}
                    title={post.title}
                    image={post.image}
                    onPress={() => navigation.navigate('Blogs')}
                />
            ))}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Blogs')}>
                <Text style={styles.buttonText}>Read more</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    header: { fontSize: 22, fontWeight: 'bold', marginVertical: 15 },
    button: {
        backgroundColor: '#FF6F00',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default HomeScreen;

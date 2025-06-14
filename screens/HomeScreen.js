// Dit is het startscherm van de app met een hero-afbeelding, een overzicht van producten en blogs.
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Image, Dimensions } from 'react-native';
import ProductCard from '../components/ProductCard';
import BlogCard from '../components/BlogCard';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = ({ navigation }) => {
    // State voor producten, blogs en laden
    const [products, setProducts] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Haal producten en blogs op uit de API
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
                // Formatteer producten en blogs
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
                setProducts(formattedProducts.slice(0, 2));
                setBlogs(formattedBlogs.slice(0, 2));
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Hero Section */}
            <View style={styles.hero}>
                <Image
                    source={require('../images/banner.png')}
                    style={styles.heroImage}
                    resizeMode="cover"
                />
                {/* Overlay en tekst over de afbeelding */}
                <View style={styles.heroOverlay} />
                <View style={styles.heroTextContainer}>
                    <Text style={styles.heroTitle}>Welcome to Football Shirt Shop</Text>
                    <Text style={styles.heroSubtitle}>Discover the latest shirts and blogs!</Text>
                </View>
            </View>

            {/* Overzicht van producten */}
            <Text style={styles.header}>Our Shirts</Text>
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

            {/* Overzicht van blogs */}
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
    hero: {
        width: '100%',
        height: 160,
        marginBottom: 25,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    heroImage: {
        width: screenWidth - 40, // Volledige breedte binnen de padding
        height: 160,
        borderRadius: 16,
    },
    heroOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: screenWidth - 40,
        height: 160,
        borderRadius: 16,
        backgroundColor: 'rgba(0,0,0,0.25)',
    },
    heroTextContainer: {
        position: 'absolute',
        width: screenWidth - 40,
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    heroTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },
    heroSubtitle: {
        fontSize: 15,
        color: '#fff',
        textAlign: 'center',
        marginTop: 4,
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },
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
// Dit scherm toont de details van één blogpost.
import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';

const BlogDetails = ({ route }) => {
    // Haal de blogpost op uit de route parameters
    const { post } = route.params;

    // Verwijder alle HTML-tags zoals <li>, <p>, etc.
    const plainText = post.content.replace(/<[^>]+>/g, '');

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Blogafbeelding */}
            {post.image && <Image source={{ uri: post.image }} style={styles.image} />}
            {/* Titel en inhoud */}
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.content}>{plainText}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    image: { width: '100%', height: 250, borderRadius: 10, marginBottom: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    content: { fontSize: 16, lineHeight: 24 },
});

export default BlogDetails;
// Dit component toont een blog als een kaartje met afbeelding en titel.
// Props: title, image, onPress
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const BlogCard = ({ title, image, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            {/* Blogafbeelding */}
            {image && <Image source={{ uri: image }} style={styles.image} />}
            {/* Blogtitel */}
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: { marginBottom: 20 },
    image: { width: '100%', height: 200, borderRadius: 10 },
    title: { fontSize: 18, fontWeight: '600', marginTop: 10 },
});

export default BlogCard;
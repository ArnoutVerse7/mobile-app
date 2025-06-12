import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

const BlogScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.webflow.com/v2/collections/67bcb99cd183ebc0de35724c/items", {
      headers: {
        Authorization: "Bearer efe35a4eb52c2a8a8e51245f7aee31004a283a3cbcf9ca75f750c77df5a06a35",
        Accept: "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        const formatted = data.items.map(item => ({
          id: item._id,
          title: item.fieldData.name,
          content: item.fieldData["rich-text"], // pas aan als jouw veld anders heet
          image: item.fieldData["main-image"]?.url,
        }));
        setPosts(formatted);
      })
      .catch(err => console.error("Fout bij ophalen blogs:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Onze Blogposts</Text>
      {posts.map(post => (
        <TouchableOpacity
          key={post.id}
          style={styles.card}
          onPress={() => navigation.navigate("BlogDetails", { post })}
        >
          {post.image && <Image source={{ uri: post.image }} style={styles.image} />}
          <Text style={styles.title}>{post.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  card: { marginBottom: 20 },
  image: { width: "100%", height: 200, borderRadius: 10 },
  title: { fontSize: 18, fontWeight: "600", marginTop: 10 },
});

export default BlogScreen;
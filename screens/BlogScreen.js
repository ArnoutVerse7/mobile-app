import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import BlogCard from '../components/BlogCard';

const BlogScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.webflow.com/v2/collections/67bcb99cd183ebc0de35724c/items", {
      headers: {
        Authorization: "Bearer efe35a4eb52c2a8a8e51245f7aee31004a283a3cbcf9ca75f750c77df5a06a35",
      },
    })
      .then(res => res.json())
      .then(data => {
        const formatted = data.items.map(item => ({
          id: item._id,
          title: item.fieldData.name,
          content: item.fieldData["maintext"],
          image: item.fieldData["evoshirts"]?.url,
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
      <Text style={styles.header}>Our Blogs</Text>
      {posts.map((post, index) => (
        <View key={post.id || index} style={styles.cardSpacing}>
          <BlogCard
            title={post.title}
            image={post.image}
            onPress={() => navigation.navigate('BlogDetails', { post })}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40, // extra ruimte onderaan
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cardSpacing: {
    marginBottom: 28, // ruimte tussen blogkaarten
  },
});

export default BlogScreen;

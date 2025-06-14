// Dit scherm toont een lijst van blogs met zoek- en sorteerfunctie.
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import BlogCard from '../components/BlogCard';

const BlogScreen = ({ navigation }) => {
  // State voor blogs, laden, zoeken en sorteren
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  // Haal blogs op uit de API
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
          date: item.fieldData["date"] || item["updated-on"] || item["created-on"],
        }));
        setPosts(formatted);
      })
      .catch(err => console.error("Fout bij ophalen blogs:", err))
      .finally(() => setLoading(false));
  }, []);

  // Filter en sorteer blogs
  const filteredPosts = posts
    .filter(post =>
      post.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortAsc) {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Our Blogs</Text>
      {/* Zoekbalk */}
      <TextInput
        style={styles.search}
        placeholder="Search blogs..."
        value={search}
        onChangeText={setSearch}
      />
      {/* Sorteerknoppen */}
      <View style={styles.sortRow}>
        <Text style={styles.sortLabel}>Sort:</Text>
        <TouchableOpacity
          style={[
            styles.sortBtn,
            sortAsc && styles.sortBtnActive
          ]}
          onPress={() => setSortAsc(true)}
        >
          <Text style={{ color: sortAsc ? '#fff' : '#ff6a00', fontWeight: '500' }}>A → Z</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.sortBtn,
            !sortAsc && styles.sortBtnActive
          ]}
          onPress={() => setSortAsc(false)}
        >
          <Text style={{ color: !sortAsc ? '#fff' : '#ff6a00', fontWeight: '500' }}>Z → A</Text>
        </TouchableOpacity>
      </View>
      {/* Toon de gefilterde blogs */}
      {filteredPosts.map((post, index) => (
        <View key={post.id || index} style={styles.cardSpacing}>
          <BlogCard
            title={post.title}
            image={post.image}
            onPress={() => navigation.navigate('BlogDetails', { post })}
          />
        </View>
      ))}
      {filteredPosts.length === 0 && (
        <Text style={{ textAlign: 'center', marginTop: 30, color: '#888' }}>No blogs found.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 15,
    marginBottom: 20,
  },
  search: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  sortLabel: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  sortBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginLeft: 8,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ff6a00',
  },
  sortBtnActive: {
    backgroundColor: '#ff6a00',
    borderColor: '#ff6a00',
  },
  cardSpacing: {
    marginBottom: 28,
  },
});

export default BlogScreen;
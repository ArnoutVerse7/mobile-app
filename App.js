import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ProductCard from './components/ProductCard';

// ✅ Lokale afbeeldingen importeren
import kitsImage from './images/Kits.avif';
import retroImage from './images/Retro.webp';
import trainingImage from './images/training.webp';

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Onze Producten</Text>
      <ProductCard 
        image={kitsImage}
        name="Kits"
        description="These are our kits."
      />
      <ProductCard 
        image={retroImage}
        name="Retro Kits"
        description="Retro Kits from everywhere."
      />
      <ProductCard 
        image={trainingImage}
        name="Training Gear"
        description="Find the training gear for you."
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';

const AboutUsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>About us</Text>
      <Text style={styles.paragraph}>
        Welcome to Football Shirt Shop – the place for football fans looking for unique, stylish and often
        legendary football shirts. From the heart of Belgium, we collect the finest shirts from all over the world,
        from retro classics to modern top designs.
      </Text>

      <Text style={styles.subheader}>What we do and why</Text>
      <Text style={styles.paragraph}>
        Our mission is simple: to give football fans a place to show their passion not just in the stadium but in their
        personal style.
      </Text>
      <Text style={styles.paragraph}>
        We believe that a football shirt is more than sportswear – it’s identity, emotion, and history.
      </Text>
      <Text style={styles.paragraph}>
        We consciously choose quality, authenticity and a varied range:
        {"\n"}- Vintage shirts with a story
        {"\n"}- New releases from top clubs
        {"\n"}- Limited editions and rare finds
        {"\n"}Every fan deserves a shirt that truly fits them.
      </Text>

      <Text style={styles.subheader}>A Belgian project, born from passion</Text>
      <Text style={styles.paragraph}>
        Football Shirt Shop started as a hobby by two friends from Antwerp who loved football and retro shirts.
        What began with collecting shirts from the 90s quickly grew into a webshop for other fans. Today, we ship
        shirts all across Belgium and far beyond.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 35, // toegevoegd voor dezelfde spacing als andere schermen
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subheader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
    color: '#333',
  },
});

export default AboutUsScreen;
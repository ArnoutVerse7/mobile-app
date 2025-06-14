// Dit scherm geeft informatie over het bedrijf en de oprichter.
import React from 'react';
import { ScrollView, Text, StyleSheet, View, Image } from 'react-native';

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

      <Text style={styles.subheader}>Who we are</Text>
      <View style={styles.profileContainer}>
        <Image
          source={require('../images/avatar.png')}
          style={styles.avatar}
        />
        <View style={styles.profileText}>
          <Text style={styles.name}>Arnout Versé - Founder</Text>
          <Text style={styles.bio}>
            Full-time football fanatic and shirt collector. Passionate about vintage kits, football history, and Belgian club culture.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 35,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 26,
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
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    padding: 12,
    borderRadius: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  profileText: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  bio: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
});

export default AboutUsScreen;
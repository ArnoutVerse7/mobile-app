// Dit scherm toont een gebruikersprofiel met naam, foto en korte info.
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ProfileScreen = () => {
  const handleSettingsPress = () => {
    // Hier kun je eventueel navigeren naar instellingen
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleSettingsPress}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Profielfoto */}
      <Image
        source={require('../images/avatar.png')}
        style={styles.avatar}
      />
      {/* Naam en rol */}
      <Text style={styles.name}>Arnout Versé</Text>
      <Text style={styles.role}>Founder of Football Shirt Shop</Text>

      {/* Over mij */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.text}>
          Full-time football fanatic and shirt collector. Passionate about vintage kits, football history, and Belgian club culture.
        </Text>
        <View style={styles.personalInfo}>
          <Text style={styles.text}> Zaventem, Belgium</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
    position: 'relative',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontWeight: 'bold',
    color: '#6A1B9A',
  },
  settingsIcon: {
    fontSize: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginVertical: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  role: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 18,
  },
  text: {
    fontSize: 16,
    color: '#444',
    lineHeight: 20,
  },
  personalInfo: {
    marginTop: 12,
  },
});

export default ProfileScreen;
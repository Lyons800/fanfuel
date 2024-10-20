import React, { useState } from 'react';
import { View, TextInput, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AthleteCard from '@/components/home/athleteCard';
import athletes from '@/components/home/athletes.json'; // Import athletes data

// Create a mapping of image names to require statements
const imageMap = {
  'player1.png': require('@/assets/images/player1.png'),
  'player2.png': require('@/assets/images/player2.png'),
  'player3.png': require('@/assets/images/player3.png'),
  'player4.png': require('@/assets/images/player4.png'),
  'player5.png': require('@/assets/images/player5.png'),
};

export default function TabTwoScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAthletes = athletes.filter(athlete =>
    athlete.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    athlete.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
      <TextInput
        style={styles.searchBar}
        placeholder="Search athletes..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredAthletes}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <AthleteCard
            id={item.id.toString()}
            name={item.name}
            sport={item.sport}
            university={item.university}
            imageUrl={imageMap[item.imageName as keyof typeof imageMap]} // Use the imageMap to get the image source
            tags={item.tags}
            bio={item.bio}
          />
        )}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  searchBar: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
});

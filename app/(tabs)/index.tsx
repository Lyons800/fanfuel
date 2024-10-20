import { Image, StyleSheet, Platform, View, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import TopSection from '@/components/home/topSection';
import SupportedAthletes from '@/components/home/supportedAthletes';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView>
      {/* Cards Section */}
      <TopSection />
      <SupportedAthletes />
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionContainer: {
    marginBottom: 24,
    paddingHorizontal: 16,
    gap: 16,

  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  fullCard: {
    height: 100, // Adjust height as needed
    marginBottom: 16,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32, // Increase spacing between rows
  },
  halfCard: {
    width: '48%', // Adjust width to fit two cards in a row
    height: 100, // Adjust height as needed
    backgroundColor: '#e0e0e0', // Example background color
    borderWidth: 1, // Add border
    borderColor: '#ccc', // Border color
    borderRadius: 8, // Optional: round the corners
    padding: 10, // Add padding inside the card
  },
  gradientCard: {
    height: 100,
    width: '100%',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
  },
  cardContent: {
    // Add styles for the card content here
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
  },
  cardAmount: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  button: {
    // Add styles for the button here
  },
  buttonText: {
    // Add styles for the button text here
  },
});

import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { useReactiveClient } from "@dynamic-labs/react-hooks";
import { TouchableOpacity } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet'; // Import the useActionSheet hook
import { Button } from 'react-native'; // Import the Button component
import { View } from 'react-native';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { dynamicClient } from '@/client';
import LoginScreen from '../loginScreen';
import { ThemedText } from '@/components/ThemedText';
import { useTokenBalances } from "@dynamic-labs/sdk-react-core";


export default function TabLayout() {
  const { auth, sdk, wallets } = useReactiveClient(dynamicClient); // Destructure wallets from useReactiveClient
  const colorScheme = useColorScheme();
  const { showActionSheetWithOptions } = useActionSheet(); // Destructure the showActionSheetWithOptions function
  const router = useRouter(); // Initialize the router


  const handleAvatarPress = () => {

    router.push({ pathname: '/user' });

  }


  if (!sdk.loaded) {
    return <ThemedText>Loading...</ThemedText>;
  }

  if (!auth.token) {
    return <LoginScreen />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        headerTitle: '', // Set headerTitle to an empty string to remove the default page name
        headerStyle: {
          height: 120, // Adjust the height to make the header bigger
        },
        headerLeft: () => (
          <ThemedText style={{ marginLeft: 10, fontSize: 22, fontFamily: 'LondrinaSolid' }}>
            Welcome back, {auth.authenticatedUser?.firstName || 'Guest'}
          </ThemedText>
        ),
        headerRight: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
            <TouchableOpacity onPress={() => {/* Handle notifications */ }}>
              <TabBarIcon name="notifications" color={Colors[colorScheme ?? 'light'].tint} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAvatarPress} style={{ marginLeft: 10 }}>
              <TabBarIcon name="person" color={Colors[colorScheme ?? 'light'].tint} />
            </TouchableOpacity>
          </View>
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

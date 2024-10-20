import { Tabs } from 'expo-router';
import React from 'react';
import { useReactiveClient } from "@dynamic-labs/react-hooks";
import { TouchableOpacity } from 'react-native';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { dynamicClient } from '@/client';
import LoginScreen from '../loginScreen';
import { ThemedText } from '@/components/ThemedText';

export default function TabLayout() {
  const { auth, sdk, } = useReactiveClient(dynamicClient);
  const colorScheme = useColorScheme();

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
        headerShown: true, // Enable header
        headerRight: () => (
          <TouchableOpacity onPress={dynamicClient.auth.logout}>
            <ThemedText style={{ marginRight: 10 }}>Logout</ThemedText>
          </TouchableOpacity>
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

import { Tabs } from 'expo-router';
import React from 'react';
import { useReactiveClient } from "@dynamic-labs/react-hooks";
import { TouchableOpacity } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet'; // Import the useActionSheet hook
import { Button } from 'react-native'; // Import the Button component

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


  const handleAvatarPress = () => {
    const options = ['View Profile', 'Logout', 'Cancel'];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // Handle 'View Profile' action
        } else if (buttonIndex === 1) {
          // Handle 'Logout' action
        }
      }
    );
  };

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
        headerRight: () => (
          <Button
            onPress={() => dynamicClient.auth.logout()} // Use the logout function directly
            title="Logout" // Set the button title
            color={Colors[colorScheme ?? 'light'].tint} // Set the button color
          />
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

import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { useReactiveClient } from "@dynamic-labs/react-hooks";
import { TouchableOpacity } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet'; // Import the useActionSheet hook
import { Button } from 'react-native'; // Import the Button component
import { View } from 'react-native';
import { Image } from 'react-native';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { dynamicClient } from '@/client';
import LoginScreen from '../loginScreen';
import { ThemedText } from '@/components/ThemedText';
import { useTokenBalances } from "@dynamic-labs/sdk-react-core";
import DashboardIcon from '@/components/dashboardIcon';
import Explore from '@/components/explore';
import Rewards from '@/components/rewards';
import StarsIcon from '@/components/rewards';
import ExploreIcon from '@/components/explore';


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
              <Image
                source={require('../../assets/images/noun5.png')} // Use the nouns5 PNG for the avatar
                style={{ width: 30, height: 30 }} // Adjust the size as needed
              />
            </TouchableOpacity>
          </View>
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <DashboardIcon /> // Use HomeIcon component
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <DashboardIcon /> // Use ExploreIcon component
          ),
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: 'Rewards',
          tabBarIcon: ({ color, focused }) => (
            <DashboardIcon /> // Use RewardsIcon component
          ),
        }}
      />
    </Tabs>
  );
}

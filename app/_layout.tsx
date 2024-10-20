import { DarkTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { createAppKit, defaultConfig, AppKit } from '@reown/appkit-ethers-react-native';
import '@walletconnect/react-native-compat';

import 'react-native-get-random-values';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// AppKit configuration
const projectId = '5772c478f97c3874c05202edcc39fae8'; // Replace with your actual project ID
const metadata = {
  name: 'AppKit RN',
  description: 'AppKit RN Example',
  url: 'https://reown.com/appkit',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
  redirect: {
    native: 'YOUR_APP_SCHEME://', // Replace with your app's scheme
  },
};

const config = defaultConfig({ metadata });

const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com',
};

const polygon = {
  chainId: 137,
  name: 'Polygon',
  currency: 'MATIC',
  explorerUrl: 'https://polygonscan.com',
  rpcUrl: 'https://polygon-rpc.com',
};

const chains = [mainnet, polygon];

createAppKit({
  projectId,
  chains,
  config,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    LondrinaSolid: require('../assets/fonts/Londrina_Solid/LondrinaSolid-Regular.ttf'),
    LondrinaSolidLight: require('../assets/fonts/Londrina_Solid/LondrinaSolid-Light.ttf'),
    LondrinaSolidBlack: require('../assets/fonts/Londrina_Solid/LondrinaSolid-Black.ttf'),
    LondrinaSolidThin: require('../assets/fonts/Londrina_Solid/LondrinaSolid-Thin.ttf'),
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'tomato',
      secondary: 'yellow',
    },
  };

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <PaperProvider theme={theme}>
        {/* <dynamicClient.reactNative.WebView /> */}
        {/* <AppKit /> Add AppKit component here */}

        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="athleteDetail" options={{ presentation: 'modal', headerShown: false }} />
          <Stack.Screen name="user" options={{ presentation: 'modal', headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </PaperProvider>
    </>
  );
}

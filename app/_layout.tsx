import { DarkTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

import { useColorScheme } from '@/hooks/useColorScheme';
import { dynamicClient } from '@/client';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

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
        <dynamicClient.reactNative.WebView />

        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="athleteDetail" options={{ presentation: 'modal', headerShown: false, }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </PaperProvider>
    </>
  );
}

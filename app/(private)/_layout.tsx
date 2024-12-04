import React from 'react';
import { Text } from 'tamagui';
import { Stack } from 'expo-router/stack';
export { ErrorBoundary } from 'expo-router';
import { useColorScheme } from 'nativewind';

import { useStackScreenOptions } from '@config/screens';

import { getBgColor } from '@utils/styles';
import { isAndroid } from '@utils/platform';

export default function Layout() {
  const { colorScheme } = useColorScheme();

  const colorBg = getBgColor(colorScheme);

  const detailConfig = useStackScreenOptions({
    headerTitle: (
      <Text className="cd-text-primary cd-text-lg dark:cd-text-primary-dark">Detail</Text>
    ),
  });

  return (
    <React.Fragment>
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: colorBg,
          },
          statusBarHidden: isAndroid ? false : undefined,
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="detail/[id]" options={detailConfig} />
      </Stack>
    </React.Fragment>
  );
}

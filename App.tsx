import { TamaguiProvider } from '@tamagui/core';
import config from './tamagui.config';

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useColorScheme } from 'react-native';
import './gesture-handler';
import RootNavigator from './src/navigation/root-navigation';

function App() {
  const queryClient = new QueryClient();
  const colorScheme = useColorScheme();

  return (
    <TamaguiProvider config={config} defaultTheme={colorScheme!}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <QueryClientProvider client={queryClient}>
          <RootNavigator />
        </QueryClientProvider>
      </ThemeProvider>
    </TamaguiProvider>
  );
}

export default App;

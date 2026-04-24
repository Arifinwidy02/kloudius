/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
  // useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { RootNavigations } from './src/navigation/rootNavigations';
import { AuthProvider } from './src/context/AuthContext';
import { ToastProvider } from './src/context/ToastContext';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <AuthProvider>
      <ToastProvider>
        <SafeAreaProvider>
          <PaperProvider>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <NavigationContainer>
              <RootNavigations />
            </NavigationContainer>
          </PaperProvider>
        </SafeAreaProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;

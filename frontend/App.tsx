import { RecoilRoot } from 'recoil';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootApp } from './src/RootApp';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useEffect } from 'react';
import { LogBox } from 'react-native';

const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootApp />
          <Toast></Toast>
        </NavigationContainer>
      </SafeAreaProvider>
    </RecoilRoot>
  );
};

export default App;

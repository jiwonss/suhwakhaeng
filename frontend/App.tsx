import { RecoilRoot } from 'recoil';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootApp } from './src/RootApp';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { View, Text } from 'react-native';

const App = () => {
  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootApp />
        </NavigationContainer>
      </SafeAreaProvider>
    </RecoilRoot>
  );
};

export default App;

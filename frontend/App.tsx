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
          <Toast
            // Toast 스타일 지정 ,, type이 success, info 등 있음 
            // config={{
            //   success: ({ text1, ...rest }) => (
            //     <View style={{ backgroundColor: 'green', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 8 }}>
            //       <Text style={{ color: 'white' }}>{text1}</Text>
            //     </View>
            //   ),
            // }}
          />
        </NavigationContainer>
      </SafeAreaProvider>
    </RecoilRoot>
  );
};

export default App;

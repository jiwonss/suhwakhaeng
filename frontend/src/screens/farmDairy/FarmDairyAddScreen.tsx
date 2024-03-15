import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type RootStackParamList = {
  // OauthScreen: undefined;
  // SplashScreen: undefined;
};

type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const FarmDairyAddScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>FarmDairyAddScreen</Text>
    </SafeAreaView>
  );
};

export default FarmDairyAddScreen;

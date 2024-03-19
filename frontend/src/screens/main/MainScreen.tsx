import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BasicButton } from '../../components/button/Buttons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  MainScreen: undefined;
  MarketScreen: undefined;
};

type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const MainScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BasicButton
        onPress={() => {
          navigation.navigate('MarketScreen');
        }}
        width={200}
        height={50}
        borderColor={'#333333'}
        borderRadius={10}
      >
        <Text>장터 페이지 이동</Text>
      </BasicButton>
    </SafeAreaView>
  );
};

export default MainScreen;

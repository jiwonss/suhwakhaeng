import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import * as Color from '../../config/color/Color';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import Header from '../../components/header/Header';

type RootStackParamList = {
  OauthScreen: undefined;
  SplashScreen: undefined;
};

type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const SplashScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [searchValue, setSearchValue] = useState<string>('');

  const onSubmit = () => {
    console.log('제출완료');
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }}>
        <Header value={searchValue} setValue={setSearchValue} onSubmitSearch={onSubmit} type={'search'} />
      </ScrollView>
    </View>
  );
};

export default SplashScreen;

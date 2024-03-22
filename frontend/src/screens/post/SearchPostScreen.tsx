import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/header/Header';
import * as Color from '../../config/color/Color';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';

const SearchPostScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [searchValue, setSearchValue] = useState<string>('');
  const onSubmit = () => {
    navigation.navigate('SearchResultScreen', { searchValue });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Header type='search' value={searchValue} setValue={setSearchValue} onSubmitSearch={onSubmit} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SearchPostScreen;

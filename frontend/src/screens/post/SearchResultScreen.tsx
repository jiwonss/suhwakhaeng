import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/header/Header';
import BottomNavigation from '../../components/navigation/BottomNavigation';
import * as Color from '../../config/color/Color';

const SearchResultScreen = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const onSubmit = () => {
    console.log('검색');
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Header type='search' value={searchValue} setValue={setSearchValue} onSubmitSearch={onSubmit} />
        </ScrollView>
      </View>
      <BottomNavigation />
    </SafeAreaView>
  );
};

export default SearchResultScreen;

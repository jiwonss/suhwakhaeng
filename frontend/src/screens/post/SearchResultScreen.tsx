import * as Color from '../../config/color/Color';
import { ScrollView, View } from 'react-native';
import Header from '../../components/header/Header';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavigation from '../../components/navigation/BottomNavigation';

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

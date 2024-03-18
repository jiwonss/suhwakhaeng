import * as Color from '../../config/color/Color';
import { ScrollView } from 'react-native';
import Header from '../../components/header/Header';

const DetailPostScreen = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <Header type={'default'} firstIcon='back' secondIcon={'more'} onPressMore={() => console.log('더보기')} />
    </ScrollView>
  );
};

export default DetailPostScreen;

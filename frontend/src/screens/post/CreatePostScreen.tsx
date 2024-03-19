import * as Color from '../../config/color/Color';
import { ScrollView } from 'react-native';
import Header from '../../components/header/Header';
import Post from '../../components/post/Post';

const CreatePostScreen = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <Header type={'default'} firstIcon='back' title={'게시글 등록'} onPressMore={() => console.log('더보기')} />
    </ScrollView>
  );
};

export default CreatePostScreen;

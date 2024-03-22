import { ScrollView } from 'react-native';
import Header from '../../components/header/Header';
import Post from '../../components/post/Post';
import * as Color from '../../config/color/Color';

const DetailPostScreen = () => {
  const postData = {
    name: '김농부',
    date: '2024-03-10 9:46:56',
    classification: '자유',
    content: '부직포 벗긴 밭에 풀이 너무 많아 뽑기를 포기하고 ‘트리부닐’을 살포했습니다. 멀칭이 있어서 제초가 어려워 두둑배 갈라서 멀칭을 제거했습니다',
    likeNumber: 0,
    commentNumber: 0,
    imgUrl_one: require('../../../assets/imgs/kakaoButton.png'),
    imgUrl_two: require('../../../assets/imgs/favicon.png'),
    imgUrl_three: require('../../../assets/imgs/favicon.png'),
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <Header type={'default'} firstIcon='back' secondIcon={'more'} onPressMore={() => console.log('더보기')} />
      <Post postData={postData} onPress={() => console.log('게시글 클릭')} />
    </ScrollView>
  );
};

export default DetailPostScreen;

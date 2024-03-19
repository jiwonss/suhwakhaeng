import * as Color from '../../config/color/Color';
import { ScrollView, View } from 'react-native';
import Header from '../../components/header/Header';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNavigation from '../../components/navigation/BottomNavigation';
import Post from '../../components/post/Post';

const postData = [
  {
    id: 1,
    name: '김농부',
    date: '2024-03-10 9:46:56',
    classification: '자유',
    title: '트리부닐 살포',
    content: '부직포 벗긴 밭에 풀이 너무 많아 뽑기를 포기하고 ‘트리부닐’을 살포했습니다. 멀칭이 있어서 제초가 어려워 두둑배 갈라서 멀칭을 제거했습니다',
    likeNumber: 0,
    commentNumber: 0,
    imgUrl_one: require('../../../assets/imgs/kakaoButton.png'),
    imgUrl_two: require('../../../assets/imgs/favicon.png'),
    imgUrl_three: require('../../../assets/imgs/favicon.png'),
  },
  {
    id: 2, // 수정된 id 값
    name: '홍길동',
    date: '2024-03-12 9:46:56',
    classification: '자유',
    title: 'asdf',
    content: '아오 이걸 일일히 써야해?',
    likeNumber: 1,
    commentNumber: 0,
    imgUrl_one: require('../../../assets/imgs/kakaoButton.png'),
    imgUrl_two: require('../../../assets/imgs/favicon.png'),
    imgUrl_three: require('../../../assets/imgs/favicon.png'),
  },
];

const SearchPostScreen = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [posts, setPosts] = useState(postData);

  // 검색값을 포함하는 게시글만 필터링
  const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(searchValue.toLowerCase()));

  const onSubmit = () => {
    console.log('검색');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Header type='search' value={searchValue} setValue={setSearchValue} onSubmitSearch={onSubmit} />
          {filteredPosts.map((post) => (
            <Post key={post.id} postData={post} onPress={() => console.log('게시글 입장')} />
          ))}
        </ScrollView>
      </View>
      <BottomNavigation />
    </SafeAreaView>
  );
};

export default SearchPostScreen;

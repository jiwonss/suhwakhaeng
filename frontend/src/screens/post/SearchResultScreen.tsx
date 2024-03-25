import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/header/Header';
import Post, { PostProps } from '../../components/post/Post';
import * as Color from '../../config/color/Color';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';
import { useRoute } from '@react-navigation/core';

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
    content: '가나다라마바사 아자차카타파하',
    likeNumber: 1,
    commentNumber: 0,
    imgUrl_one: require('../../../assets/imgs/kakaoButton.png'),
    imgUrl_two: require('../../../assets/imgs/favicon.png'),
    imgUrl_three: require('../../../assets/imgs/favicon.png'),
  },
];

const SearchResultScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const routeParams = route.params as { searchValue: string } | undefined;

  const [searchValue, setSearchValue] = useState<string>(routeParams?.searchValue || '');
  const [filteredPosts, setFilteredPosts] = useState(postData);

  useEffect(() => {
    if (routeParams?.searchValue) {
      setSearchValue(routeParams.searchValue);
      handleSearch(routeParams.searchValue);
    }
  }, [routeParams?.searchValue]);

  const handleSearch = (value: string) => {
    if (value) {
      const newFilteredPosts = postData.filter((post) => post.title.toLowerCase().includes(value.toLowerCase()));
      setFilteredPosts(newFilteredPosts);
    } else {
      setFilteredPosts(postData);
    }
  };

  const onSubmit = () => {
    handleSearch(searchValue);
    console.log('검색: ', searchValue);
  };

  const onPostPress = (postData: PostProps['postData']) => {
    navigation.navigate('DetailPostScreen', { postData });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Header type='search' value={searchValue} setValue={setSearchValue} onSubmitSearch={onSubmit} />
          {filteredPosts.map((post) => (
            <Post key={post.id} postData={post} onPress={() => onPostPress(post)} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SearchResultScreen;

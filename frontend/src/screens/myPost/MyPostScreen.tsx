import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Color from '../../config/color/Color';
import Header from '../../components/header/Header';
import CustomRadioButton from '../../components/cutomRadioButton/CutomRadioButton';
import { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Post from '../../components/post/Post';
import { Spacer } from '../../components/basic/Spacer';
import { heightPercent } from '../../config/dimension/Dimension';
import MarketPost from '../../components/marketPost/MarketPost';
import * as Typo from '../../components/typography/Typography';
import { getMyMarketPostList } from '../../apis/services/market/market';
import { changeCategoryName } from '../../util/MarketUtil';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';
import { getMyPostList } from '../../apis/services/community/community';

const StyledView = styled.View`
  width: 50%;
  margin: 0 auto;
`;

const NoPost = styled.View`
  margin-top: ${heightPercent * 95}px;
  align-items: center;
  flex: 1;
`;

type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const MyPostScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const isFocused = useIsFocused();

  const [activeIndex, setActiveIndex] = useState(0);
  const radioData = [
    { content: '게시글', event: () => setActiveIndex(0), active: activeIndex === 0 },
    { content: '거래', event: () => setActiveIndex(1), active: activeIndex === 1 },
  ];

  const [myPost, setMyPost] = useState<
    {
      user: {
        nickname: string;
        profileImage: string;
        userId: number;
      };
      communityId: number;
      communityContent: string;
      thumbnail: string;
      cate: string;
      isLiked: boolean;
      likeCount: number;
      commentCount: number;
      createdAt: string;
    }[]
  >([]);

  const [myMarketPost, setMyMarketPost] = useState<
    {
      id: number;
      image1: string;
      cate: string;
      title: string;
      price: number;
      likeCnt: number;
      createdAt: string;
      isLiked: boolean;
      status: string;
    }[]
  >([]);

  const data: string[] = [];
  const data2: string[] = [];

  const onPressPost = (postId: number) => {
    navigation.navigate('MarketDetailScreen', { id: postId, previousScreen: 'MyPostScreen' });
  };

  useEffect(() => {
    const getMyPost = async () => {
      const response = await getMyPostList({ lastId: 0 });
      setMyPost(response.dataBody);
    };

    const getMyMarketPost = async () => {
      const response = await getMyMarketPostList();
      setMyMarketPost(response.dataBody);
    };
    if (activeIndex === 0) {
      getMyPost();
    }
    if (activeIndex === 1) {
      getMyMarketPost();
    }
  }, [activeIndex]);

  useEffect(() => {
    const getMyMarketPost = async () => {
      const response = await getMyMarketPostList();
      setMyMarketPost(response.dataBody);
    };
    if (activeIndex === 1) {
      getMyMarketPost();
    }
  }, [isFocused]);

  const postRenderItem = ({ item }) => {
    return (
      <Post
        key={item.communityId}
        onPress={() => {
          navigation.navigate('DetailPostScreen', { id: item.communityId, previousScreen: 'myPostScreen' });
        }}
        postData={{
          name: item.user.nickname,
          date: item.createdAt,
          classification: changeCategoryName(item.cate),
          content: item.communityContent,
          isLiked: item.isLiked,
          likeNumber: item.likeCount,
          commentNumber: item.commentCount,
          profileImg: item.user.profileImage,
          imgUrl_one: item.thumbnail,
        }}
      />
    );
  };

  const marketPostRenderItem = ({ item }) => {
    return (
      <MarketPost
        onPress={() => onPressPost(item.id)}
        key={item.id}
        imgUrl={item.image1}
        classification={changeCategoryName(item.cate)}
        title={item.title}
        price={item.price}
        likeNumber={item.likeCnt}
        date={item.createdAt}
        isFavorite={item.isLiked}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
        <Header type='default' firstIcon='back' title='내 글 목록'></Header>
        <StyledView>
          <CustomRadioButton data={radioData} />
        </StyledView>
        <Spacer space={heightPercent * 10}></Spacer>
        {activeIndex === 0 && (
          <FlatList
            ListEmptyComponent={
              <NoPost>
                <Typo.BODY3_B>아직 작성한 글이 없어요</Typo.BODY3_B>
              </NoPost>
            }
            data={myPost}
            renderItem={postRenderItem}
            keyExtractor={(item) => item.communityId.toString()}
          />
        )}
        {activeIndex === 1 && (
          <FlatList
            ListEmptyComponent={
              <NoPost>
                <Typo.BODY3_B>아직 작성한 글이 없어요</Typo.BODY3_B>
              </NoPost>
            }
            data={myMarketPost}
            renderItem={marketPostRenderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default MyPostScreen;

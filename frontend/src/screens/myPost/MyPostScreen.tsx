import { View } from 'react-native';
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
import EncryptedStorage from 'react-native-encrypted-storage';
import { changeCategoryName } from '../../util/MarketUtil';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';

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
    navigation.navigate('MarketDetailScreen', { id: postId });
  };

  useEffect(() => {
    const getMyMarketPost = async () => {
      const response = await getMyMarketPostList();
      setMyMarketPost(response.dataBody);
    };
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
        <Header type='default' firstIcon='back' title='내 글 목록'></Header>
        <StyledView>
          <CustomRadioButton data={radioData} />
        </StyledView>
        <Spacer space={heightPercent * 10}></Spacer>
        {activeIndex === 0 &&
          (data.length !== 0 ? (
            <Post
              postData={{
                name: '김농민',
                date: '11시간전',
                classification: '자유',
                content: '부직포 벗긴 밭에 풀이 너무 많아 뽑기를 포기하고 "트리부닐"을 살포했습니다. 멸칭이 있어서 제초가 어려워 두둑배 갈라서 멸칭을 제거했습니다.',
                likeNumber: 12,
                commentNumber: 8,
                imgUrl_one: undefined,
                imgUrl_two: undefined,
                imgUrl_three: undefined,
                imgUrl_four: undefined,
              }}
              onPress={function (): void {
                throw new Error('Function not implemented.');
              }}
            ></Post>
          ) : (
            <NoPost>
              <Typo.BODY3_B>아직 작성한 글이 없어요</Typo.BODY3_B>
            </NoPost>
          ))}
        {activeIndex === 1 &&
          (myMarketPost.length !== 0 ? (
            myMarketPost.map((item) => (
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
            ))
          ) : (
            <NoPost>
              <Typo.BODY3_B>아직 작성한 글이 없어요</Typo.BODY3_B>
            </NoPost>
          ))}
      </View>
    </SafeAreaView>
  );
};

export default MyPostScreen;

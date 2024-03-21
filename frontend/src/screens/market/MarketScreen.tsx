import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import Header from '../../components/header/Header';
import CustomRadioButton from '../../components/cutomRadioButton/CutomRadioButton';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import MarketPost from '../../components/marketPost/MarketPost';
import { ScrollView } from 'react-native';
import FloatingActionButton from '../../components/floatingActionButton/FloatingActionButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { BasicButton } from '../../components/button/Buttons';

type RootStackParamList = {
  ChatListScreen: undefined;
  MarketSearchScreen: undefined;
  MarketDetailScreen: { id: number };
  MarketRegistScreen: undefined;
  MarketScreen: undefined;
};

type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const Container = styled.View`
  flex: 1;
  background-color: ${Color.WHITE};
`;

const ButtonContainer = styled.View`
  padding: ${heightPercent * 10}px ${widthPercent * 20}px;
`;

const ContentContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: ${heightPercent * 50}px;
  row-gap: ${heightPercent * 20}px;
`;

const MarketScreen = () => {
  // 네이게이션
  const navigation = useNavigation<RootStackNavigationProp>();

  const onPressChat = () => {
    navigation.navigate('ChatListScreen');
  };

  const onPressSearch = () => {
    navigation.navigate('MarketSearchScreen');
  };

  const onPressPost = (postId: number) => {
    navigation.navigate('MarketDetailScreen', { id: postId });
  };

  const onPressRegist = () => {
    // TODO: 사업자인지 아닌지 확인 필요
    navigation.navigate('MarketRegistScreen');
  };

  // action button
  const buttonData = [
    {
      title: '작물 등록',
      event: onPressRegist,
      color: `${Color.GREEN500}`,
    },
  ];

  // 라디오버튼
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const radioData = [
    { content: '전체', event: () => setActiveIndex(0), active: activeIndex === 0 },
    { content: '작물', event: () => setActiveIndex(1), active: activeIndex === 1 },
    { content: '농자재', event: () => setActiveIndex(2), active: activeIndex === 2 },
    { content: '체험', event: () => setActiveIndex(3), active: activeIndex === 3 },
    { content: '일손', event: () => setActiveIndex(4), active: activeIndex === 4 },
  ];

  // 게시글 데이터
  const [marketPostData, setMarketPostData] = useState<
    {
      postId: number;
      imgUrl: string;
      postType: string;
      title: string;
      price: number;
      likeNumber: number;
      location: string;
      date: string;
      isFavorite: boolean;
    }[]
  >([]);

  useEffect(() => {
    // TODO: 렌더링시 게시글 데이터 불러오기
    const data = [
      { postId: 1, imgUrl: '', postType: '작물', title: '감자 1kg', price: 1000, likeNumber: 2, location: '광주 서구', date: '2024-03-12 13:22:12', isFavorite: false },
      { postId: 2, imgUrl: '', postType: '작물', title: '감자 1kg', price: 1000, likeNumber: 2, location: '광주 서구', date: '2024-03-12 13:22:12', isFavorite: false },
      { postId: 3, imgUrl: '', postType: '작물', title: '감자 1kg', price: 1000, likeNumber: 2, location: '광주 서구', date: '2024-03-12 13:22:12', isFavorite: true },
    ];
    setMarketPostData(data);
  }, []);

  useEffect(() => {
    // console.log('검색 필터 바뀔 때마다 장터 글 업데이트');
  }, [activeIndex]);

  return (
    <Container>
      <Header type='default' title='장터' secondIcon='search' thirdIcon='chat' onPressSearch={onPressSearch} onPressChat={onPressChat} />
      <ButtonContainer>
        <CustomRadioButton data={radioData} />
      </ButtonContainer>
      <ScrollView style={{ flex: 1 }}>
        {marketPostData.length !== 0 ? (
          marketPostData.map((data) => (
            <MarketPost
              onPress={() => onPressPost(data.postId)}
              key={data.postId}
              imgUrl={data.imgUrl}
              location={data.location}
              classification={data.postType}
              title={data.title}
              price={data.price}
              likeNumber={data.likeNumber}
              date={data.date}
              isFavorite={data.isFavorite}
            />
          ))
        ) : (
          <ContentContainer>
            <Typo.BODY1_M>아직 장터글이 없습니다.</Typo.BODY1_M>
            <BasicButton onPress={onPressRegist} width={widthPercent * 100} height={heightPercent * 45} borderColor={Color.GREEN500} borderRadius={10}>
              <Typo.BODY3_M color={Color.WHITE}>글 쓰러 가기</Typo.BODY3_M>
            </BasicButton>
          </ContentContainer>
        )}
      </ScrollView>
      <FloatingActionButton data={buttonData} />
    </Container>
  );
};

export default MarketScreen;

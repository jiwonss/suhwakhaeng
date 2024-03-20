import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import Header from '../../components/header/Header';
import CustomRadioButton from '../../components/cutomRadioButton/CutomRadioButton';
import { ScrollView } from 'react-native';
import MarketPost from '../../components/marketPost/MarketPost';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
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

const MarketSearchScreen = () => {
  //navigation
  const navigation = useNavigation<RootStackNavigationProp>();

  const onPressPost = (postId: number) => {
    navigation.navigate('MarketDetailScreen', { id: postId });
  };

  // 검색 관련
  const [searchValue, setSearchValue] = useState<string>('');
  const [postData, setPostData] = useState<
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

  const onSubmitSearch = () => {
    // TODO: 검색어 입력 완료시 검색 결과 받아오기
    if (searchValue) {
      const data = [
        { postId: 1, imgUrl: '', postType: '작물', title: '감자 1kg', price: 1000, likeNumber: 2, location: '광주 서구', date: '2024-03-12 13:22:12', isFavorite: false },
        { postId: 2, imgUrl: '', postType: '작물', title: '감자 1kg', price: 1000, likeNumber: 2, location: '광주 서구', date: '2024-03-12 13:22:12', isFavorite: false },
        { postId: 3, imgUrl: '', postType: '작물', title: '감자 1kg', price: 1000, likeNumber: 2, location: '광주 서구', date: '2024-03-12 13:22:12', isFavorite: true },
        { postId: 4, imgUrl: '', postType: '작물', title: '감자 1kg', price: 1000, likeNumber: 2, location: '광주 서구', date: '2024-03-12 13:22:12', isFavorite: true },
        { postId: 5, imgUrl: '', postType: '작물', title: '감자 1kg', price: 1000, likeNumber: 2, location: '광주 서구', date: '2024-03-12 13:22:12', isFavorite: true },
        { postId: 6, imgUrl: '', postType: '작물', title: '감자 1kg', price: 1000, likeNumber: 2, location: '광주 서구', date: '2024-03-12 13:22:12', isFavorite: true },
        { postId: 7, imgUrl: '', postType: '작물', title: '감자 1kg', price: 1000, likeNumber: 2, location: '광주 서구', date: '2024-03-12 13:22:12', isFavorite: true },
      ];
      setPostData(data);
    }
  };

  useEffect(() => {
    // 검색어 변경시 검색 결과 초기화
    setPostData([]);
  }, [searchValue]);

  // 라디오 버튼 관련
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const radioData = [
    { content: '전체', event: () => setActiveIndex(0), active: activeIndex === 0 },
    { content: '작물', event: () => setActiveIndex(1), active: activeIndex === 1 },
    { content: '농자재', event: () => setActiveIndex(2), active: activeIndex === 2 },
    { content: '체험', event: () => setActiveIndex(3), active: activeIndex === 3 },
    { content: '일손', event: () => setActiveIndex(4), active: activeIndex === 4 },
  ];

  useEffect(() => {
    // console.log('검색 필터 바뀔 때마다 장터 글 업데이트');
  }, [activeIndex]);

  return (
    <Container>
      <Header type='search' value={searchValue} setValue={setSearchValue} onSubmitSearch={onSubmitSearch} />
      {postData.length !== 0 && (
        <>
          <ButtonContainer>
            <CustomRadioButton data={radioData} />
          </ButtonContainer>
          <ScrollView style={{ flex: 1 }}>
            {postData.map((data) => (
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
            ))}
          </ScrollView>
        </>
      )}
    </Container>
  );
};

export default MarketSearchScreen;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import Header from '../../components/header/Header';
import CustomRadioButton from '../../components/cutomRadioButton/CutomRadioButton';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import MarketPost from '../../components/marketPost/MarketPost';
import { ScrollView, View } from 'react-native';
import BottomNavigation from '../../components/navigation/BottomNavigation';
import ActionButton from 'react-native-action-button';
import FloatingActionButton from '../../components/floatingActionButton/FloatingActionButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
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

const MarketScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const buttonData = [
    {
      title: '작물 등록',
      event: () => {
        navigation.navigate('MarketRegistScreen');
      },
      color: `${Color.GREEN500}`,
    },
  ];

  const radioData = [
    { content: '전체', event: () => setActiveIndex(0), active: activeIndex === 0 },
    { content: '작물', event: () => setActiveIndex(1), active: activeIndex === 1 },
    { content: '농자재', event: () => setActiveIndex(2), active: activeIndex === 2 },
    { content: '체험', event: () => setActiveIndex(3), active: activeIndex === 3 },
    { content: '일손', event: () => setActiveIndex(4), active: activeIndex === 4 },
  ];

  const marketPostData = [
    { postId: 1, imgUrl: '', postType: '작물', title: '감자 1kg', price: 1000, likeNumber: 2, location: '광주 서구', date: '2024-03-12 13:22:12' },
    { postId: 2, imgUrl: '', postType: '작물', title: '감자 1kg', price: 1000, likeNumber: 2, location: '광주 서구', date: '2024-03-12 13:22:12' },
    { postId: 3, imgUrl: '', postType: '작물', title: '감자 1kg', price: 1000, likeNumber: 2, location: '광주 서구', date: '2024-03-12 13:22:12' },
  ];

  const onPressChat = () => {
    console.log('채팅창 이동');
  };

  const onPressSearch = () => {
    console.log('검색창 이동');
  };

  useEffect(() => {
    console.log('검색 필터 바뀔 때마다 장터 글 업데이트');
  }, [activeIndex]);

  return (
    <Container>
      <Header type='default' title='장터' secondIcon='search' thirdIcon='chat' onPressSearch={onPressSearch} onPressChat={onPressChat} />
      <ButtonContainer>
        <CustomRadioButton data={radioData} />
      </ButtonContainer>
      <ScrollView style={{ flex: 1 }}>
        {marketPostData.map((data) => (
          <MarketPost
            onPress={() => {
              console.log(`${data.postId}번 게시물로 이동`);
            }}
            key={data.postId}
            imgUrl={data.imgUrl}
            location={data.location}
            classification={data.postType}
            title={data.title}
            price={data.price}
            likeNumber={data.likeNumber}
            date={data.date}
          />
        ))}
      </ScrollView>
      <FloatingActionButton data={buttonData} />
      {/* BOTTOM NAVIGATION 추가 예정 */}
    </Container>
  );
};

export default MarketScreen;

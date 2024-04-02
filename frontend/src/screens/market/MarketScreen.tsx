import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import Header from '../../components/header/Header';
import CustomRadioButton from '../../components/cutomRadioButton/CutomRadioButton';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import MarketPost from '../../components/marketPost/MarketPost';
import { ActivityIndicator, FlatList, ScrollView } from 'react-native';
import FloatingActionButton from '../../components/floatingActionButton/FloatingActionButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { BasicButton } from '../../components/button/Buttons';
import { getMarketPostList } from '../../apis/services/market/market';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../recoil/atoms/userInfoState';
import { NotBusinessModal, RegistBusinessModal } from '../../modules/marketModules/MarketModules';
import { changeCategoryName } from '../../util/MarketUtil';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';

type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const MarketScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  // 유저 정보
  const userInfo = useRecoilValue(userInfoState);

  // 네이게이션
  const navigation = useNavigation<RootStackNavigationProp>();

  const onPressChat = () => {
    navigation.navigate('ChatListScreen');
  };

  const onPressSearch = () => {
    navigation.navigate('MarketSearchScreen');
  };

  const onPressPost = (postId: number) => {
    navigation.navigate('MarketDetailScreen', { id: postId, previousScreen: 'MarketScreen' });
  };

  // 사업자 등록, 게시글 등록 관련
  const [popUpVisible, setPopUpVisible] = useState<boolean>(false);
  const [slideVisible, setSlideVisible] = useState<boolean>(false);

  const onPressRegist = () => {
    // TODO: 사업자인지 아닌지 확인 필요
    if (userInfo.role === '사업자' || userInfo.role === '관리자') {
      navigation.navigate('MarketRegistScreen', { address: '', x: 0, y: 0, cate: category });
    } else {
      // 모달 열기
      setPopUpVisible(true);
      setActiveIndex(0);
    }
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
    {
      content: '전체',
      event: () => {
        setActiveIndex(0);
        setCategory('');
        setTradeId(0);
      },
      active: activeIndex === 0,
    },
    {
      content: '작물',
      event: () => {
        setActiveIndex(1);
        setCategory('CROP');
        setTradeId(0);
      },
      active: activeIndex === 1,
    },
    {
      content: '농자재',
      event: () => {
        setActiveIndex(2);
        setCategory('MATERIAL');
        setTradeId(0);
      },
      active: activeIndex === 2,
    },
    {
      content: '체험',
      event: () => {
        setActiveIndex(3);
        setCategory('EXPERIENCE');
        setTradeId(0);
      },
      active: activeIndex === 3,
    },
    {
      content: '일손',
      event: () => {
        setActiveIndex(4);
        setCategory('WORK');
        setTradeId(0);
      },
      active: activeIndex === 4,
    },
  ];

  // 게시글 데이터
  const [tradeId, setTradeId] = useState<number>(0);
  const [category, setCategory] = useState<string>('');

  const [marketPostData, setMarketPostData] = useState<
    {
      id: number;
      image1: string;
      cate: string;
      title: string;
      price: number;
      likeCnt: number;
      createdAt: string;
      isLiked: boolean;
    }[]
  >([]);

  const getMorePost = async () => {
    if (tradeId <= 1) {
    } else {
      const params = { id: tradeId, keyword: '', cate: category };
      const response = await getMarketPostList(params);
      setMarketPostData((prevData) => [...prevData, ...response.dataBody]);
      setTradeId(response.dataBody[response.dataBody.length - 1].id);
    }
  };

  const getPost = async () => {
    const params = { id: tradeId, keyword: '', cate: category };
    const response = await getMarketPostList(params);
    setMarketPostData(response.dataBody);
    setTradeId(response.dataBody[response.dataBody.length - 1].id);
    setIsLoading(true);
  };

  useEffect(() => {
    getPost();
  }, [activeIndex]);

  const renderItem = ({ item }) => (
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

  return (
    <Container>
      <Header type='default' title='장터' secondIcon='search' thirdIcon='chat' onPressSearch={onPressSearch} onPressChat={onPressChat} />
      <ButtonContainer>
        <CustomRadioButton data={radioData} />
      </ButtonContainer>
      {marketPostData.length !== 0 ? (
        <FlatList data={marketPostData} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} onEndReached={getMorePost} />
      ) : isLoading ? (
        <ContentContainer>
          <Typo.BODY2_M>아직 장터글이 없습니다.</Typo.BODY2_M>
          <BasicButton onPress={onPressRegist} width={widthPercent * 90} height={heightPercent * 45} borderColor={Color.GREEN500} borderRadius={10}>
            <Typo.BODY4_M color={Color.WHITE}>글 쓰러 가기</Typo.BODY4_M>
          </BasicButton>
        </ContentContainer>
      ) : (
        <ContentContainer>
          <ActivityIndicator />
        </ContentContainer>
      )}
      <FloatingActionButton data={buttonData} />
      <NotBusinessModal isVisible={popUpVisible} setIsVisible={setPopUpVisible} onClickCertButton={() => setSlideVisible(true)} />
      <RegistBusinessModal userId={userInfo.userId} isVisible={slideVisible} setIsVisible={setSlideVisible} />
    </Container>
  );
};

/**
 * styled component 영역
 */
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
  padding-top: ${heightPercent * 80}px;
  row-gap: ${heightPercent * 20}px;
`;

export default MarketScreen;

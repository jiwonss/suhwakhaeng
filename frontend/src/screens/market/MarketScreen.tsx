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
import { getMarketPostList } from '../../apis/services/market/market';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../recoil/atoms/userInfoState';
import { NotBusinessModal, RegistBusinessModal } from '../../modules/marketModules/MarketModules';

type RootStackParamList = {
  ChatListScreen: undefined;
  MarketSearchScreen: undefined;
  MarketDetailScreen: { id: number };
  MarketRegistScreen: undefined;
  MarketScreen: undefined;
};

type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const MarketScreen = () => {
  // 유저 정보
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

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

  // 사업자 등록, 게시글 등록 관련
  const [popUpVisible, setPopUpVisible] = useState<boolean>(false);
  const [slideVisible, setSlideVisible] = useState<boolean>(false);
  const onPressRegist = () => {
    // TODO: 사업자인지 아닌지 확인 필요
    if (!userInfo.isBusiness) {
      navigation.navigate('MarketRegistScreen');
    } else {
      // 모달 열기
      setPopUpVisible(true);
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
      },
      active: activeIndex === 0,
    },
    {
      content: '작물',
      event: () => {
        setActiveIndex(1);
        setCategory('CROP');
      },
      active: activeIndex === 1,
    },
    {
      content: '농자재',
      event: () => {
        setActiveIndex(2);
        setCategory('MATERIAL');
      },
      active: activeIndex === 2,
    },
    {
      content: '체험',
      event: () => {
        setActiveIndex(3);
        setCategory('EXPERIENCE');
      },
      active: activeIndex === 3,
    },
    {
      content: '일손',
      event: () => {
        setActiveIndex(4);
        setCategory('WORK');
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

  const changeCategoryName = (category: string) => {
    let newCategoryName = '';
    switch (category) {
      case 'CROP':
        newCategoryName = '작물';
        break;
      case 'MATERIAL':
        newCategoryName = '농자재';
        break;

      case 'EXPERIENCE':
        newCategoryName = '체험';
        break;
      case 'WORK':
        newCategoryName = '일손';
        break;
    }
    return newCategoryName;
  };

  useEffect(() => {
    // TODO: 렌더링시 게시글 데이터 불러오기
    const getPost = async () => {
      const params = { tradeId: tradeId, keyword: '', cate: '' };
      const response = await getMarketPostList(params);
      console.log(response);
      setMarketPostData(response.dataBody);
      setTradeId(response.dataBody.length);
    };

    getPost();
  }, []);

  useEffect(() => {
    // 카테고리 바뀔 때마다 카테고리에 대한 글목록 조회
    const getPost = async () => {
      const params = { tradeId: tradeId, keyword: '', cate: category };
      const response = await getMarketPostList(params);
      setMarketPostData(response.dataBody);
      setTradeId(response.dataBody.length);
    };

    getPost();
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
              onPress={() => onPressPost(data.id)}
              key={data.id}
              imgUrl={data.image1}
              classification={changeCategoryName(data.cate)}
              title={data.title}
              price={data.price}
              likeNumber={data.likeCnt}
              date={data.createdAt}
              isFavorite={data.isLiked}
            />
          ))
        ) : (
          <ContentContainer>
            <Typo.BODY2_M>아직 장터글이 없습니다.</Typo.BODY2_M>
            <BasicButton onPress={onPressRegist} width={widthPercent * 90} height={heightPercent * 45} borderColor={Color.GREEN500} borderRadius={10}>
              <Typo.BODY4_M color={Color.WHITE}>글 쓰러 가기</Typo.BODY4_M>
            </BasicButton>
          </ContentContainer>
        )}
      </ScrollView>
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

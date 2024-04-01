import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import Header from '../../components/header/Header';
import CustomRadioButton from '../../components/cutomRadioButton/CutomRadioButton';
import { FlatList, ScrollView, View } from 'react-native';
import MarketPost from '../../components/marketPost/MarketPost';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { StackNavigationProp } from '@react-navigation/stack';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { getMarketPostList } from '../../apis/services/market/market';
import { changeCategoryName } from '../../util/MarketUtil';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';

const Container = styled.View`
  flex: 1;
  background-color: ${Color.WHITE};
`;

const ButtonContainer = styled.View`
  padding: ${heightPercent * 10}px ${widthPercent * 20}px;
`;

const MarketSearchScreen = () => {
  const isFocused = useIsFocused();
  //navigation
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const onPressPost = (postId: number) => {
    navigation.navigate('MarketDetailScreen', { id: postId, previousScreen: 'SearchScreen' });
  };

  // 검색 관련
  const [tradeId, setTradeId] = useState(0);
  const [searchValue, setSearchValue] = useState<string>('');
  const [postData, setPostData] = useState<
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

  const onSubmitSearch = async () => {
    // TODO: 검색어 입력 완료시 검색 결과 받아오기
    if (searchValue) {
      const params = { id: tradeId, keyword: searchValue, cate: '' };
      const response = await getMarketPostList(params);
      setPostData(response.dataBody);
      setTradeId(response.dataBody.length);
    }
  };

  useEffect(() => {
    // 검색어 변경시 검색 결과 초기화
    setPostData([]);
  }, [searchValue]);

  // 라디오 버튼 관련
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
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

  const getMorePost = async () => {
    if (tradeId <= 1) {
    } else {
      const params = { id: tradeId, keyword: '', cate: category };
      const response = await getMarketPostList(params);
      setPostData((prevData) => [...prevData, ...response.dataBody]);
      setTradeId(response.dataBody[response.dataBody.length - 1].id);
    }
  };

  useEffect(() => {
    const getPost = async () => {
      const params = { id: tradeId, keyword: searchValue, cate: category };
      const response = await getMarketPostList(params);
      setPostData(response.dataBody);
      setTradeId(response.dataBody[response.dataBody.length - 1].id);
    };

    if (searchValue) {
      getPost();
    }
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
      <Header type='search' value={searchValue} setValue={setSearchValue} onSubmitSearch={onSubmitSearch} />

      <ButtonContainer>
        <CustomRadioButton data={radioData} />
      </ButtonContainer>
      {postData.length !== 0 ? (
        <FlatList data={postData} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} onEndReached={getMorePost} />
      ) : (
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: heightPercent * 50 }}>
          <Typo.BODY3_M>검색 결과가 없습니다</Typo.BODY3_M>
        </View>
      )}
    </Container>
  );
};

export default MarketSearchScreen;

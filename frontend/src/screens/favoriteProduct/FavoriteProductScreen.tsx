import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Color from '../../config/color/Color';
import Header from '../../components/header/Header';
import styled from 'styled-components/native';
import { Spacer } from '../../components/basic/Spacer';
import { heightPercent } from '../../config/dimension/Dimension';
import MarketPost from '../../components/marketPost/MarketPost';
import * as Typo from '../../components/typography/Typography';
import { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';
import { StackNavigationProp } from '@react-navigation/stack';
import { getLikedMarketPostList } from '../../apis/services/market/market';
import { changeCategoryName } from '../../util/MarketUtil';

const NoPost = styled.View`
  margin-top: ${heightPercent * 95}px;
  align-items: center;
  flex: 1;
`;

type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const FavoriteProductScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const isFocused = useIsFocused();

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

  useEffect(() => {
    const getLikedPost = async () => {
      const response = await getLikedMarketPostList();
      setMyMarketPost(response.dataBody);
    };

    getLikedPost();
  }, [isFocused]);

  const onPressPost = (postId: number) => {
    navigation.navigate('MarketDetailScreen', { id: postId });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
        <Header type='default' firstIcon='back' title='관심 상품'></Header>
        <Spacer space={heightPercent * 10}></Spacer>
        {myMarketPost.length !== 0 ? (
          myMarketPost.map((item) => (
            <MarketPost
              onPress={() => onPressPost(item.id)}
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
            <Typo.BODY3_B>관심 상품이 없어요</Typo.BODY3_B>
            <Spacer space={heightPercent * 10}></Spacer>
            <Typo.BODY4_M color={Color.GRAY400}>장터에서 관심가는 상품에 하트를 눌러보세요</Typo.BODY4_M>
          </NoPost>
        )}
      </View>
    </SafeAreaView>
  );
};

export default FavoriteProductScreen;

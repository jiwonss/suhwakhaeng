import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Color from '../../config/color/Color';
import Header from '../../components/header/Header';
import styled from 'styled-components/native';
import { Spacer } from '../../components/basic/Spacer';
import { heightPercent } from '../../config/dimension/Dimension';
import MarketPost from '../../components/marketPost/MarketPost';
import * as Typo from '../../components/typography/Typography';

const NoPost = styled.View`
  margin-top: ${heightPercent * 95}px;
  align-items: center;
  flex: 1;
`;

const FavoriteProductScreen = () => {

  const data2: string[] = [];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
        <Header type='default' firstIcon='back' title='관심 상품'></Header>
        <Spacer space={heightPercent * 10}></Spacer>
          {data2.length !== 0 ? (
            <MarketPost title={'햇감자 5000원 팔아요'} price={5000} likeNumber={8}></MarketPost>
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

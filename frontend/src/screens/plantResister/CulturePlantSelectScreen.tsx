import { ScrollView, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { Divider } from '../../components/basic/Divider';
import { Spacer } from '../../components/basic/Spacer';
import Header from '../../components/header/Header';
import BottomNavigation from '../../components/navigation/BottomNavigation';
import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';

const Container = styled.View`
  margin-left: ${20 * widthPercent}px;
  margin-right: ${20 * widthPercent}px;
  margin-bottom: ${20 * heightPercent}px;
  row-gap: ${5 * heightPercent}px;
`;

const CulturePlantSelectScreen = () => {
  const Select = [{ content: '품종1' }, { content: '품종2' }, { content: '품종3' }];

  const onSubmit = () => {
    console.log('검색');
  };
  return (
    <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }} contentContainerStyle={{ paddingBottom: 50 * heightPercent }}>
        {/*헤더*/}
        <Header type={'default'} firstIcon={'back'} title={'작물이름'} />
        <Spacer space={20} />
        {/*품종 선택 안내메시지*/}
        <Container>
          <Typo.BODY2_M>
            현재 <Typo.BODY2_M color={Color.GREEN600}>재배 중</Typo.BODY2_M>이신가요?
          </Typo.BODY2_M>
        </Container>
        {/*품종선택*/}
        <Container>
          <TouchableOpacity onPress={onSubmit}>
            <Spacer space={23} />
            <Typo.BODY3_M>네, 재배 중이에요</Typo.BODY3_M>
            <Spacer space={23} />
          </TouchableOpacity>
          <Divider marginHorizontal={1} />
          <TouchableOpacity onPress={onSubmit}>
            <Spacer space={23} />
            <Typo.BODY3_M>아니오, 재배하고 있지 않아요</Typo.BODY3_M>
            <Spacer space={23} />
          </TouchableOpacity>
          <Divider marginHorizontal={1} />
        </Container>
      </ScrollView>
      <BottomNavigation />
    </View>
  );
};

export default CulturePlantSelectScreen;

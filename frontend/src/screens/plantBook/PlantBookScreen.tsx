import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import styled from 'styled-components/native';
import { Spacer } from '../../components/basic/Spacer';
import { BasicButton } from '../../components/button/Buttons';
import CustomRadioButton from '../../components/cutomRadioButton/CutomRadioButton';
import Header from '../../components/header/Header';
import { SearchInputBox } from '../../components/inputBox/Input';
import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
// 작물 이모지 컴포넌트
import BellPepper from '../../../assets/icons/bellPepper.svg';
import Carrot from '../../../assets/icons/carrot.svg';
import ChiliPepper from '../../../assets/icons/chiliPepper.svg';
import Cucumber from '../../../assets/icons/cucumber.svg';
import Eggplant from '../../../assets/icons/eggplant.svg';
import Garlic from '../../../assets/icons/garlic.svg';
import GreenOnion from '../../../assets/icons/greenOnion.svg';
import Lettuce from '../../../assets/icons/lettuce.svg';
import Onion from '../../../assets/icons/onion.svg';
import Potato from '../../../assets/icons/potato.svg';
import Pumpkin from '../../../assets/icons/pumpkin.svg';
import SweetPotato from '../../../assets/icons/sweetPotato.svg';
import Tomato from '../../../assets/icons/tomato.svg';
import Watermelon from '../../../assets/icons/watermelon.svg';

const Container = styled.View`
  margin-left: ${20 * widthPercent}px;
  margin-right: ${20 * widthPercent}px;
  margin-bottom: ${20 * heightPercent}px;
  row-gap: ${5 * heightPercent}px;
`;
const PlantContainer = styled.View`
  margin-left: ${20 * widthPercent}px;
  margin-right: ${20 * widthPercent}px;
  margin-bottom: ${20 * heightPercent}px;
  row-gap: ${5 * heightPercent}px;
  column-gap: ${26 * widthPercent}px;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;
export const plantData = [
  { name: '가지', Icon: Eggplant },
  { name: '고구마', Icon: SweetPotato },
  { name: '고추', Icon: ChiliPepper },
  { name: '감자', Icon: Potato },
  { name: '당근', Icon: Carrot },
  { name: '마늘', Icon: Garlic },
  { name: '상추', Icon: Lettuce },
  { name: '수박', Icon: Watermelon },
  { name: '양파', Icon: Onion },
  { name: '오이', Icon: Cucumber },
  { name: '파', Icon: GreenOnion },
  { name: '파프리카', Icon: BellPepper },
  { name: '토마토', Icon: Tomato },
  { name: '호박', Icon: Pumpkin },
];
const PlantBookScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const Data = [
    { content: '전체', event: () => setActiveIndex(0), active: activeIndex === 0 },
    { content: '제철 파종', event: () => setActiveIndex(1), active: activeIndex === 1 },
    { content: '제철 수확', event: () => setActiveIndex(2), active: activeIndex === 2 },
  ];

  const [searchValue, setSearchValue] = useState<string>('');

  const dummyCount = 3 - (plantData.length % 3 || 3);

  const onSubmit = () => {
    console.log('검색');
  };
  return (
    <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }} contentContainerStyle={{ paddingBottom: 50 * heightPercent }}>
        {/*헤더*/}
        <Header type={'default'} title={'작물도감'} />
        {/*작물검색*/}
        <View style={{ alignItems: 'center' }}>
          <SearchInputBox value={searchValue} setValue={setSearchValue} onSubmitSearch={onSubmit} placeHolder={'작물 이름을 입력해주세요'} />
        </View>
        <Spacer space={20} />
        {/*작물 라디오 버튼*/}
        {/*<Container>*/}
        {/*  <View style={{ alignItems: 'flex-start' }}>*/}
        {/*    <CustomRadioButton data={Data} width={60} />*/}
        {/*  </View>*/}
        {/*</Container>*/}
        {/*전체 작물 글자*/}
        <Container>
          <Typo.BODY4_M>작물 목록</Typo.BODY4_M>
        </Container>
        {/*작물 리스트 가나다순으로 정렬*/}
        <PlantContainer>
          {plantData.map((plant, index) => (
            <View key={index} style={{ alignItems: 'center', width: 100, marginBottom: 20 * heightPercent }}>
              <BasicButton borderColor={Color.GRAY50} backgroundColor={Color.GRAY100} borderRadius={50} width={80} height={80} onPress={() => console.log(`${plant.name} 선택`)}>
                <plant.Icon width={50} height={50} />
              </BasicButton>
              <Spacer space={5} />
              <Typo.BODY4_M>{plant.name}</Typo.BODY4_M>
            </View>
          ))}
          {/* 더미 버튼 렌더링 */}
          {Array.from({ length: dummyCount }).map((_, index) => (
            <View key={`dummy-${index}`} style={{ width: 80, height: 80, opacity: 0 }} />
          ))}
        </PlantContainer>
      </ScrollView>
    </View>
  );
};

export default PlantBookScreen;

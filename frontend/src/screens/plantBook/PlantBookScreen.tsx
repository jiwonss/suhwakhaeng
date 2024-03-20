import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import { ScrollView, View } from 'react-native';
import Header from '../../components/header/Header';
import CustomRadioButton from '../../components/cutomRadioButton/CutomRadioButton';
import { useState } from 'react';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import styled from 'styled-components/native';
import { SearchInputBox } from '../../components/inputBox/Input';
import { BasicButton } from '../../components/button/Buttons';
import { Spacer } from '../../components/basic/Spacer';

const Container = styled.View`
  margin-left: ${20 * widthPercent}px;
  margin-right: ${20 * widthPercent}px;
  margin-bottom: ${20 * heightPercent}px;
  row-gap: ${5 * heightPercent}px;
`;

const PlantBookScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const Data = [
    { content: '전체', event: () => setActiveIndex(0), active: activeIndex === 0 },
    { content: '제철 파종', event: () => setActiveIndex(1), active: activeIndex === 1 },
    { content: '제철 수확', event: () => setActiveIndex(2), active: activeIndex === 2 },
  ];
  const [searchValue, setSearchValue] = useState<string>('');
  const onSubmit = () => {
    console.log('검색');
  };
  return (
    <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }}>
        <Header type={'default'} title={'작물도감'} />
        <View style={{ alignItems: 'center' }}>
          <SearchInputBox value={searchValue} setValue={setSearchValue} onSubmitSearch={onSubmit} placeHolder={'작물 이름을 입력해주세요'} />
        </View>
        <Spacer space={20} />
        <Container>
          <View style={{ alignItems: 'flex-start' }}>
            <CustomRadioButton data={Data} width={60} />
          </View>
        </Container>
        <Container>
          <Typo.BODY4_M>전체 작물</Typo.BODY4_M>
        </Container>
        <Container>
          <BasicButton borderColor={Color.GRAY50} backgroundColor={Color.GRAY400} borderRadius={50} width={80} height={80} onPress={() => console.log('작성완료')}>
            <Typo.BODY3_M color={Color.WHITE}>dsa</Typo.BODY3_M>
          </BasicButton>
        </Container>
      </ScrollView>
    </View>
  );
};

export default PlantBookScreen;

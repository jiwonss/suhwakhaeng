import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import * as Color from '../config/color/Color';
import * as Typo from '../components/typography/Typography';
import Header from '../components/header/Header';
import { BasicButton } from '../components/button/Buttons';
import { heightPercent, widthPercent } from '../config/dimension/Dimension';
import { DropDown } from '../components/dropdown/DropDown';
import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../stacks/mainStack/MainStack';
import { useRoute } from '@react-navigation/core';

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${Color.WHITE};
  position: relative;
`;

const FormContainer = styled.View`
  flex-direction: column;
  justify-content: center;
`;

const FormItemContainer = styled.View`
  padding: ${heightPercent * 8}px ${widthPercent * 20}px;
`;

const ButtonContainer = styled.View`
  padding: ${heightPercent * 8}px ${widthPercent * 20}px;
`;

const SetLocationScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'SetLocationScreen'>>();
  const { value, plantName, varietyName } = route.params;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const radioData = [
    { content: '작물', event: () => setActiveIndex(0), active: activeIndex === 0 },
    { content: '농자재', event: () => setActiveIndex(1), active: activeIndex === 1 },
    { content: '체험', event: () => setActiveIndex(2), active: activeIndex === 2 },
    { content: '일손', event: () => setActiveIndex(3), active: activeIndex === 3 },
  ];

  const [dataList_S, setDataList_S] = useState('');
  const [dataList_G, setDataList_G] = useState('');
  const [dataList_D, setDataList_D] = useState('');
  const See_do = ['서울', '경기', '인천', '강원', '충청', '경상', '전라', '제주'];
  const Gun_Gu = ['서울', '경기', '인천', '강원', '충청', '경상', '전라', '제주'];
  const Dong = ['서울', '경기', '인천', '강원', '충청', '경상', '전라', '제주'];

  useEffect(() => {
    console.log(`선택된 분류: ${radioData[activeIndex].content}`);
  }, [activeIndex]);

  const onPressButton = () => {
    if (value == 1) {
      navigation.navigate('EnvironmentPlantScreen', { dataList_S, dataList_G, dataList_D, plantName, varietyName });
    }

    console.log('작성 완료');
  };

  return (
    <Container>
      <Header type='default' title='거주 지역 설정' firstIcon='exit' />
      <FormContainer>
        <FormItemContainer>
          <Typo.BODY2_M>거주지를 선택해주세요</Typo.BODY2_M>
        </FormItemContainer>
        <FormItemContainer>
          <Typo.BODY4_M>시/도</Typo.BODY4_M>
          <DropDown
            dataList={See_do} // 드롭다운 목록에 표시할 항목들의 배열
            onSelect={(selectedItem: any) => setDataList_S(selectedItem)} // 사용자가 항목을 선택했을 때 실행될 콜백 함수
            defaultText='시/도 선택' // 드롭다운 버튼에 표시될 기본 텍스트
          />
        </FormItemContainer>
        <FormItemContainer>
          <Typo.BODY4_M>군/구</Typo.BODY4_M>
          <DropDown
            dataList={Gun_Gu} // 드롭다운 목록에 표시할 항목들의 배열
            onSelect={(selectedItem: any) => setDataList_G(selectedItem)} // 사용자가 항목을 선택했을 때 실행될 콜백 함수
            defaultText='군/구 선택' // 드롭다운 버튼에 표시될 기본 텍스트
          />
        </FormItemContainer>
        <FormItemContainer>
          <Typo.BODY4_M>동</Typo.BODY4_M>
          <DropDown
            dataList={Dong} // 드롭다운 목록에 표시할 항목들의 배열
            onSelect={(selectedItem: any) => setDataList_D(selectedItem)} // 사용자가 항목을 선택했을 때 실행될 콜백 함수
            defaultText='동 선택' // 드롭다운 버튼에 표시될 기본 텍스트
          />
        </FormItemContainer>
        <ButtonContainer>
          <BasicButton onPress={onPressButton} height={heightPercent * 45} borderColor={Color.GREEN500} borderRadius={10}>
            <Typo.BODY3_M color={Color.WHITE}>작성 완료</Typo.BODY3_M>
          </BasicButton>
        </ButtonContainer>
      </FormContainer>
    </Container>
  );
};

export default SetLocationScreen;

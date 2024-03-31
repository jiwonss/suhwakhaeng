import styled from 'styled-components/native';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import Header from '../../components/header/Header';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import SearchGray from '../../../assets/icons/search_gray.svg';
import { BasicButton } from '../../components/button/Buttons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const StyledContainer = styled.View`
  height: ${heightPercent * 63}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${widthPercent * 12}px;
`;

const StyledContainer2 = styled.TouchableOpacity`
  height: ${heightPercent * 50}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${widthPercent * 12}px;
  margin: 0px ${widthPercent * 12}px;
  border-bottom-width: 1px;
  border-bottom-color: ${Color.GRAY200};
`;

const InputContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${Color.GRAY300};
  border-radius: 10px;
  width: ${widthPercent * 300}px;
  height: ${heightPercent * 36}px;
  padding: ${widthPercent * 8}px;
`;

const StyledInput = styled.TextInput`
  margin-left: ${widthPercent * 4}px;
  font-family: 'GmarketSansTTFMedium';
  font-size: ${widthPercent * 12}px;
  width: 100%;
  height: 100%;
`;


type RootStackParamList = {
  AdminDetailScreen: { id: any };
};

type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const AdminScreen = () => {
  const [searchValue, setSearchValue] = useState('');
  const onSubmitSearch = () => {};

  const navigation = useNavigation<RootStackNavigationProp>();

  const goToDetailPage = (id: any) => {
    // 상세 페이지로 이동하는 코드
    navigation.navigate('AdminDetailScreen', { id : id }); // 'DetailPage'는 상세 페이지의 이름에 해당하는 스택 내비게이션의 경로입니다.
  };

  useEffect(() => {
    
  }, []);

  return (
    <Container>
      <Header type='default' title='관리자 페이지' />
      <StyledContainer>
        <InputContainer>
          <SearchGray width={widthPercent * 20} height={heightPercent * 20} />
          <StyledInput value={searchValue} onChangeText={setSearchValue} placeholder='검색어를 입력하세요' onSubmitEditing={onSubmitSearch} returnKeyType='done' />
        </InputContainer>
      </StyledContainer>
      <StyledContainer2 onPress={goToDetailPage}>
        <Typo.BODY4_M color={Color.BLACK}>김범수</Typo.BODY4_M>
        <BasicButton onPress={()=>{}} width={widthPercent * 90} height={heightPercent * 30} borderColor={Color.GREEN500} borderRadius={10}>
          <Typo.BODY4_M color={Color.WHITE}>사업자 등록</Typo.BODY4_M>
        </BasicButton>
      </StyledContainer2>
      <StyledContainer2>
        <Typo.BODY4_M color={Color.BLACK}>김범수</Typo.BODY4_M>
        <BasicButton onPress={()=>{}} width={widthPercent * 90} height={heightPercent * 30} borderColor={Color.GREEN500} borderRadius={10}>
          <Typo.BODY4_M color={Color.WHITE}>사업자 등록</Typo.BODY4_M>
        </BasicButton>
      </StyledContainer2>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${Color.WHITE};
`;

export default AdminScreen;

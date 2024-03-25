import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import styled from 'styled-components/native';
import { Spacer } from '../../components/basic/Spacer';
import { BasicButton } from '../../components/button/Buttons';
import { DropDown } from '../../components/dropdown/DropDown';
import Header from '../../components/header/Header';
import { SingleLineInputBox } from '../../components/inputBox/Input';
import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { useRoute } from '@react-navigation/core';
import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';

const Container = styled.View`
  margin-left: ${20 * widthPercent}px;
  margin-right: ${20 * widthPercent}px;
  row-gap: ${5 * heightPercent}px;
`;
const ButtonContainer = styled.View`
  padding: ${heightPercent * 8}px ${widthPercent * 20}px;
`;

const EnvironmentPlantScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'EnvironmentPlantScreen'>>();
  const { plantName, varietyName, dataList_S, dataList_D, dataList_G } = route.params;
  const dropDownData = ['평방미터', '평', '헥타르'];
  const [selectData, setSelectData] = useState('');

  const moveSetLocation = (value: number) => {
    if (!varietyName) return;
    const params = { value, plantName, varietyName };
    navigation.navigate('SetLocationScreen', params);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }}>
        {/*헤더*/}
        <Header type={'default'} firstIcon={'back'} title={'작물이름'} />
        <Spacer space={20} />
        <Container>
          <Typo.BODY2_M>
            <Typo.BODY2_M color={Color.GREEN600}>
              {plantName}({varietyName})
            </Typo.BODY2_M>
            의 재배 환경을 선택해주세요
          </Typo.BODY2_M>
          <Spacer space={20} />
        </Container>
        <Container>
          <Typo.BODY4_M>지역</Typo.BODY4_M>
          <BasicButton
            onPress={() => {
              moveSetLocation(1);
            }}
            height={heightPercent * 36}
            borderColor={Color.GRAY300}
            backgroundColor={Color.WHITE}
            borderRadius={10}
          >
            <Typo.BODY3_M>
              {dataList_S} {dataList_G} {dataList_D}
            </Typo.BODY3_M>
          </BasicButton>
        </Container>
        <Spacer space={20} />
        <Container>
          <Typo.BODY4_M>재배 면적(선택)</Typo.BODY4_M>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <SingleLineInputBox width={180} placeholder={'재배 면적 입력'} />
            <DropDown width={104} dataList={dropDownData} onSelect={setSelectData} defaultText={'평방미터'} />
          </View>
        </Container>
        <Container>
          <Typo.BODY4_M>수확량(선택)</Typo.BODY4_M>
          <SingleLineInputBox placeholder={'수확량 입력(Kg단위, 숫자만 입력)'} />
        </Container>
      </ScrollView>
      <ButtonContainer>
        <BasicButton onPress={() => navigation.navigate('MyProfileScreen')} height={heightPercent * 45} borderColor={Color.GREEN500} borderRadius={10}>
          <Typo.BODY3_M color={Color.WHITE}>작성 완료</Typo.BODY3_M>
        </BasicButton>
      </ButtonContainer>
    </View>
  );
};
export default EnvironmentPlantScreen;

import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import { ScrollView, View } from 'react-native';
import Header from '../../components/header/Header';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import styled from 'styled-components/native';
import { Spacer } from '../../components/basic/Spacer';
import { SingleLineInputBox } from '../../components/inputBox/Input';
import { DropDown } from '../../components/dropdown/DropDown';
import React, { useState } from 'react';
import { BasicButton } from '../../components/button/Buttons';

const Container = styled.View`
  margin-left: ${20 * widthPercent}px;
  margin-right: ${20 * widthPercent}px;
  row-gap: ${5 * heightPercent}px;
`;
const ButtonContainer = styled.View`
  padding: ${heightPercent * 8}px ${widthPercent * 20}px;
`;

const EnvironmentPlantScreen = () => {
  const dropDownData = ['평방미터', '평', '헥타르'];
  const [selectData, setSelectData] = useState('');

  const onSubmit = () => {
    console.log('검색');
  };
  return (
    <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }}>
        {/*헤더*/}
        <Header type={'default'} firstIcon={'back'} title={'작물이름'} />
        <Spacer space={20} />
        <Container>
          <Typo.BODY2_M>재배 환경을 선택해주세요</Typo.BODY2_M>
          <Spacer space={20} />
        </Container>
        <Container>
          <Typo.BODY4_M>지역</Typo.BODY4_M>
          <BasicButton onPress={onSubmit} height={heightPercent * 36} borderColor={Color.GRAY300} backgroundColor={Color.WHITE} borderRadius={10}>
            <Typo.BODY3_M>클릭하면 이동하고 위치정보를 가져와서 보여줌</Typo.BODY3_M>
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
        <BasicButton onPress={onSubmit} height={heightPercent * 45} borderColor={Color.GREEN500} borderRadius={10}>
          <Typo.BODY3_M color={Color.WHITE}>작성 완료</Typo.BODY3_M>
        </BasicButton>
      </ButtonContainer>
    </View>
  );
};

export default EnvironmentPlantScreen;

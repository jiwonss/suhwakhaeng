import { View } from 'react-native';
import * as Color from '../../config/color/Color';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/header/Header';
import styled from 'styled-components/native';
import * as Typo from '../../components/typography/Typography';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { SingleLineInputBox } from '../../components/inputBox/Input';
import ImgUploader from '../../components/imgUploader/ImgUploader';
import { useState } from 'react';
import { BasicButton } from '../../components/button/Buttons';
import { Spacer } from '../../components/basic/Spacer';
import CustomRadioButton from '../../components/cutomRadioButton/CutomRadioButton';


const StyledContainer = styled.View`
  margin: 0 ${widthPercent * 30}px;
`;

const StyledView = styled.View`
  margin: 0 ${widthPercent * 30}px;
`;

const FarmLedgerAddScreen = () => {
  const [ urls, setUrls ] = useState<string[]>([]);    
  const [activeIndex, setActiveIndex] = useState(0);
  const Data = [
    { content: '수입', event: () => setActiveIndex(0), active: activeIndex === 0 },
    { content: '지출', event: () => setActiveIndex(1), active: activeIndex === 1 },
  ];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: Color.WHITE  }}>
        <Header type='default' firstIcon='back' title='영농장부'></Header>
        <StyledContainer>
          <StyledView>
            <CustomRadioButton data={Data}></CustomRadioButton>
          </StyledView>
          <Typo.BODY4_M >작물</Typo.BODY4_M>
          <SingleLineInputBox placeholder={'내용을 작성해주세요'}></SingleLineInputBox>
          <Typo.BODY4_M >카테고리</Typo.BODY4_M>
          <SingleLineInputBox placeholder={'카테고리를 작성해주세요'}></SingleLineInputBox>
          <Typo.BODY4_M >금액</Typo.BODY4_M>
          <SingleLineInputBox placeholder={'금액을 입력해주세요'}></SingleLineInputBox>
          <Typo.BODY4_M >한줄 메모(선택)</Typo.BODY4_M>
          <SingleLineInputBox placeholder={'내용을 작성해주세요'}></SingleLineInputBox>
          <Typo.BODY4_M >사진 (선택)</Typo.BODY4_M>
          <ImgUploader data={urls} setData={setUrls}></ImgUploader>
          {/* 나중에 다른 것 과 맞추기 */}
          <Spacer space={heightPercent * 200}></Spacer>
          <BasicButton onPress={function (): void {} } width={300} height={heightPercent * 45} borderColor={Color.WHITE} borderRadius={10} >
            <Typo.BODY3_M color={Color.WHITE}>작성 완료</Typo.BODY3_M> 
          </BasicButton>

        </StyledContainer>
      </View>
    </SafeAreaView>
  );
};

export default FarmLedgerAddScreen;

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

const StyledContainer = styled.View`
  margin: 0 ${widthPercent * 30}px;
`;

const FarmDairyAddScreen = () => {
  const [ urls, setUrls ] = useState<string[]>([]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: Color.WHITE  }}>
        <Header type='default' firstIcon='back' title='영농일지'></Header>
        <StyledContainer>
          <Typo.BODY4_M >작물</Typo.BODY4_M>
          <SingleLineInputBox placeholder={'내용을 작성해주세요'}></SingleLineInputBox>
          <Typo.BODY4_M >영농작업</Typo.BODY4_M>
          <SingleLineInputBox placeholder={'작업내용을 입력해주세요(ex 씨뿌림)'}></SingleLineInputBox>
          <Typo.BODY4_M >한줄 메모(선택)</Typo.BODY4_M>
          <SingleLineInputBox placeholder={'내용을 작성해주세요'}></SingleLineInputBox>
          <Typo.BODY4_M >사진 (선택)</Typo.BODY4_M>
          <ImgUploader data={urls} setData={setUrls}></ImgUploader>
          {/* 나중에 다른 것 과 맞추기 */}
          <Spacer space={heightPercent * 300}></Spacer>
          <BasicButton onPress={function (): void {} } width={300} height={heightPercent * 45} borderColor={Color.WHITE} borderRadius={10} >
            <Typo.BODY3_M color={Color.WHITE}>작성 완료</Typo.BODY3_M> 
          </BasicButton>

        </StyledContainer>
      </View>
    </SafeAreaView>
  );
};

export default FarmDairyAddScreen;

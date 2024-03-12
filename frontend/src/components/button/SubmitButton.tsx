import * as React from 'react';
import { View } from 'react-native';
import { SubmitButtonStyle } from './ButtonStyle';
import { BODY4_M } from '../typography/Typography';
import * as Color from '../../config/color/Color';

const SubmitButton = () => {
  const clickSubmit = () => {
    console.log('click submit');
    // API 호출 코드 작성
  };

  return (
    <View style={{ padding: 10 }}>
      <SubmitButtonStyle onPress={clickSubmit}>
        <BODY4_M color={Color.WHITE}>작성 완료</BODY4_M>
      </SubmitButtonStyle>
    </View>
  );
};

export default SubmitButton;

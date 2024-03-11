import * as React from 'react';
import Submit from '../../../assets/icons/submit.svg';
import { View } from 'react-native';
import { SubmitButtonStyle } from './ButtonStyle';

const SendButton = () => {
  const clickSubmit = () => {
    console.log('click submit');
    // API 호출 코드 작성
  };

  return (
    <View style={{ padding: 10 }}>
      <SubmitButtonStyle onPress={clickSubmit}>
        <Submit />
      </SubmitButtonStyle>
    </View>
  );
};

export default SendButton;

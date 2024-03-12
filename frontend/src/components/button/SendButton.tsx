import * as React from 'react';
import Send from '../../../assets/icons/send.svg';
import { View } from 'react-native';
import { SendButtonStyle } from './ButtonStyle';

const SendButton = () => {
  const clickSubmit = () => {
    console.log('click submit');
    // API 호출 코드 작성
  };

  return (
    <View style={{ padding: 10 }}>
      <SendButtonStyle onPress={clickSubmit}>
        <Send />
      </SendButtonStyle>
    </View>
  );
};

export default SendButton;

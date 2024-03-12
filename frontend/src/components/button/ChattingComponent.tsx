import * as React from 'react';
import { View } from 'react-native';
import { MediumSubmitButtonStyle } from './ButtonStyle';
import LikeButton from './LikeButton';
import { BODY4_M } from '../typography/Typography';
import * as Color from '../../config/color/Color';

const ChattingComponent = () => {
  const clickSubmit = () => {
    console.log('click submit');
    // API 호출 코드 작성
  };

  return (
    <View style={{ display: 'flex', flexDirection: 'row' }}>
      <LikeButton />
      <MediumSubmitButtonStyle onPress={clickSubmit}>
        <BODY4_M color={Color.WHITE}>대화 중인 채팅방으로 이동</BODY4_M>
      </MediumSubmitButtonStyle>
    </View>
  );
};

export default ChattingComponent;

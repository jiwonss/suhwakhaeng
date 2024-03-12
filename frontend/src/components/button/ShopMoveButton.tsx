import * as React from 'react';
import { View } from 'react-native';
import { ShopButtonStyle } from './ButtonStyle';
import { BODY4_M } from '../typography/Typography';
import * as Color from '../../config/color/Color';

const ShopMoveButton = () => {
  const clickSubmit = () => {
    console.log('click submit');
    // API 호출 코드 작성
  };

  return (
    <View style={{ padding: 10 }}>
      <ShopButtonStyle onPress={clickSubmit}>
        <BODY4_M color={Color.WHITE}>장터 구경하기</BODY4_M>
      </ShopButtonStyle>
    </View>
  );
};

export default ShopMoveButton;

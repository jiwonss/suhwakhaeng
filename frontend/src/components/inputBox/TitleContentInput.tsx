import React from 'react';

import { View } from 'react-native';
import { SingleInputStyle } from './InputStyle';
import * as Typo from '../../components/typography/Typography';

const TitleContentInput = () => {
  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <Typo.BODY4_M>제목</Typo.BODY4_M>
      <View style={{ height: 7 }} />
      <SingleInputStyle placeholder="제목을 입력해 주세요" />
    </View>
  );
};

export default TitleContentInput;

import React from 'react';

import { View } from 'react-native';
import { SingleInputStyle } from './InputStyle';

const SingleLineInput = () => {
  return (
    <View>
      <SingleInputStyle placeholder="입력해 주세요" />
    </View>
  );
};

export default SingleLineInput;

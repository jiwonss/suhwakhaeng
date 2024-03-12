import React from 'react';

import { View } from 'react-native';
import { MultiInputStyle } from './InputStyle';

const MultiLineInput = () => {
  return (
    <View>
      <MultiInputStyle placeholder="입력해 주세요" multiline={true} textAlignVertical="top" />
    </View>
  );
};

export default MultiLineInput;

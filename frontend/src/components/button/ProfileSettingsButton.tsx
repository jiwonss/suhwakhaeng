import * as React from 'react';
import { View } from 'react-native';
import { ProfileSettingButtonStyle } from './ButtonStyle';
import { BODY4_M } from '../typography/Typography';

const ProfileSettingButton = () => {
  const clickSubmit = () => {
    console.log('click submit');
    // API 호출 코드 작성
  };

  return (
    <View style={{ padding: 10 }}>
      <ProfileSettingButtonStyle onPress={clickSubmit}>
        <BODY4_M >프로필 수정</BODY4_M>
      </ProfileSettingButtonStyle>
    </View>
  );
};

export default ProfileSettingButton;

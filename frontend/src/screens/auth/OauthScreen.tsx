import React, { useState } from 'react';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import styled from 'styled-components/native';
import { LocalImageLoader } from '../../components/image/ImageLoader';
import { heightPercent } from '../../config/dimension/Dimension';
import { login } from '@react-native-seoul/kakao-login';

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${Color.GREEN50};
  position: 'relative';
`;

const LogoContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.TouchableOpacity`
  position: absolute;
  bottom: ${heightPercent * 70}px;
`;

const OauthScreen = () => {
  const [result, setResult] = useState<string>('');

  // TODO: 카카오 서버 accessToken 서버로 보내야함
  const signInWithKakao = async () => {
    try {
      const token = await login();
      setResult(JSON.stringify(token));
    } catch (err) {
      console.error('login err', err);
    }
  };

  return (
    <Container>
      <LogoContainer>
        <Typo.H1 color={Color.GREEN600}>수확행</Typo.H1>
        <Typo.BODY2_M color={Color.GREEN400}>농작물 관리를 세상 쉽게, 수확행</Typo.BODY2_M>
      </LogoContainer>
      <ButtonContainer onPress={signInWithKakao}>
        <LocalImageLoader source={require('../../../assets/imgs/kakaoButton.png')} />
      </ButtonContainer>
    </Container>
  );
};

export default OauthScreen;

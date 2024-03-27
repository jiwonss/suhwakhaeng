import React, { useState } from 'react';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import styled from 'styled-components/native';
import { LocalImageLoader } from '../../components/image/ImageLoader';
import { heightPercent } from '../../config/dimension/Dimension';
import { login } from '@react-native-seoul/kakao-login';
import { getUserInfo, userLogin } from '../../apis/services/user/user';
import { useRecoilState } from 'recoil';
import { tokenState } from '../../recoil/atoms/tokenState';
import axios from 'axios';
import { setTokens, getTokens } from '../../util/TokenUtil';
import EncryptedStorage from 'react-native-encrypted-storage';
import { userInfoState } from '../../recoil/atoms/userInfoState';

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
  const [currentToken, setCurrentToken] = useRecoilState(tokenState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const signInWithKakao = async () => {
    try {
      // 카카오 로그인 파트
      const res = await login();

      // 로그인 요청 보내기
      const data = { token: res.accessToken }; // 서버로 보낼 params 세팅

      const response = await userLogin(data); // 서버에 로그인 요청

      // TODO: accessToken, refreshToken 저장
      setTokens(response.dataBody.tokenInfo);

      // TODO: 회원 정보 recoil 세팅
      const userInfoData = await getUserInfo();
      setUserInfo({ ...userInfo, email: userInfoData.dataBody.email, nickname: userInfoData.dataBody.nickname, profileImage: userInfoData.dataBody.profileImage });

      setCurrentToken(true); // tokenState 변경
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

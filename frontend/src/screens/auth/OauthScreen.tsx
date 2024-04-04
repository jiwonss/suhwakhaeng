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
import { setTokens, getTokens, setDeviceToken } from '../../util/TokenUtil';
import { userInfoState } from '../../recoil/atoms/userInfoState';
import messaging from '@react-native-firebase/messaging';

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

      const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          console.log('Authorization status:', authStatus);
        }
      };

      const getFcmToken = async () => {
        const fcmToken = await messaging().getToken();
        return fcmToken;
      };

      const deviceToken = await getFcmToken();
      setDeviceToken(deviceToken);
      // requestUserPermission();

      // 로그인 요청 보내기
      const data = { oauthToken: res.accessToken, deviceToken: deviceToken }; // 서버로 보낼 params 세팅
      const response = await userLogin(data); // 서버에 로그인 요청

      // TODO: accessToken, refreshToken 저장
      setTokens(response.dataBody.tokenInfo);

      // TODO: 회원 정보 recoil 세팅
      const userInfoData = await getUserInfo();
      setUserInfo(userInfoData.dataBody);

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

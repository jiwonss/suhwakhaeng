import { useRecoilState, useRecoilValue } from 'recoil';
import { tokenState } from './recoil/atoms/tokenState';
import AuthStack from './stacks/authStack/AuthStack';
import MainStack from './stacks/mainStack/MainStack';
import SplashScreen from 'react-native-splash-screen';
import { useEffect, useState } from 'react';
import { getTokens, removeTokens, setDeviceToken } from './util/TokenUtil';
import { getUserInfo, reIssueToken } from './apis/services/user/user';
import { userInfoState } from './recoil/atoms/userInfoState';
import messaging from '@react-native-firebase/messaging';
import { checkNotifications, requestNotifications } from 'react-native-permissions';
import EncryptedStorage from 'react-native-encrypted-storage';
import Toast from 'react-native-toast-message';
import { Text, View } from 'react-native';

export const RootApp = () => {
  const [tokens, setTokens] = useState<{ accessToken: string | null; refreshToken: string | null }>({ accessToken: null, refreshToken: null });
  const [token, setToken] = useRecoilState(tokenState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const checkNotificationPermission = async () => {
    const status = await checkNotifications();
    if (status.status === 'denied') await requestNotifications(['alert', 'sound', 'criticalAlert']);
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    console.log('[FCM Token] ', fcmToken);
    setDeviceToken(fcmToken);
  };

  useEffect(() => {
    // removeTokens();
    const fetchTokens = async () => {
      const { accessToken, refreshToken } = await getTokens();

      if (!accessToken) {
        // storage에 토큰 없으면 로그인 페이지로 이동
        SplashScreen.hide();
        return;
      } else {
        // storage에 토큰 있으면, 토큰 재발급 후 회원 정보 조회
        const reIssueResponse = await reIssueToken({ accessToken: accessToken, refreshToken: refreshToken });
        const tokens = reIssueResponse.dataBody;
        setToken(tokens);

        const userInfoData = await getUserInfo();

        // 회원 정보 조회 성공
        const userInfoDataBody = userInfoData.dataBody;
        setUserInfo(userInfoDataBody);
        setToken(true);
        setTimeout(() => {
          SplashScreen.hide();
        }, 300);
      }
    };

    fetchTokens();
    checkNotificationPermission();
    getFcmToken();
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('[Remote Message] ', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  if (!token) {
    return <AuthStack />;
  } else {
    return (
      <>
        <MainStack />
      </>
    );
  }
};

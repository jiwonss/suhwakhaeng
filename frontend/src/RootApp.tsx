import { useRecoilState, useRecoilValue } from 'recoil';
import { tokenState } from './recoil/atoms/tokenState';
import AuthStack from './stacks/authStack/AuthStack';
import MainStack from './stacks/mainStack/MainStack';
import SplashScreen from 'react-native-splash-screen';
import { useEffect, useState } from 'react';
import { getTokens, removeTokens } from './util/TokenUtil';
import { getUserInfo, reIssueToken } from './apis/services/user/user';
import { userInfoState } from './recoil/atoms/userInfoState';

export const RootApp = () => {
  const [tokens, setTokens] = useState<{ accessToken: string | null; refreshToken: string | null }>({ accessToken: null, refreshToken: null });
  const [token, setToken] = useRecoilState(tokenState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  useEffect(() => {
    // removeTokens();
    const fetchTokens = async () => {
      const { accessToken, refreshToken } = await getTokens();

      if (!accessToken) {
        // storage에 토큰 없으면 로그인 페이지로 이동
        SplashScreen.hide();
        return;
      } else {
        // storage에 토큰 있으면, 회원 정보 조회
        setTokens({ ...tokens, accessToken: accessToken, refreshToken: refreshToken });

        const userInfoData = await getUserInfo();

        // 회원 정보 조회 성공
        const userInfoDataBody = userInfoData.dataBody;
        setUserInfo({
          ...userInfo,
          userId: userInfoDataBody.userId,
          email: userInfoDataBody.email,
          nickname: userInfoDataBody.nickname,
          profileImage: userInfoDataBody.profileImage,
          isBusiness: userInfoDataBody.isBuiseness,
          profileContent: userInfoDataBody.profileContent,
          sido: userInfoDataBody.sido ? userInfoDataBody.sido : '',
          gugun: userInfoDataBody.gugun ? userInfoDataBody.gugun : '',
          dong: userInfoDataBody.dong ? userInfoDataBody.dong : '',
          address: userInfoDataBody.address ? userInfoDataBody.address : '',
          role: userInfoData.role,
        });
        setToken(true);
        setTimeout(() => {
          SplashScreen.hide();
        }, 300);
        return;
      }
    };

    fetchTokens();
  }, []);

  if (!token) {
    return <AuthStack />;
  } else {
    return <MainStack />;
  }
};

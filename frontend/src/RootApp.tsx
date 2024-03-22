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

        // 회원 정보 조회 했는데 401(권한 없음)
        if (userInfoData.dataHeader.resultCode === 401) {
          // refreshtoken 있는지 확인
          if (!refreshToken) {
            // 없으면 로그인 페이지로 이동
            SplashScreen.hide();
            return;
          } else {
            // 있으면 1. 토큰 재발급 받기, 2. 재발급 받은 토큰 저장, 3. 회원정보 조회, 4. 메인페이지로 이동
            const tokenData = { accessToken: accessToken, refreshToken: refreshToken };
            const response = await reIssueToken(tokenData);
            setTokens({ accessToken: response.dataBody.accssToken, refreshToken: response.dataBody.refreshToken });
            const userInfoData = await getUserInfo();
            const userInfoDataBody = userInfoData.dataBody;
            setUserInfo({
              ...userInfo,
              userId: userInfoDataBody.userId,
              nickname: userInfoDataBody.nickname,
              profileImage: userInfoDataBody.profileImage,
              isBusiness: userInfoDataBody.isBuiseness,
              profileContent: userInfoDataBody.profileContent,
              sido: userInfoDataBody.sido,
              gugun: userInfoDataBody.gugun,
              dong: userInfoDataBody.dong,
            });
            setToken(true);
            SplashScreen.hide();
            return;
          }
        }
        // 회원 정보 조회 했는데 200(성공)
        else {
          const userInfoDataBody = userInfoData.dataBody;
          setUserInfo({
            ...userInfo,
            userId: userInfoDataBody.userId,
            nickname: userInfoDataBody.nickname,
            profileImage: userInfoDataBody.profileImage,
            isBusiness: userInfoDataBody.isBuiseness,
            profileContent: userInfoDataBody.profileContent,
            sido: userInfoDataBody.sido,
            gugun: userInfoDataBody.gugun,
            dong: userInfoDataBody.dong,
          });
          setToken(true);
          setTimeout(() => {
            SplashScreen.hide();
          }, 100);
          return;
        }
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

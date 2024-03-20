import { useRecoilValue } from 'recoil';
import { tokenState } from './recoil/atoms/tokenState';
import AuthStack from './stacks/authStack/AuthStack';
import MainStack from './stacks/mainStack/MainStack';
import SplashScreen from 'react-native-splash-screen';
import { useEffect } from 'react';

export const RootApp = () => {
  const token = useRecoilValue(tokenState);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  });

  if (token === '') {
    return <MainStack />;
  } else {
    return <MainStack />;
  }
};

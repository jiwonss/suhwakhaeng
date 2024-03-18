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
      console.log('여기 언제와!');
      SplashScreen.hide();
    }, 500);
  });

  if (token === '') {
    return <AuthStack />;
  } else {
    return <MainStack />;
  }
};

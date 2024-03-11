import { Text, View } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import { tokenState } from './recoil/atoms/tokenState';
import AuthStack from './stacks/authStack/AuthStack';
import MainStack from './stacks/mainStack/MainStack';

export const RootApp = () => {
  const token = useRecoilValue(tokenState);

  if (token === '') {
    return <AuthStack />;
  } else {
    return <MainStack />;
  }
};

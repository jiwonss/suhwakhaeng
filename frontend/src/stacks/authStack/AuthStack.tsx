import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../../screens/auth/SplashScreen';
import OauthScreen from '../../screens/auth/OauthScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName='OauthScreen'>
      <Stack.Screen name='SplashScreen' component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name='OauthScreen' component={OauthScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AuthStack;

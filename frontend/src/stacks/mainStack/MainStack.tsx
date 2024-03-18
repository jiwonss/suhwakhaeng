import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../../screens/main/MainScreen';
import MarketScreen from '../../screens/market/MarketScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName='MarketScreen'>
      <Stack.Screen name='MainScreen' component={MainScreen} options={{ headerShown: false }} />
      <Stack.Screen name='MarketScreen' component={MarketScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default MainStack;

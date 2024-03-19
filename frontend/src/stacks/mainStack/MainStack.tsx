import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../../screens/main/MainScreen';
import MarketScreen from '../../screens/market/MarketScreen';
import MarketRegistScreen from '../../screens/market/MarketRegistScreen';
import MarketDetailScreen from '../../screens/market/MarketDetailScreen';
import MarketModifyScreen from '../../screens/market/MarketModifyScreen';

type RootStackParamList = {
  MainScreen: undefined;
  MarketScreen: undefined;
  MarketRegistScreen: undefined;
  MarketDetailScreen: { id: number };
  MarketModifyScreen: { id: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName='MainScreen'>
      <Stack.Screen name='MainScreen' component={MainScreen} options={{ headerShown: false }} />
      <Stack.Screen name='MarketScreen' component={MarketScreen} options={{ headerShown: false }} />
      <Stack.Screen name='MarketRegistScreen' component={MarketRegistScreen} options={{ headerShown: false }} />
      <Stack.Screen name='MarketDetailScreen' component={MarketDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name='MarketModifyScreen' component={MarketModifyScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default MainStack;

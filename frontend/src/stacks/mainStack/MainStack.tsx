import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../../screens/main/MainScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName='MainScreen'>
      <Stack.Screen name='MainScreen' component={MainScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default MainStack;

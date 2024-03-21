import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../../screens/main/MainScreen';
import FarmDairyAddScreen from '../../screens/farmDairy/FarmDairyAddScreen';
import FarmDairyScreen from '../../screens/farmDairy/FarmDairyScreen';
import FarmLedgerAddScreen from '../../screens/farmDairy/FarmLedgerAddScreen';
import CreatePostScreen from '../../screens/post/CreatePostScreen';
import DetailPostScreen from '../../screens/post/DetailPostScreen';
import UpdatePostScreen from '../../screens/post/UpdatePostScreen';
import SetLocationScreen from '../../screens/SetLocationScreen';
import MyProfileScreen from '../../screens/myProfile/MyProfileScreen';
import MarketScreen from '../../screens/market/MarketScreen';
import MarketResistScreen from '../../screens/market/MarketResistScreen';
import MarketDetailScreen from '../../screens/market/MarketDetailScreen';
import MarketModifyScreen from '../../screens/market/MarketModifyScreen';
import MarketSearchScreen from '../../screens/market/MarketSearchScreen';
import FcmTestScreen from '../../screens/FcmTestScreen';
import PlantBookScreen from '../../screens/plantBook/PlantBookScreen';
import VarietySelectScreen from '../../screens/plantBook/VarietySelectScreen';
import ChattingRoomScreen from '../../screens/chat/ChattingRoomScreen';
import DefaultPlantResisterScreen from '../../screens/plantResister/DefaultPlantResisterScreen';
import DetailPlantResisterScreen from '../../screens/plantResister/DetailPlantResisterScreen';
import CulturePlantSelectScreen from '../../screens/plantResister/CulturePlantSelectScreen';
import EnvironmentPlantScreen from '../../screens/plantResister/EnvironmentPlantScreen';
import ModifyProfileScreen from '../../screens/myProfile/ModifyProfileScreen';
import DiseasePlantScreen from '../../screens/plantDisease/DiseasePlantScreen';
import BottomTabStackNavigator from '../navigatorStack/NavigatorStack';

export type RootStackParamList = {
  BottomTabStackNavigator: undefined;
  MainScreen: undefined;
  MarketScreen: undefined;
  MarketResistScreen: undefined;
  MarketDetailScreen: { id: number };
  MarketModifyScreen: { id: number };
  MarketSearchScreen: undefined;
  FarmDairyScreen: undefined;
  FarmDairyAddScreen: undefined;
  FarmLedgerAddScreen: undefined;
  CreatePostScreen: undefined;
  DetailPostScreen: undefined;
  UpdatePostScreen: undefined;
  MyPostScreen: undefined;
  SetLocationScreen: undefined;
  SearchPostScreen: undefined;
  SearchResultScreen: undefined;
  FavoriteProductScreen: undefined;
  MyProfileScreen: undefined;
  FcmTestScreen: undefined;
  ModifyProfileScreen: undefined;
  PlantBookScreen: undefined;
  ChatListScreen: undefined;
  ChattingRoomScreen: { id: number };
  VarietySelectScreen: undefined;
  DetailPlantScreen: undefined;
  DiseasePlantScreen: undefined;
  PlantResisterScreen: undefined;
  DefaultPlantResisterScreen: undefined;
  DetailPlantResisterScreen: undefined;
  DetailDiseasePlantScreen: undefined;
  CulturePlantSelectScreen: undefined;
  EnvironmentPlantScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* 장터 페이지 */}
      <Stack.Screen name='BottomTabStackNavigator' component={BottomTabStackNavigator} />
      <Stack.Screen name='MainScreen' component={MainScreen} options={{ headerShown: false }} />
      <Stack.Screen name='MarketScreen' component={MarketScreen} options={{ headerShown: false }} />
      <Stack.Screen name='MarketResistScreen' component={MarketResistScreen} options={{ headerShown: false }} />
      <Stack.Screen name='MarketDetailScreen' component={MarketDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name='MarketModifyScreen' component={MarketModifyScreen} options={{ headerShown: false }} />
      <Stack.Screen name='MarketSearchScreen' component={MarketSearchScreen} options={{ headerShown: false }} />
      {/* 영농일지,장부 페이지 */}
      <Stack.Screen name='FarmDairyScreen' component={FarmDairyScreen} options={{ headerShown: false }} />
      <Stack.Screen name='FarmDairyAddScreen' component={FarmDairyAddScreen} options={{ headerShown: false }} />
      <Stack.Screen name='FarmLedgerAddScreen' component={FarmLedgerAddScreen} options={{ headerShown: false }} />
      {/*게시글 CRU 페이지*/}
      <Stack.Screen name='CreatePostScreen' component={CreatePostScreen} options={{ headerShown: false }} />
      <Stack.Screen name='DetailPostScreen' component={DetailPostScreen} options={{ headerShown: false }} />
      <Stack.Screen name='UpdatePostScreen' component={UpdatePostScreen} options={{ headerShown: false }} />
      {/*지역 설정 페이지*/}
      <Stack.Screen name='SetLocationScreen' component={SetLocationScreen} options={{ headerShown: false }} />
      {/* 채팅 페이지 */}
      <Stack.Screen name='ChattingRoomScreen' component={ChattingRoomScreen} options={{ headerShown: false }} />
      {/* 마이 페이지 */}
      <Stack.Screen name='MyProfileScreen' component={MyProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name='FcmTestScreen' component={FcmTestScreen} options={{ headerShown: false }} />
      <Stack.Screen name='ModifyProfileScreen' component={ModifyProfileScreen} options={{ headerShown: false }} />
      {/*작물 도감 페이지*/}
      <Stack.Screen name='PlantBookScreen' component={PlantBookScreen} options={{ headerShown: false }} />
      <Stack.Screen name='VarietySelectScreen' component={VarietySelectScreen} options={{ headerShown: false }} />
      {/*작물 진단 페이지*/}
      <Stack.Screen name='DiseasePlantScreen' component={DiseasePlantScreen} options={{ headerShown: false }} />
      {/*작물 등록 페이지*/}
      <Stack.Screen name='DefaultPlantResisterScreen' component={DefaultPlantResisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name='DetailPlantResisterScreen' component={DetailPlantResisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name='CulturePlantSelectScreen' component={CulturePlantSelectScreen} options={{ headerShown: false }} />
      <Stack.Screen name='EnvironmentPlantScreen' component={EnvironmentPlantScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default MainStack;

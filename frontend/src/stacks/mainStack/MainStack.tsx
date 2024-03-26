import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../../screens/main/MainScreen';
import FarmDairyAddScreen from '../../screens/farmDairy/FarmDairyAddScreen';
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
import KindPlantScreen from '../../screens/plantResister/KindPlantScreen';
import EnvironmentPlantScreen from '../../screens/plantResister/EnvironmentPlantScreen';
import ModifyProfileScreen from '../../screens/myProfile/ModifyProfileScreen';
import DiseasePlantScreen from '../../screens/plantDisease/DiseasePlantScreen';
import SearchResultScreen from '../../screens/post/SearchResultScreen';
import MyPostScreen from '../../screens/myPost/MyPostScreen';
import SearchPostScreen from '../../screens/post/SearchPostScreen';
import DetailPlantScreen from '../../screens/plantBook/DetailPlantScreen';
import DetailDiseasePlantScreen from '../../screens/plantDisease/DetailDiseasePlantScreen';
import ChatListScreen from '../../screens/chat/ChatListScreen';
import FavoriteProductScreen from '../../screens/favoriteProduct/FavoriteProductScreen';
import WeatherScreen from '../../screens/weather/WeatherScreen';
import { PostProps } from '../../components/post/Post';
import CameraScreen from '../../screens/plantDisease/CarmeraScreen';
import FarmDairyDetailScreen from '../../screens/farmDairy/FarmDairyDetailScreen';
import FarmLedgerDetailScreen from '../../screens/farmDairy/FramLedgerDetailScreen';
import FarmScreen from '../../screens/farmDairy/FarmScreen';
import BottomNavigation from '../../components/navigation/BottomNavigation';

type DiagnosisResult = {
  content: string;
  disease: string;
  environment: string;
  isHealty: boolean;
  plant: string;
  protect: {
    basic: string[];
  };
};

export type RootStackParamList = {
  BottomTabStackNavigator: undefined;
  MainScreen: undefined;
  MarketScreen: undefined;
  MarketResistScreen: undefined;
  MarketDetailScreen: { id: number };
  MarketModifyScreen: { id: number };
  MarketSearchScreen: undefined;
  FarmScreen: { activeIndex: number };
  FarmDairyAddScreen: undefined;
  FarmLedgerAddScreen: undefined;
  FarmDairyDetailScreen: undefined;
  FarmLedgerDetailScreen: undefined;
  CreatePostScreen: undefined;
  DetailPostScreen: { postData: PostProps['postData'] };
  UpdatePostScreen: { postData: PostProps['postData'] };
  MyPostScreen: undefined;
  SetLocationScreen: { value: number; varietyName: string; plantName: string };
  SearchResultScreen: { searchValue: string };
  SearchPostScreen: undefined;
  FavoriteProductScreen: undefined;
  MyProfileScreen: undefined;
  FcmTestScreen: undefined;
  ModifyProfileScreen: undefined;
  PlantBookScreen: undefined;
  ChatListScreen: undefined;
  ChattingRoomScreen: { id: number };
  VarietySelectScreen: { plantName: string };
  DetailPlantScreen: { plantName: string; varietyName: string };
  DiseasePlantScreen: undefined;
  DetailDiseasePlantScreen: { photo: { uri: string }; diagnosisResult: DiagnosisResult };
  PlantResisterScreen: undefined;
  DefaultPlantResisterScreen: undefined;
  KindPlantScreen: { plantName: string };
  EnvironmentPlantScreen: { plantName: string; varietyName?: string; dataList_S?: string; dataList_G?: string; dataList_D?: string };
  BottomNavigation: undefined;
  WeatherScreen: undefined;
  CameraScreen: { value: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName='PlantBookScreen'>
      {/* 페이지 개발이 완료되면 아래 코드 주석을 해제하고 윗줄은 지워야합니다.*/}
      {/* <Stack.Navigator*/}
      {/*   screenOptions={{*/}
      {/*     headerShown: false,*/}
      {/*   }}*/}
      {/* >*/}
      <Stack.Screen name='BottomNavigation' component={BottomNavigation} options={{ headerShown: false }} />
      {/* 장터 페이지 */}
      <Stack.Screen name='MainScreen' component={MainScreen} options={{ headerShown: false }} />
      <Stack.Screen name='MarketScreen' component={MarketScreen} options={{ headerShown: false }} />
      <Stack.Screen name='MarketResistScreen' component={MarketResistScreen} options={{ headerShown: false }} />
      <Stack.Screen name='MarketDetailScreen' component={MarketDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name='MarketModifyScreen' component={MarketModifyScreen} options={{ headerShown: false }} />
      <Stack.Screen name='MarketSearchScreen' component={MarketSearchScreen} options={{ headerShown: false }} />
      {/* 영농일지,장부 페이지 */}
      <Stack.Screen name='FarmScreen' component={FarmScreen} options={{ headerShown: false }} />
      <Stack.Screen name='FarmDairyAddScreen' component={FarmDairyAddScreen} options={{ headerShown: false }} />
      <Stack.Screen name='FarmLedgerAddScreen' component={FarmLedgerAddScreen} options={{ headerShown: false }} />
      <Stack.Screen name='FarmDairyDetailScreen' component={FarmDairyDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name='FarmLedgerDetailScreen' component={FarmLedgerDetailScreen} options={{ headerShown: false }} />
      {/*게시글 CRU 페이지*/}
      <Stack.Screen name='CreatePostScreen' component={CreatePostScreen} options={{ headerShown: false }} />
      <Stack.Screen name='DetailPostScreen' component={DetailPostScreen} options={{ headerShown: false }} />
      <Stack.Screen name='UpdatePostScreen' component={UpdatePostScreen} options={{ headerShown: false }} />
      {/*게시글 검색 페이지*/}
      <Stack.Screen name='SearchPostScreen' component={SearchPostScreen} options={{ headerShown: false }} />
      <Stack.Screen name='SearchResultScreen' component={SearchResultScreen} options={{ headerShown: false }} />
      {/*작성한 게시글 조회 페이지*/}
      <Stack.Screen name='MyPostScreen' component={MyPostScreen} options={{ headerShown: false }} />
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
      <Stack.Screen name='DetailPlantScreen' component={DetailPlantScreen} options={{ headerShown: false }} />
      {/*작물 진단 페이지*/}
      <Stack.Screen name='DiseasePlantScreen' component={DiseasePlantScreen} options={{ headerShown: false }} />
      <Stack.Screen name='CameraScreen' component={CameraScreen} options={{ headerShown: false }} />
      <Stack.Screen name='DetailDiseasePlantScreen' component={DetailDiseasePlantScreen} options={{ headerShown: false }} />
      {/*작물 등록 페이지*/}
      <Stack.Screen name='DefaultPlantResisterScreen' component={DefaultPlantResisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name='KindPlantScreen' component={KindPlantScreen} options={{ headerShown: false }} />
      <Stack.Screen name='EnvironmentPlantScreen' component={EnvironmentPlantScreen} options={{ headerShown: false }} />
      {/* 채팅 페이지 */}
      <Stack.Screen name='ChatListScreen' component={ChatListScreen} options={{ headerShown: false }} />
      {/* 관심상품 페이지 */}
      <Stack.Screen name='FavoriteProductScreen' component={FavoriteProductScreen} options={{ headerShown: false }} />
      {/*날씨 페이지*/}
      <Stack.Screen name='WeatherScreen' component={WeatherScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default MainStack;

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../../screens/main/MainScreen';
import FarmDairyAddScreen from '../../screens/farmDairy/FarmDairyAddScreen';
import FarmDairyScreen from '../../screens/farmDairy/FarmDairyScreen';
import FarmLedgerAddScreen from '../../screens/farmDairy/FarmLedgerAddScreen';
import CreatePostScreen from '../../screens/post/CreatePostScreen';
import DetailPostScreen from '../../screens/post/DetailPostScreen';
import UpdatePostScreen from '../../screens/post/UpdatePostScreen';
import SearchPostScreen from '../../screens/post/SearchPostScreen';
import MyPostScreen from '../../screens/myPost/MyPostScreen';
import SetLocationScreen from '../../screens/SetLocationScreen';
import SearchResultScreen from '../../screens/post/SearchResultScreen';
import FavoriteProductScreen from '../../screens/favoriteProduct/FavoriteProductScreen';
import MyProfileScreen from '../../screens/myProfile/MyProfileScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName='MyProfileScreen'>
      <Stack.Screen name='MainScreen' component={MainScreen} options={{ headerShown: false }} />
      {/* 영농일지,장부 페이지 */}
      <Stack.Screen name='FarmDairyScreen' component={FarmDairyScreen} options={{ headerShown: false }} />
      <Stack.Screen name='FarmDairyAddScreen' component={FarmDairyAddScreen} options={{ headerShown: false }} />
      <Stack.Screen name='FarmLedgerAddScreen' component={FarmLedgerAddScreen} options={{ headerShown: false }} />
      {/*게시글 CRU 페이지*/}
      <Stack.Screen name='CreatePostScreen' component={CreatePostScreen} options={{ headerShown: false }} />
      <Stack.Screen name='DetailPostScreen' component={DetailPostScreen} options={{ headerShown: false }} />
      <Stack.Screen name='UpdatePostScreen' component={UpdatePostScreen} options={{ headerShown: false }} />
      {/*내 게시글 조회 페이지*/}
      <Stack.Screen name='MyPostScreen' component={MyPostScreen} options={{ headerShown: false }} />
      {/*지역 설정 페이지*/}
      <Stack.Screen name='SetLocationScreen' component={SetLocationScreen} options={{ headerShown: false }} />
      {/*게시글 검색 페이지*/}
      <Stack.Screen name='SearchPostScreen' component={SearchPostScreen} options={{ headerShown: false }} />
      <Stack.Screen name='SearchResultScreen' component={SearchResultScreen} options={{ headerShown: false }} />
      {/* 관심상품 페이지 */}
      <Stack.Screen name='FavoriteProductScreen' component={FavoriteProductScreen} options={{ headerShown: false }} />
      <Stack.Screen name='MyProfileScreen' component={MyProfileScreen} options={{ headerShown: false }} />

    </Stack.Navigator>
  );
};

export default MainStack;

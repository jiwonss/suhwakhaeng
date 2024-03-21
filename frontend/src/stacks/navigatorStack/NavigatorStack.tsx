import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigation from '../../components/navigation/BottomNavigation';
import MyPostScreen from '../../screens/myPost/MyPostScreen';
import SearchPostScreen from '../../screens/post/SearchPostScreen';
import SearchResultScreen from '../../screens/post/SearchResultScreen';
import DetailPlantScreen from '../../screens/plantBook/DetailPlantScreen';
import DetailDiseasePlantScreen from '../../screens/plantDisease/DetailDiseasePlantScreen';
import ChatListScreen from '../../screens/chat/ChatListScreen';
import FavoriteProductScreen from '../../screens/favoriteProduct/FavoriteProductScreen';

const BottomTabStack = createNativeStackNavigator();

const BottomTabStackNavigator = () => {
  return (
    <BottomTabStack.Navigator screenOptions={{ headerShown: false }}>
      <BottomTabStack.Screen name='BottomNavigation' component={BottomNavigation} />
      {/*작성한 게시글 조회 페이지*/}
      <BottomTabStack.Screen name='MyPostScreen' component={MyPostScreen} options={{ headerShown: false }} />
      {/*게시글 검색 페이지*/}
      <BottomTabStack.Screen name='SearchPostScreen' component={SearchPostScreen} options={{ headerShown: false }} />
      <BottomTabStack.Screen name='SearchResultScreen' component={SearchResultScreen} options={{ headerShown: false }} />
      {/*작물 도감 상세 조회 페이지*/}
      <BottomTabStack.Screen name='DetailPlantScreen' component={DetailPlantScreen} options={{ headerShown: false }} />
      {/*작물 진단 페이지*/}
      <BottomTabStack.Screen name='DetailDiseasePlantScreen' component={DetailDiseasePlantScreen} options={{ headerShown: false }} />
      {/* 채팅 페이지 */}
      <BottomTabStack.Screen name='ChatListScreen' component={ChatListScreen} options={{ headerShown: false }} />
      {/* 관심상품 페이지 */}
      <BottomTabStack.Screen name='FavoriteProductScreen' component={FavoriteProductScreen} options={{ headerShown: false }} />
    </BottomTabStack.Navigator>
  );
};

export default BottomTabStackNavigator;

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import HomeActive from '../../../assets/icons/homeActive.svg';
import HomeDefaultIcon from '../../../assets/icons/homeDefault.svg';
import searchActive from '../../../assets/icons/searchActive.svg';
import searchDefault from '../../../assets/icons/searchDefault.svg';
import hospitalActive from '../../../assets/icons/hospitalActive.svg';
import hospitalDefault from '../../../assets/icons/hospitalDefault.svg';
import shopActive from '../../../assets/icons/shopActive.svg';
import shopDefault from '../../../assets/icons/shopDefault.svg';
import profileActive from '../../../assets/icons/profileActive.svg';
import profileDefault from '../../../assets/icons/profileDefault.svg';


// 화면 컴포넌트 타입 정의
type RootTabParamList = {
  home: undefined;
  search: undefined;
  hospital: undefined;
  shop: undefined;
  profile: undefined;
};

// 화면 컴포넌트
const HomeScreen = () => <></>;
const DictionaryScreen = () => <></>;
const CropDiagnosisScreen = () => <></>;
const MarketScreen = () => <></>;
const ProfileScreen = () => <></>;

const Tabs = createBottomTabNavigator<RootTabParamList>();

const BottomNavigation = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false, // 레이블을 표시하지 않음
        headerShown: false, // 헤더 숨김
        tabBarHideOnKeyboard: true, // 키보드 활성 시 탭 숨김
        unmountOnBlur: true, // 다른 탭으로 이동 시 현재 탭 언마운트
        tabBarIcon: ({ focused, color, size }) => {
          // 포커스 상태에 따라 아이콘 변경
          let IconComponent;
          switch (route.name) {
            case 'home':
              IconComponent = focused ? HomeActive : HomeDefaultIcon;
              break;
            case 'search':
              IconComponent = focused ? searchActive : searchDefault;
              break;
            case 'hospital':
              IconComponent = focused ? hospitalActive : hospitalDefault;
              break;
            case 'shop':
              IconComponent = focused ? shopActive : shopDefault;
              break;
            case 'profile':
              IconComponent = focused ? profileActive : profileDefault;
              break;
            default:
              IconComponent = HomeDefaultIcon; // 기본값 설정
              break;
          }
          // SVG 컴포넌트를 직접 렌더링하고, 필요한 스타일을 적용합니다.
          return <View style={{ width: size, height: size }}><IconComponent fill={color} /></View>;
        },
      })}
    >
      <Tabs.Screen name="home" component={HomeScreen}></Tabs.Screen>
      <Tabs.Screen name="search" component={DictionaryScreen}></Tabs.Screen>
      <Tabs.Screen name="hospital" component={CropDiagnosisScreen}></Tabs.Screen>
      <Tabs.Screen name="shop" component={MarketScreen}></Tabs.Screen>
      <Tabs.Screen name="profile" component={ProfileScreen}></Tabs.Screen>
    </Tabs.Navigator>
  );
};

export default BottomNavigation;

import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import styled from 'styled-components/native';
import { RouteProp } from '@react-navigation/native';
import HomeActive from '../../../assets/icons/homeActive.svg';
import HomeDefaultIcon from '../../../assets/icons/homeDefault.svg';
import searchActive from '../../../assets/icons/searchActive.svg';
import searchDefault from '../../../assets/icons/searchDefault.svg';
import hospitalActive from '../../../assets/icons/hospitalActive.svg';
import hospitalDefault from '../../../assets/icons/hospitalDefault.svg';
import shopActive from '../../../assets/icons/shopActive.svg';
import shopDefault from '../../../assets/icons/shopDefault.svg';
import profileDefault from '../../../assets/icons/profileDefault.svg';
import profileActive from '../../../assets/icons/profileActive.svg';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import { StyleSheet, View } from 'react-native';

// 타입 정의
type RootTabParamList = {
  home: undefined;
  search: undefined;
  hospital: undefined;
  shop: undefined;
  profile: undefined;
};

type ScreenOptionsProps = {
  route: RouteProp<RootTabParamList, keyof RootTabParamList>;
};

type TabBarIconProps = {
  route: RouteProp<RootTabParamList, keyof RootTabParamList>;
  focused: boolean;
};

// 스타일 컴포넌트 정의
const IconSizeStyle = styled.View`
  width: ${widthPercent * 24}px;
  height: ${heightPercent * 24}px;
`;

const tabBarIcon = ({ route, focused }: TabBarIconProps) => {
  const iconMap: { [key: string]: React.ElementType } = {
    home: focused ? HomeActive : HomeDefaultIcon,
    search: focused ? searchActive : searchDefault,
    hospital: focused ? hospitalActive : hospitalDefault,
    shop: focused ? shopActive : shopDefault,
    profile: focused ? profileActive : profileDefault,
  };

  const IconComponent = iconMap[route.name] || HomeDefaultIcon;
  return (
    <IconSizeStyle>
      <IconComponent />
    </IconSizeStyle>
  );
};

// screenOptions 함수
const screenOptions = ({ route }: ScreenOptionsProps): BottomTabNavigationOptions => ({
  headerShown: false,
  tabBarHideOnKeyboard: true,
  unmountOnBlur: true,
  tabBarIcon: ({ focused }) => tabBarIcon({ route, focused }),
  tabBarStyle: {
    height: 56,
    backgroundColor: Color.WHITE,
  },
  tabBarLabelStyle: {
    fontSize: 14,
  },
});

// 화면 컴포넌트
const HomeScreen = () => <></>;
const DictionaryScreen = () => <></>;
const CropDiagnosisScreen = () => <></>;
const MarketScreen = () => <></>;
const ProfileScreen = () => <></>;

// 탭 내비게이션 구성
const Tabs = createBottomTabNavigator<RootTabParamList>();

const styles = StyleSheet.create({
  bottomNavigation: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Color.WHITE, // 배경색이 필요하면 설정합니다.
  },
});

const BottomNavigation = () => {
  return (
    <View style={styles.bottomNavigation}>
      <Tabs.Navigator screenOptions={screenOptions}>
        <Tabs.Screen
          name='home'
          component={HomeScreen}
          options={{
            title: '홈',
            tabBarLabel: ({ focused }) => (focused ? <Typo.BODY4_M color={Color.GREEN600}>홈</Typo.BODY4_M> : <Typo.BODY4_M color={Color.GRAY600}>홈</Typo.BODY4_M>),
          }}
        />
        <Tabs.Screen
          name='search'
          component={DictionaryScreen}
          options={{
            title: '작물도감',
            tabBarLabel: ({ focused }) => (focused ? <Typo.BODY4_M color={Color.GREEN600}>작물도감</Typo.BODY4_M> : <Typo.BODY4_M color={Color.GRAY600}>작물도감</Typo.BODY4_M>),
          }}
        />
        <Tabs.Screen
          name='hospital'
          component={CropDiagnosisScreen}
          options={{
            title: '작물진단',
            tabBarLabel: ({ focused }) => (focused ? <Typo.BODY4_M color={Color.GREEN600}>작물진단</Typo.BODY4_M> : <Typo.BODY4_M color={Color.GRAY600}>작물진단</Typo.BODY4_M>),
          }}
        />
        <Tabs.Screen
          name='shop'
          component={MarketScreen}
          options={{
            title: '장터',
            tabBarLabel: ({ focused }) => (focused ? <Typo.BODY4_M color={Color.GREEN600}>장터</Typo.BODY4_M> : <Typo.BODY4_M color={Color.GRAY600}>장터</Typo.BODY4_M>),
          }}
        />
        <Tabs.Screen
          name='profile'
          component={ProfileScreen}
          options={{
            title: '프로필',
            tabBarLabel: ({ focused }) => (focused ? <Typo.BODY4_M color={Color.GREEN600}>프로필</Typo.BODY4_M> : <Typo.BODY4_M color={Color.GRAY600}>프로필</Typo.BODY4_M>),
          }}
        />
      </Tabs.Navigator>
    </View>
  );
};

export default BottomNavigation;

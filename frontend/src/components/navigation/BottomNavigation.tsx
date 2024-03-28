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
import MainScreen from '../../screens/main/MainScreen';
import CropsScreen from '../../screens/crops/CropsScreen';
import DiseasePlantScreen from '../../screens/plantDisease/DiseasePlantScreen';
import MarketScreen from '../../screens/market/MarketScreen';
import MyProfileScreen from '../../screens/myProfile/MyProfileScreen';

type RootTabParamList = {
  MainScreen: undefined;
  CropsScreen: undefined;
  DiseasePlantScreen: undefined;
  MarketScreen: undefined;
  MyProfileScreen: undefined;
};

type ScreenOptionsProps = {
  route: RouteProp<RootTabParamList, keyof RootTabParamList>;
};

type TabBarIconProps = {
  route: RouteProp<RootTabParamList, keyof RootTabParamList>;
  focused: boolean;
};

const IconSizeStyle = styled.View`
  width: ${widthPercent * 24}px;
  height: ${heightPercent * 24}px;
`;

const tabBarIcon = ({ route, focused }: TabBarIconProps) => {
  const iconMap: { [key: string]: React.ElementType } = {
    MainScreen: focused ? HomeActive : HomeDefaultIcon,
    CropsScreen: focused ? searchActive : searchDefault,
    DiseasePlantScreen: focused ? hospitalActive : hospitalDefault,
    MarketScreen: focused ? shopActive : shopDefault,
    MyProfileScreen: focused ? profileActive : profileDefault,
  };

  const IconComponent = iconMap[route.name] || HomeDefaultIcon;
  return (
    <IconSizeStyle>
      <IconComponent />
    </IconSizeStyle>
  );
};

const screenOptions = ({ route }: ScreenOptionsProps): BottomTabNavigationOptions => ({
  headerShown: false,
  tabBarHideOnKeyboard: true,
  unmountOnBlur: true,
  tabBarIcon: ({ focused }) => tabBarIcon({ route, focused }),
  tabBarStyle: {
    height: 50 * heightPercent,
    backgroundColor: Color.WHITE,
  },
  tabBarLabelStyle: {
    fontSize: 14,
    padding: 30,
  },
});

const Tabs = createBottomTabNavigator<RootTabParamList>();

const BottomNavigation = () => {
  return (
    <Tabs.Navigator screenOptions={screenOptions}>
      <Tabs.Screen
        name='MainScreen'
        component={MainScreen}
        options={{
          title: '홈',
          tabBarLabel: ({ focused }) => (focused ? <Typo.BODY4_M color={Color.GREEN600}>홈</Typo.BODY4_M> : <Typo.BODY4_M color={Color.GRAY600}>홈</Typo.BODY4_M>),
        }}
      />
      <Tabs.Screen
        name='CropsScreen'
        component={CropsScreen}
        options={{
          title: '작물도감',
          tabBarLabel: ({ focused }) => (focused ? <Typo.BODY4_M color={Color.GREEN600}>작물도감</Typo.BODY4_M> : <Typo.BODY4_M color={Color.GRAY600}>작물도감</Typo.BODY4_M>),
        }}
      />
      <Tabs.Screen
        name='DiseasePlantScreen'
        component={DiseasePlantScreen}
        options={{
          title: '작물병원',
          tabBarLabel: ({ focused }) => (focused ? <Typo.BODY4_M color={Color.GREEN600}>작물병원</Typo.BODY4_M> : <Typo.BODY4_M color={Color.GRAY600}>작물병원</Typo.BODY4_M>),
        }}
      />
      <Tabs.Screen
        name='MarketScreen'
        component={MarketScreen}
        options={{
          title: '장터',
          tabBarLabel: ({ focused }) => (focused ? <Typo.BODY4_M color={Color.GREEN600}>장터</Typo.BODY4_M> : <Typo.BODY4_M color={Color.GRAY600}>장터</Typo.BODY4_M>),
        }}
      />
      <Tabs.Screen
        name='MyProfileScreen'
        component={MyProfileScreen}
        options={{
          title: '프로필',
          tabBarLabel: ({ focused }) => (focused ? <Typo.BODY4_M color={Color.GREEN600}>프로필</Typo.BODY4_M> : <Typo.BODY4_M color={Color.GRAY600}>프로필</Typo.BODY4_M>),
        }}
      />
    </Tabs.Navigator>
  );
};

export default BottomNavigation;

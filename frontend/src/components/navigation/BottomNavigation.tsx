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
import MainScreen from '../../screens/main/MainScreen';
import PlantBookScreen from '../../screens/plantBook/PlantBookScreen';
import DiseasePlantScreen from '../../screens/plantDisease/DiseasePlantScreen';
import MarketScreen from '../../screens/market/MarketScreen';
import MyProfileScreen from '../../screens/myProfile/MyProfileScreen';

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

// 화면 컴포넌트
const Home = () => <MainScreen />;
const Dictionary = () => <PlantBookScreen />;
const CropDiagnosis = () => <DiseasePlantScreen />;
const Market = () => <MarketScreen />;
const Profile = () => <MyProfileScreen />;

const Tabs = createBottomTabNavigator<RootTabParamList>();

const styles = StyleSheet.create({
  bottomNavigation: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Color.WHITE,
  },
});

const BottomNavigation = () => {
  return (
    <View style={styles.bottomNavigation}>
      <Tabs.Navigator screenOptions={screenOptions}>
        <Tabs.Screen
          name='home'
          component={Home}
          options={{
            title: '홈',
            tabBarLabel: ({ focused }) => (focused ? <Typo.BODY4_M color={Color.GREEN600}>홈</Typo.BODY4_M> : <Typo.BODY4_M color={Color.GRAY600}>홈</Typo.BODY4_M>),
          }}
        />
        <Tabs.Screen
          name='search'
          component={Dictionary}
          options={{
            title: '작물도감',
            tabBarLabel: ({ focused }) => (focused ? <Typo.BODY4_M color={Color.GREEN600}>작물도감</Typo.BODY4_M> : <Typo.BODY4_M color={Color.GRAY600}>작물도감</Typo.BODY4_M>),
          }}
        />
        <Tabs.Screen
          name='hospital'
          component={CropDiagnosis}
          options={{
            title: '작물진단',
            tabBarLabel: ({ focused }) => (focused ? <Typo.BODY4_M color={Color.GREEN600}>작물진단</Typo.BODY4_M> : <Typo.BODY4_M color={Color.GRAY600}>작물진단</Typo.BODY4_M>),
          }}
        />
        <Tabs.Screen
          name='shop'
          component={Market}
          options={{
            title: '장터',
            tabBarLabel: ({ focused }) => (focused ? <Typo.BODY4_M color={Color.GREEN600}>장터</Typo.BODY4_M> : <Typo.BODY4_M color={Color.GRAY600}>장터</Typo.BODY4_M>),
          }}
        />
        <Tabs.Screen
          name='profile'
          component={Profile}
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

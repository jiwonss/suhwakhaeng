import React, { useState } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Header from '../../components/header/Header';
import CustomRadioButton from '../../components/cutomRadioButton/CutomRadioButton';
import FarmDairy from './component/FarmDairy';
import FarmLedger from './component/FarmLedger';
import * as Color from '../../config/color/Color';

type RootStackParamList = {
  FarmDairyAddScreen: undefined;
  BottomNavigation: undefined;
};

type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

type FarmScreenRouteProp = RouteProp<RootStackParamList, 'FarmScreen'>;

const FarmScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<FarmScreenRouteProp>();
  const [activeIndex, setActiveIndex] = useState(route.params?.activeIndex ?? 0);
  const Data = [
    { content: '영농일지', event: () => setActiveIndex(0), active: activeIndex === 0 },
    { content: '영농장부', event: () => setActiveIndex(1), active: activeIndex === 1 },
  ];

  const goBack = () => {
    navigation.push('BottomNavigation');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }}>
        <Header type='default' firstIcon='back' title='영농일지/장부' onPressFirstIcon={goBack} />
        <CustomRadioButton data={Data} />
        {activeIndex === 0 && <FarmDairy />}
        {activeIndex === 1 && <FarmLedger />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FarmScreen;
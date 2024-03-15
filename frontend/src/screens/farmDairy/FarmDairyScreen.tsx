import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import Header from '../../components/header/Header';
import CustomRadioButton from '../../components/cutomRadioButton/CutomRadioButton';
import { SetStateAction, useState } from 'react';
import CustomCalendar from '../../components/customCalendar/CustomCalendar';
import { DropDown } from '../../components/dropdown/DropDown';
import { Card } from '../../components/card/Card';
import { Spacer } from '../../components/basic/Spacer';
import FarmDairy from './component/FarmDairy';
import FarmLedger from './component/FarmLedger';

const FarmDairyScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const Data = [
    { content: '영농일지', event: () => setActiveIndex(0), active: activeIndex === 0},
    { content: '영농장부', event: () => setActiveIndex(1), active: activeIndex === 1},
  ];

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDate = (dateString:string) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1); 
    const day = String(date.getDate()).padStart(2, '0'); // 일을 두 자리로 맞추기 위해 문자열로 변환
    return `${month}월 ${day}일`;
  };
  
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }}>
        <Header type='default' firstIcon='back' title='영농일지/장부'></Header>
        <CustomRadioButton data = { Data }/>
        {activeIndex === 0 && (
          <FarmDairy></FarmDairy>
        )}
        {activeIndex === 1 && (
          <FarmLedger></FarmLedger>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FarmDairyScreen;

import React, { useState } from 'react';
import { View } from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import * as Color from '../../config/color/Color';


LocaleConfig.locales.fr = {
  monthNames: [
    '01월',
    '02월',
    '03월',
    '04월',
    '05월',
    '06월',
    '07월',
    '08월',
    '09월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '01월',
    '02월',
    '03월',
    '04월',
    '05월',
    '06월',
    '07월',
    '08월',
    '09월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: "Aujourd'hui",
};

LocaleConfig.defaultLocale = 'fr';
const CustomCalendar = ({data, selectedDate, setSelectedDate}: any) => {
  // 현재 날짜를 가져오는 함수
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  const [markedDates, setMarkedDates] = useState(
    data
  );

  
  const handleDayPress = (day : any) => {
    const selectday = day.dateString
    // 선택한 날짜 업데이트
    setSelectedDate(selectday);
    setMarkedDates({...data, [selectday]: {...data[selectday] , selected : true } });
  };

  return (
    <View style={{ flex: 1 }}>
      <Calendar
        onDayPress={handleDayPress}
        monthFormat={'yyyy년 MM월'}
        dayNames={['일', '월', '화', '수', '목', '금', '토']}
        onMonthChange={month => {
          console.log('month changed', month);
        }}
        markedDates={
          markedDates
        }
        theme={{
          selectedDayBackgroundColor: Color.GREEN200,
          selectedDayTextColor: '#ffffff',
          todayTextColor: Color.GREEN200,
          dotColor: Color.GREEN400,
          arrowColor: Color.GREEN200,
          monthTextColor: Color.GREEN200,
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16
        }}
      />
    </View>
  );
};

export default CustomCalendar;
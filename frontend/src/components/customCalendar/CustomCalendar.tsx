import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import * as Color from '../../config/color/Color';

LocaleConfig.locales.fr = {
  monthNames: ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월'],
  monthNamesShort: ['01월', '02월', '03월', '04월', '05월', '06월', '07월', '08월', '09월', '10월', '11월', '12월'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: "Aujourd'hui",
};

const generateDateObjects = (startDate: string, endDate: string): { [key: string]: any } => {
  const result: { [key: string]: any } = {};

  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);

  while (currentDate <= lastDate) {
    const dateString = currentDate.toISOString().split('T')[0];
    if (dateString == startDate) result[dateString] = { ...{ selected: true, startingDay: true, color: Color.GREEN300 } };
    else if (dateString == endDate) result[dateString] = { ...{ selected: true, endingDay: true, color: Color.GREEN300 } };
    else result[dateString] = { ...{ selected: true, color: Color.GREEN200 } };
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return result;
};

LocaleConfig.defaultLocale = 'fr';
const CustomCalendar = ({ setSelectedStartDate, setSelectedFinDate, selectedStartDate, selectedFinDate }: any) => {
  // 현재 날짜를 가져오는 함수
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [markedDates, setMarkedDates] = useState({});
  const [type, setType] = useState('START');

  const handleDayPress = (day: any) => {
    const selectday = day.dateString;
    if (type === 'START') {
      if (selectday > selectedStartDate) {
        setSelectedFinDate(selectday);
        setType('FIN');
      } else {
        setSelectedFinDate(selectday);
        setSelectedStartDate(selectday);
        setType('START');
      }
    } else {
      setSelectedStartDate(selectday); 
      setSelectedFinDate(selectday);
      setType('START');
    }
    // 선택한 날짜 업데이트
  };

  useEffect(() => {
    setMarkedDates(generateDateObjects(selectedStartDate, selectedFinDate));
  }, [selectedFinDate, selectedStartDate]);

  return (
    <View style={{ flex: 1 }}>
      <Calendar
        onDayPress={handleDayPress}
        monthFormat={'yyyy년 MM월'}
        dayNames={['일', '월', '화', '수', '목', '금', '토']}
        maxDate={getCurrentDate()}
        onMonthChange={(month) => {
          console.log('month changed', month);
        }}
        markingType={selectedStartDate == selectedFinDate ? undefined : 'period'}
        markedDates={markedDates}
        theme={{
          selectedDayBackgroundColor: Color.GREEN500,
          selectedDayTextColor: '#ffffff',
          todayTextColor: Color.GREEN500,
          dotColor: Color.GREEN500,
          arrowColor: Color.GREEN500,
          monthTextColor: Color.GREEN500,
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
        }}
      />
    </View>
  );
};

export default CustomCalendar;

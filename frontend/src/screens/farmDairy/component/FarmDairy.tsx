import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Typo from '../../../components/typography/Typography';
import * as Color from '../../../config/color/Color';
import { heightPercent, widthPercent } from '../../../config/dimension/Dimension';
import Header from '../../../components/header/Header';
import CustomRadioButton from '../../../components/cutomRadioButton/CutomRadioButton';
import { SetStateAction, useState } from 'react';
import CustomCalendar from '../../../components/customCalendar/CustomCalendar';
import { DropDown } from '../../../components/dropdown/DropDown';
import { Card } from '../../../components/card/Card';
import { Spacer } from '../../../components/basic/Spacer';
import { BasicButton } from '../../../components/button/Buttons';


type FarmDairyProps = {
  data : any[];
}

const FarmDairy = (props: FarmDairyProps) => {
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
    <CustomCalendar data ={{}} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
    <View style={{padding:widthPercent*16}}>
        <Typo.BODY4_M>{formatDate(selectedDate)}</Typo.BODY4_M>
        {/* 여기에 나중에 드롭다운 추가 */}
        <Spacer space={heightPercent * 20}></Spacer>
        {props.data.length !== 0 ? (
          <View style={{marginLeft : widthPercent * 14, marginRight : widthPercent * 14, }}>
            <Card borderColor={Color.BLACK}>
              <View>
                <Spacer space={heightPercent * 10}></Spacer>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <Typo.BODY4_M color={Color.GRAY400}>재배 작물</Typo.BODY4_M>
                  <Typo.BODY4_M >감자(감자 품종1)</Typo.BODY4_M>
                </View>
                <Spacer space={heightPercent * 30}></Spacer>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <Typo.BODY4_M color={Color.GRAY400}>영농 작업</Typo.BODY4_M>
                  <Typo.BODY4_M >씨뿌림</Typo.BODY4_M>
                </View>
                <Spacer space={heightPercent * 10}></Spacer>
              </View>
            </Card>
          </View>
        ) : (
          <View style={{flex : 1, alignItems:'center'}}>
          <Typo.BODY4_M color={Color.GRAY400} >오늘 지출/수입 내역을 작성해주세요</Typo.BODY4_M>
          <Spacer space={heightPercent * 13}></Spacer>
          <BasicButton
            onPress={() => console.log('Button pressed')}
            width={widthPercent * 100}
            height={heightPercent * 40}
            disabled={false}
            backgroundColor={Color.GREEN500}
            borderColor={Color.WHITE}
            borderRadius={10}
          > 
            <Typo.BODY4_M color={Color.WHITE}>일지 작성하기</Typo.BODY4_M>
          </BasicButton>
        </View>
        )} 
    </View>
    </SafeAreaView>
  );
};

export default FarmDairy;

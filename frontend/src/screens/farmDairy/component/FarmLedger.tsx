import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Typo from '../../../components/typography/Typography';
import * as Color from '../../../config/color/Color';
import { heightPercent, widthPercent } from '../../../config/dimension/Dimension';
import { useEffect, useState } from 'react';
import CustomCalendar from '../../../components/customCalendar/CustomCalendar';
import { Card } from '../../../components/card/Card';
import { Spacer } from '../../../components/basic/Spacer';
import styled from 'styled-components/native';
import { BasicButton } from '../../../components/button/Buttons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { getLedgerList } from '../../../apis/farm/farm';

type RootStackParamList = {
  FarmLedgerAddScreen: undefined;
  FarmLedgerDetailScreen: { accountBookId: number, today: string };
};

type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const StyledContainer = styled.View`
  flex-direction: row;
  margin-left: ${widthPercent * 14}px;
  margin-right: ${widthPercent * 14}px;
  border-radius: ${widthPercent * 10}px;
  justify-content: space-between;
  align-items: center;
`;

const StyledView = styled.View`
  width: ${widthPercent * 140}px;
  height: ${heightPercent * 50}px;
  border-radius: ${widthPercent * 10}px;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${Color.GRAY200};
`;

const FarmLedger = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const onPressLedger = () => {
    navigation.push('FarmLedgerAddScreen');
  };

  const handlePress = (accountBookId: number, today: string) => {
    navigation.push('FarmLedgerDetailScreen', { accountBookId: accountBookId , today:today });
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate()).padStart(2, '0'); // 일을 두 자리로 맞추기 위해 문자열로 변환
    return `${month}월 ${day}일`;
  };
  const [income, setIncome] = useState(0);
  const [expenditure, setExpenditure] = useState(0);
  const [selectedStartDate, setSelectedStartDate] = useState(getCurrentDate());
  const [selectedFinDate, setSelectedFinDate] = useState(getCurrentDate());
  const [myCropId, setMyCropId] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        myCropsId: myCropId,
        startDate: selectedStartDate,
        endDate: selectedFinDate,
      };
      const response = await getLedgerList(params);
      const datalist = Object.keys(response.dataBody.contents).sort((a, b) => new Date(a) - new Date(b));
      const sortedData = datalist.map((date) => [date, response.dataBody.contents[date]]);
      setData(sortedData);
      setIncome(response.dataBody.income);
      setExpenditure(response.dataBody.expenditure);
    };
    fetchData();
  }, [navigation, selectedStartDate, selectedFinDate, myCropId]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomCalendar setSelectedStartDate={setSelectedStartDate} setSelectedFinDate={setSelectedFinDate} selectedFinDate={selectedFinDate} selectedStartDate={selectedStartDate} />
      <View style={{ padding: widthPercent * 16 }}>
        <Typo.BODY4_M>
          {formatDate(selectedStartDate)} ~ {formatDate(selectedFinDate)}
        </Typo.BODY4_M>
        <Spacer space={heightPercent * 20}></Spacer>
        {data.length !== 0 ? (
          <View>
            <StyledContainer>
              <StyledView>
                <Typo.Detail1_M color={Color.GRAY400}>수입</Typo.Detail1_M>
                <Typo.BODY3_B>{income}원</Typo.BODY3_B>
              </StyledView>
              <Spacer space={heightPercent * 20} horizontal></Spacer>
              <StyledView>
                <Typo.Detail1_M color={Color.GRAY400}>지출</Typo.Detail1_M>
                <Typo.BODY3_B>{expenditure}원</Typo.BODY3_B>
              </StyledView>
              {/* 여기에 나중에 드롭다운 추가 */}
            </StyledContainer>
            <Spacer space={heightPercent * 20}></Spacer>
            {data.map((item, index) => (
              <View key={index} style={{ flex: 1 }}>
                <Typo.BODY4_M>{item[0]}</Typo.BODY4_M>
                <Spacer space={heightPercent * 20}></Spacer>
                {item[1].map((ledger, ledgerIndex) => (
                  <TouchableOpacity key={ledgerIndex} onPress={() => handlePress(ledger.accountBookId,item[0])} style={{ width: '100%' }}>
                    <Card borderColor={Color.BLACK}>
                      <View>
                        <Spacer space={heightPercent * 10}></Spacer>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Typo.BODY4_M color={Color.GRAY400}>재배 작물</Typo.BODY4_M>
                          <Typo.BODY4_M>{ledger.myCropsSimpleResponse.myCropsName}</Typo.BODY4_M>
                        </View>
                        <Spacer space={heightPercent * 10}></Spacer>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Typo.BODY4_M color={Color.GRAY400}>거래처</Typo.BODY4_M>
                          <Typo.BODY4_M>{ledger.title}</Typo.BODY4_M>
                        </View>
                        <Spacer space={heightPercent * 10}></Spacer>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Typo.BODY4_M color={Color.GRAY400}>금액</Typo.BODY4_M>
                          { ledger.finance === 'INCOME' ? <Typo.BODY4_M>+{ledger.amount}원</Typo.BODY4_M> : <Typo.BODY4_M>-{ledger.amount}원</Typo.BODY4_M>}
                        </View>
                        <Spacer space={heightPercent * 10}></Spacer>
                      </View>
                    </Card>
                    <Spacer space={heightPercent * 20} />
                  </TouchableOpacity>
                ))}
              </View>
            ))}
            <View style={{ flex: 1, alignItems: 'center' }}>
              <BasicButton
                onPress={onPressLedger}
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
          </View>
        ) : (
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Typo.BODY4_M color={Color.GRAY400}>오늘 지출/수입 내역을 작성해주세요</Typo.BODY4_M>
            <Spacer space={heightPercent * 13}></Spacer>
            <BasicButton
              onPress={onPressLedger}
              width={widthPercent * 100}
              height={heightPercent * 40}
              disabled={false}
              backgroundColor={Color.GREEN500}
              borderColor={Color.WHITE}
              borderRadius={10}
            >
              <Typo.BODY4_M color={Color.WHITE}>장부 작성하기</Typo.BODY4_M>
            </BasicButton>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default FarmLedger;

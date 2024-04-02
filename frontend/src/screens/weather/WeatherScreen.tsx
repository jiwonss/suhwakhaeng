import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import Header from '../../components/header/Header';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import styled from 'styled-components/native';
import Location from '../../../assets/icons/location.svg';
import { ActivityIndicator, View } from 'react-native';
import { Spacer } from '../../components/basic/Spacer';
import MenuButton from '../../components/menuButton/MenuButton';
import WeatherInfo from '../../components/weather/WeatherInfo';
import { LineChart } from 'react-native-chart-kit';
import { useEffect, useState } from 'react';
import { getLocation, getVilageFcst } from '../../apis/services/weather/weather';
import { WatherItem } from '../../components/plantAdd/PlantAdd';
import { BasicButton } from '../../components/button/Buttons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${Color.WHITE};
  position: relative;
`;
const StyledContainer = styled.View`
  width: ${widthPercent * 288}px;
  border-radius: 10px;
  height: ${widthPercent * 288}px;
  background-color: ${Color.GRAY100};
  border: 1px solid ${Color.GRAY200};
  padding: ${heightPercent * 20}px 0px;
  display: flex;
`;

const TextContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: ${heightPercent * 80}px;
  row-gap: ${heightPercent * 20}px;
`;

const FormContainer = styled.View`
  flex-direction: column;
  justify-content: center;
`;

const FormItemContainer0 = styled.View`
  flex: 1;
  align-items: center;
  padding: ${heightPercent * 8}px ${widthPercent * 20}px;
`;

const FormItemContainer1 = styled.View`
  padding: ${heightPercent * 8}px ${widthPercent * 20}px;
`;
const FormItemContainer = styled.View`
  padding: ${heightPercent * 8}px ${widthPercent * 20}px;
`;

type RootStackParamList = {
  ModifyProfileScreen: { sido: string; gugun: string; dong: string; address: string };
  PostCodeScreen: undefined;
};

type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const WeatherScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const [weatherInfo, setWeatherInfo] = useState({});
  const [nowData, setNowData] = useState({});
  const [Graph, setGraph] = useState([]);
  const [Sido, setSido] = useState('');
  const [lender, setLender] = useState(1);

  const getCurrentDateTime = () => {
    const today = new Date();
    const year = today.getFullYear();
    today.setHours(today.getHours() + 9);
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const pastday = String(today.getDate() - 1).padStart(2, '0');
    const hours = String(today.getHours()).padStart(2, '0');
    return { date: `${year}${month}${day}`, pastdate: `${year}${month}${pastday}`, hours: `${hours}00` };
  };

  const onPressDairy = () => {
    navigation.push('ModifyProfileScreen', {
      sido: '',
      gugun: '',
      dong: '',
      address: '',
    });
  };

  const dateData = getCurrentDateTime();
  useEffect(() => {
    const fetchData = async () => {
      // 1. 유저 정보에서 시도군 정보 가져오기
      const location = await getLocation();
      // 1.1 없다면 설정페이지로 보내버리기
      if (location.x === 0) {
        setLender(0);
        return;
      }
      // 3. 날씨 api 가져오기
      // const response = await getWeather(37.5665, 126.978);
      const response = await getVilageFcst(dateData.pastdate, dateData.date, dateData.hours, location.x, location.y);
      // 4. 전처리
      let processData = response.data[dateData.hours];

      const pyt_code = { 0: '강수 없음', 1: '비', 2: '비/눈', 3: '눈', 4: '소나기' };
      const sky_code = { 1: '맑음', 3: '구름많음', 4: '흐림' };
      const degCode = {
        0: '북',
        360: '북',
        180: '남',
        270: '서',
        90: '동',
        22.5: '북북동',
        45: '북동',
        67.5: '동북동',
        112.5: '동남동',
        135: '남동',
        157.5: '남남동',
        202.5: '남남서',
        225: '남서',
        247.5: '서남서',
        292.5: '서북서',
        315: '북서',
        337.5: '북북서',
      };
      const degToDir = (deg) => {
        let closeDir = '';
        let minAbs = 360;
        if (!(deg in degCode)) {
          for (const key in degCode) {
            if (Math.abs(key - deg) < minAbs) {
              minAbs = Math.abs(key - deg);
              closeDir = degCode[key];
            }
          }
        } else {
          closeDir = degCode[deg];
        }
        return closeDir;
      };

      processData = { ...processData, PTY: pyt_code[processData['PTY']], SKY: sky_code[processData['SKY']], VEC: degToDir(processData['VEC']) };

      if (processData.PTY !== '강수 없음') {
        processData = { ...processData, SKY: processData['PTY'] };
      }

      console.log(processData);
      setGraph([
        response.data['0000']['TMP'],
        response.data['0300']['TMP'],
        response.data['0600']['TMP'],
        response.data['0900']['TMP'],
        response.data['1200']['TMP'],
        response.data['1500']['TMP'],
        response.data['1800']['TMP'],
        response.data['2100']['TMP'],
        response.data['2300']['TMP'],
      ]);
      setNowData(processData);
      setWeatherInfo(response);
      setSido(location.location);
      setLender(2);
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Header type='default' title='날씨' firstIcon='exit' />
      {lender === 0 && (
        <TextContainer>
          <FormItemContainer0>
            <Typo.BODY2_M color={Color.BLACK}>위치 정보가 없습니다</Typo.BODY2_M>
            <Spacer space={heightPercent * 10}></Spacer>
            <Typo.BODY2_M color={Color.BLACK}>위치 설정 해주세요</Typo.BODY2_M>
            <Spacer space={heightPercent * 20}></Spacer>
            <BasicButton
              onPress={onPressDairy}
              width={widthPercent * 120}
              height={heightPercent * 40}
              disabled={false}
              backgroundColor={Color.GREEN500}
              borderColor={Color.WHITE}
              borderRadius={10}
            >
              <Typo.BODY4_M color={Color.WHITE}>위치 설정하러가기</Typo.BODY4_M>
            </BasicButton>
          </FormItemContainer0>
        </TextContainer>
      )}
      {lender === 1 && (
        <TextContainer>
          <ActivityIndicator size='large' />
        </TextContainer>
      )}
      {lender === 2 && (
        <FormContainer>
          <FormItemContainer>
            <View style={{ flexDirection: 'row' }}>
              <Location width={widthPercent * 20} height={heightPercent * 20}></Location>
              <Spacer space={widthPercent * 5} horizontal></Spacer>
              <Typo.BODY2_M>{Sido}</Typo.BODY2_M>
            </View>
          </FormItemContainer>
          <FormItemContainer>
            <View style={{ marginLeft: widthPercent * 20 }}>
              <View style={{ flexDirection: 'row' }}>
                <WatherItem name={nowData.SKY}></WatherItem>
                <Spacer space={widthPercent * 5} horizontal></Spacer>
                <Typo.BODY3_M>{nowData.SKY}</Typo.BODY3_M>
              </View>
              <Spacer space={heightPercent * 5}></Spacer>
              <Typo.BODY1_B color={Color.GREEN600}>{nowData.TMP}도</Typo.BODY1_B>
              <Spacer space={heightPercent * 5}></Spacer>
              <Typo.BODY4_M>최고온도 {weatherInfo.max_tmp}도</Typo.BODY4_M>
              <Spacer space={heightPercent * 5}></Spacer>
              <Typo.BODY4_M>최저온도 {weatherInfo.min_tmp}도</Typo.BODY4_M>
            </View>
          </FormItemContainer>
          <FormItemContainer>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <MenuButton size={'small'} title={'강수 확률'} onPressButton={() => {}}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                  <Typo.BODY1_B color={Color.GREEN600}>{nowData.POP}</Typo.BODY1_B>
                  <Typo.Detail1_M color={Color.GREEN600}>%</Typo.Detail1_M>
                </View>
              </MenuButton>
              <MenuButton size={'small'} title={'습도'} onPressButton={() => {}}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                  <Typo.BODY1_B color={Color.GREEN600}>{nowData.REH}</Typo.BODY1_B>
                  <Typo.Detail1_M color={Color.GREEN600}>%</Typo.Detail1_M>
                </View>
              </MenuButton>
              <MenuButton size={'small'} title={'풍향'} onPressButton={() => {}}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                  <Typo.BODY1_B color={Color.GREEN600}>{nowData.VEC}</Typo.BODY1_B>
                </View>
              </MenuButton>
              <MenuButton size={'small'} title={'풍속'} onPressButton={() => {}}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                  <Typo.BODY1_B color={Color.GREEN600}>{nowData.WSD}</Typo.BODY1_B>
                  <Typo.Detail1_M color={Color.GREEN600}>mm</Typo.Detail1_M>
                </View>
              </MenuButton>
            </View>
          </FormItemContainer>
          <FormItemContainer>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <StyledContainer>
                <Spacer space={heightPercent * 10}></Spacer>

                <Spacer space={heightPercent * 10}></Spacer>
                {weatherInfo.data && (
                  <LineChart
                    data={{
                      labels: ['0', '6', '12', '18', '24'],
                      datasets: [
                        {
                          data: Graph,
                        },
                      ],
                    }}
                    width={widthPercent * 288}
                    height={widthPercent * 228}
                    withDots={false} // 데이터 포인트에 점 표시
                    yAxisSuffix={'도'}
                    xAxisLabel={'시'}
                    withHorizontalLines={false}
                    withVerticalLines={false}
                    bezier
                    chartConfig={{
                      backgroundColor: Color.GRAY200,
                      backgroundGradientFrom: Color.GRAY100,
                      backgroundGradientTo: Color.GRAY100,
                      color: () => Color.BLACK,
                      labelColor: () => Color.BLACK,
                      decimalPlaces: 0,
                    }}
                  ></LineChart>
                )}
              </StyledContainer>
            </View>
          </FormItemContainer>
          <FormItemContainer>
            <View style={{ margin: widthPercent * 20, flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <WeatherInfo content1={`풍속(동서) ${nowData.UUU}m/s`} content2={`풍속(남북) ${nowData.VVV}m/s`}></WeatherInfo>
                <Spacer space={heightPercent * 10}></Spacer>
              </View>
              <View style={{ flex: 1 }}>
                <WeatherInfo content1={`강수량 ${nowData.PCP}`} content2={`강수량 ${nowData.SNO}`}></WeatherInfo>
                <Spacer space={heightPercent * 10}></Spacer>
              </View>
            </View>
          </FormItemContainer>
        </FormContainer>
      )}
    </Container>
  );
};

export default WeatherScreen;

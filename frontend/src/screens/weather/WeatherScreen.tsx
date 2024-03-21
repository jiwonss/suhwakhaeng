import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import Header from '../../components/header/Header';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import styled from 'styled-components/native';
import Location from '../../../assets/icons/location.svg';
import Sun from '../../../assets/icons/Sun.svg';
import { View } from 'react-native';
import { Spacer } from '../../components/basic/Spacer';
import MenuButton from '../../components/menuButton/MenuButton';
import WeatherInfo from '../../components/weather/WeatherInfo';
import { LineChart } from 'react-native-chart-kit';

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

const FormContainer = styled.View`
  flex-direction: column;
  justify-content: center;
`;

const FormItemContainer = styled.View`
  padding: ${heightPercent * 8}px ${widthPercent * 20}px;
`;

const WeatherScreen = () => {
  return (
    <Container>
      <Header type='default' title='날씨' firstIcon='exit' />
      <FormContainer>
        <FormItemContainer>
          <View style={{ flexDirection: 'row' }}>
            <Location width={widthPercent * 20} height={heightPercent * 20}></Location>
            <Spacer space={widthPercent * 5} horizontal></Spacer>
            <Typo.BODY2_M>광주광역시 서구 금호2동</Typo.BODY2_M>
          </View>
        </FormItemContainer>
        <FormItemContainer>
          <View style={{ marginLeft: widthPercent * 20 }}>
            <View style={{ flexDirection: 'row' }}>
              <Sun width={widthPercent * 16} height={heightPercent * 16}></Sun>
              <Spacer space={widthPercent * 5} horizontal></Spacer>
              <Typo.BODY3_M>맑음</Typo.BODY3_M>
            </View>
            <Spacer space={heightPercent * 5}></Spacer>
            <Typo.BODY1_B color={Color.GREEN600}>14C</Typo.BODY1_B>
            <Spacer space={heightPercent * 5}></Spacer>
            <Typo.BODY4_M>최고온도 16도</Typo.BODY4_M>
            <Spacer space={heightPercent * 5}></Spacer>
            <Typo.BODY4_M>최저온도 5도</Typo.BODY4_M>
          </View>
        </FormItemContainer>
        <FormItemContainer>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <MenuButton size={'small'} title={'강수량'} onPressButton={() => {}}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <Typo.BODY1_B color={Color.GREEN600}>0</Typo.BODY1_B>
                <Typo.Detail1_M color={Color.GREEN600}>mm</Typo.Detail1_M>
              </View>
            </MenuButton>
            <MenuButton size={'small'} title={'온도'} onPressButton={() => {}}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <Typo.BODY1_B color={Color.GREEN600}>39</Typo.BODY1_B>
                <Typo.Detail1_M color={Color.GREEN600}>mm</Typo.Detail1_M>
              </View>
            </MenuButton>
            <MenuButton size={'small'} title={'이슬점'} onPressButton={() => {}}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <Typo.BODY1_B color={Color.GREEN600}>-0.2</Typo.BODY1_B>
                <Typo.Detail1_M color={Color.GREEN600}>mm</Typo.Detail1_M>
              </View>
            </MenuButton>
            <MenuButton size={'small'} title={'바람'} onPressButton={() => {}}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <Typo.BODY1_B color={Color.GREEN600}>2.3</Typo.BODY1_B>
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
              <LineChart
                data={{
                  labels: ['12', '15', '18', '21', '24'],
                  datasets: [
                    {
                      data: [3, 4, 5, 10, 20],
                    },
                  ],
                }}
                width={widthPercent * 288}
                height={widthPercent * 228}
                withDots={true} // 데이터 포인트에 점 표시
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
              />
            </StyledContainer>
          </View>
        </FormItemContainer>
        <FormItemContainer>
          <View style={{ margin: widthPercent * 20, flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <WeatherInfo content1={'일출 7:04'} content2={'일몰 18:41'}></WeatherInfo>
              <Spacer space={heightPercent * 10}></Spacer>
              <WeatherInfo content1={'일출 7:04'} content2={'일몰 18:41'}></WeatherInfo>
              <Spacer space={heightPercent * 10}></Spacer>
              <WeatherInfo content1={'일출 7:04'} content2={'일몰 18:41'}></WeatherInfo>
              <Spacer space={heightPercent * 10}></Spacer>
              <WeatherInfo content1={'일출 7:04'} content2={'일몰 18:41'}></WeatherInfo>
            </View>
            <View style={{ flex: 1 }}>
              <WeatherInfo content1={'일출 7:04'} content2={'일몰 18:41'}></WeatherInfo>
              <Spacer space={heightPercent * 10}></Spacer>
              <WeatherInfo content1={'일출 7:04'} content2={'일몰 18:41'}></WeatherInfo>
              <Spacer space={heightPercent * 10}></Spacer>
              <WeatherInfo content1={'일출 7:04'} content2={'일몰 18:41'}></WeatherInfo>
              <Spacer space={heightPercent * 10}></Spacer>
              <WeatherInfo content1={'일출 7:04'} content2={'일몰 18:41'}></WeatherInfo>
            </View>
          </View>
        </FormItemContainer>
      </FormContainer>
    </Container>
  );
};

export default WeatherScreen;

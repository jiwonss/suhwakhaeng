import { ScrollView, View } from 'react-native';
import styled from 'styled-components/native';
import Calendar3D from '../../../assets/icons/calendar3D.svg';
import Search3D from '../../../assets/icons/search3D.svg';
import { Spacer } from '../../components/basic/Spacer';
import { NewsItemCard } from '../../components/card/NewsItemCard';
import Header from '../../components/header/Header';
import MenuButton from '../../components/menuButton/MenuButton';
import BottomNavigation from '../../components/navigation/BottomNavigation';
import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { useNavigation } from '@react-navigation/native';

const Container = styled.View`
  margin-left: ${20 * widthPercent}px;
  margin-right: ${20 * widthPercent}px;
  margin-bottom: ${20 * heightPercent}px;
  row-gap: ${5 * heightPercent}px;
`;

const DiseasePlantScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }} contentContainerStyle={{ paddingBottom: 50 * heightPercent }}>
        {/*헤더*/}
        <Header type={'default'} title={'작물 병원'} />
        <Spacer space={20} />
        <Container>
          <Typo.BODY4_M>
            user.name님, 작물의 <Typo.BODY4_M color={Color.GREEN500}>상태</Typo.BODY4_M>를 확인해볼까요?
          </Typo.BODY4_M>
        </Container>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <MenuButton size='big' title='작물 검색' borderColor={Color.GREEN50} onPressButton={() => navigation.navigate('MainScreen')}>
            <Search3D width={widthPercent * 40} height={heightPercent * 40} />
          </MenuButton>
          <Spacer horizontal={true} space={40} />
          <MenuButton size='big' title='질병 진단' onPressButton={() => {}}>
            <Calendar3D width={widthPercent * 40} height={heightPercent * 40} />
          </MenuButton>
        </View>
        <Spacer space={40} />
        <Container>
          <Typo.BODY4_M>
            최근 농업에선 <Typo.BODY4_M color={Color.GREEN500}>어떤 일</Typo.BODY4_M>들이 있었을까요?
          </Typo.BODY4_M>
        </Container>
        <NewsItemCard company={'회사'} content={'컨텐츠'} date={'날짜'} href={'하이퍼링크'} title={'제목'} uri={'유알아이'} />
      </ScrollView>
      {/*<BottomNavigation />*/}
    </View>
  );
};

export default DiseasePlantScreen;

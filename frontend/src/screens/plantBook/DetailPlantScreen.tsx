import * as Color from '../../config/color/Color';
import { ScrollView, View } from 'react-native';
import Header from '../../components/header/Header';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import styled from 'styled-components/native';
import { Spacer } from '../../components/basic/Spacer';
import BottomNavigation from '../../components/navigation/BottomNavigation';
import * as Typo from '../../components/typography/Typography';
import MenuButton from '../../components/menuButton/MenuButton';
import Search3D from '../../../assets/icons/search3D.svg';
import Calendar3D from '../../../assets/icons/calendar3D.svg';
import { NewsItemCard } from '../../components/card/NewsItemCard';

const Container = styled.View`
  margin-left: ${20 * widthPercent}px;
  margin-right: ${20 * widthPercent}px;
  margin-bottom: ${20 * heightPercent}px;
  row-gap: ${5 * heightPercent}px;
`;

const DetailPlantScreen = () => {
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
          <MenuButton size='big' title='작물 검색' borderColor={Color.GREEN50} onPressButton={() => {}}>
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
      <BottomNavigation />
    </View>
  );
};

export default DetailPlantScreen;

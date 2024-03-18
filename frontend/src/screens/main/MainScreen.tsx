import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import Header from '../../components/header/Header';
import MenuButton from '../../components/menuButton/MenuButton';
import Calendar3D from '../../../assets/icons/calendar3D.svg';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import Search3D from '../../../assets/icons/search3D.svg';
import Bag3D from '../../../assets/icons/bag3D.svg';
import Coin3D from '../../../assets/icons/coin3D.svg';
import { Spacer } from '../../components/basic/Spacer';

const MainScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }}>
        <Header type={'leftTitle'} />
        <Spacer horizontal={false} space={19} />
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Spacer horizontal={true} space={20} />
          <Typo.BODY4_M color={Color.BLACK}>
            내가 키우는 농작물, <Typo.BODY4_M color={Color.GREEN600}>수확행</Typo.BODY4_M>에서 관리 해보세요!
          </Typo.BODY4_M>
        </View>
        <Spacer horizontal={false} space={19} />

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <MenuButton size='small' title='작물 검색' borderColor={Color.GREEN50} onPressButton={() => {}}>
            <Search3D width={widthPercent * 36} height={heightPercent * 36} />
          </MenuButton>
          <Spacer horizontal={true} space={20} />
          <MenuButton size='small' title='영농일지' onPressButton={() => {}}>
            <Calendar3D width={widthPercent * 36} height={heightPercent * 36} />
          </MenuButton>
          <Spacer horizontal={true} space={20} />
          <MenuButton size='small' title='영농장부' onPressButton={() => {}}>
            <Bag3D width={widthPercent * 36} height={heightPercent * 36} />
          </MenuButton>
          <Spacer horizontal={true} space={20} />
          <MenuButton size='small' title='정부 보조금' onPressButton={() => {}}>
            <Coin3D width={widthPercent * 36} height={heightPercent * 36} />
          </MenuButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainScreen;

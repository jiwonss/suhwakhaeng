import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Bag3D from '../../../assets/icons/bag3D.svg';
import Calendar3D from '../../../assets/icons/calendar3D.svg';
import Coin3D from '../../../assets/icons/coin3D.svg';
import Leaf3D from '../../../assets/icons/leaf3D.svg';
import { Spacer } from '../../components/basic/Spacer';
import CustomRadioButton from '../../components/cutomRadioButton/CutomRadioButton';
import Header from '../../components/header/Header';
import MenuButton from '../../components/menuButton/MenuButton';
import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';
// import Post from '../../components/post/Post';

const MainScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const Data = [
    { content: '전체', event: () => setActiveIndex(0), active: activeIndex === 0 },
    { content: '자유', event: () => setActiveIndex(1), active: activeIndex === 1 },
    { content: '꿀팁', event: () => setActiveIndex(2), active: activeIndex === 2 },
    { content: '나눔', event: () => setActiveIndex(3), active: activeIndex === 3 },
    { content: '질문', event: () => setActiveIndex(4), active: activeIndex === 4 },
  ];

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
          <MenuButton size='small' title='작물 진단' borderColor={Color.GREEN50} onPressButton={() => navigation.navigate('DiseasePlantScreen')}>
            <Leaf3D width={widthPercent * 36} height={heightPercent * 36} />
          </MenuButton>
          <Spacer horizontal={true} space={20} />
          <MenuButton
            size='small'
            title='영농일지'
            onPressButton={() => {
              console.log('영농일지');
            }}
          >
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
        <Spacer horizontal={false} space={10} />
        <CustomRadioButton data={Data} />
        {/*<Post postData={} onPress={} />*/}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainScreen;

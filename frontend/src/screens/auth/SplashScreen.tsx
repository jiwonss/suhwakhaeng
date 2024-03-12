import { ScrollView, Text, Touchable, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import HomeActive from '../../../assets/icons/homeActive.svg';
import SearchDefault from '../../../assets/icons/searchDefault.svg';
import HospitalDefault from '../../../assets/icons/hospitalDefault.svg';
import ShopDefault from '../../../assets/icons/shopDefault.svg';
import ProfileDefault from '../../../assets/icons/profileDefault.svg';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/header/Header';
import MenuButton from '../../components/menuButton/MenuButton';
import Search3D from '../../../assets/icons/search3D.svg';
import Calendar3D from '../../../assets/icons/calendar3D.svg';
import { useState } from 'react';
import CustomRadioButton from '../../components/cutomRadioButton/CutomRadioButton';
import ImgThumbnail from '../../components/imgThumbnail/ImgThumbnail';

type RootStackParamList = {
  OauthScreen: undefined;
  SplashScreen: undefined;
};

type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const SplashScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [activeIndex, setActiveIndex] = useState(0);
  const Data = [
    { content: '자유', event: () => setActiveIndex(0), active: activeIndex === 0 },
    { content: '꿀팁', event: () => setActiveIndex(1), active: activeIndex === 1 },
    { content: '농작', event: () => setActiveIndex(2), active: activeIndex === 2 },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <Text>SplashScreen</Text>
      <Typo.H1 color={Color.GREEN500}>수확행</Typo.H1>
      <Typo.BODY0_B color={Color.GREEN100}>수확행</Typo.BODY0_B>
      <Typo.BODY1_B color={Color.GRAY400}>수확행</Typo.BODY1_B>
      <Typo.BODY2_B color={Color.RED200}>수확행</Typo.BODY2_B>
      <Typo.BODY3_B color={Color.BLUE300}>수확행</Typo.BODY3_B>
      <Typo.BODY4_B color={Color.KAKAO}>수확행</Typo.BODY4_B>
      <Typo.BODY0_M numberOfLines={1}>글을 길게 쓰면 이렇게 생략이 됩니다</Typo.BODY0_M>
      <Typo.BODY1_M numberOfLines={2}>
        글을 길게 쓰면 이렇게 생략이 됩니다글을 길게 쓰면 이렇게 생략이 됩니다글을 길게 쓰면 이렇게 생략이 됩니다글을 길게 쓰면 이렇게 생략이 됩니다
      </Typo.BODY1_M>
      <Typo.BODY2_M>수확행</Typo.BODY2_M>
      <Typo.BODY3_M>수확행</Typo.BODY3_M>
      <Typo.BODY4_M>수확행</Typo.BODY4_M>

      <View style={{ flexDirection: 'row' }}>
        <HomeActive width={widthPercent * 24} height={heightPercent * 24} />
        <SearchDefault width={widthPercent * 24} height={heightPercent * 24} />
        <HospitalDefault width={widthPercent * 24} height={heightPercent * 24} />
        <ShopDefault width={widthPercent * 24} height={heightPercent * 24} />
        <ProfileDefault width={widthPercent * 24} height={heightPercent * 24} />
      </View>
      <View style={{ width: widthPercent * 230 }}>
        <Typo.BODY4_M numberOfLines={3}>
          부직포 벗긴 밭에 풀이 너무 많아 뽑기를 포기하고 ‘트리부닐’을 살포했습니다. 멀칭이 있어서 제초가 어려워 두둑배 갈라서 멀칭을 제거했습니다
        </Typo.BODY4_M>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('OauthScreen');
        }}
      >
        <Typo.H1>이동</Typo.H1>
      </TouchableOpacity>

      <MenuButton size='small' title='강수량' onPressButton={() => {}}>
        <Typo.BODY1_B color={Color.GREEN600}>0</Typo.BODY1_B>
        <Typo.Detail1_M color={Color.GREEN600}>mm</Typo.Detail1_M>
      </MenuButton>
      <MenuButton size='small' title='영농일지' onPressButton={() => {}}>
        <Calendar3D width={widthPercent * 36} height={heightPercent * 36} />
      </MenuButton>

      <MenuButton size='big' title='작물 검색' borderColor={Color.GREEN50} onPressButton={() => {}}>
        <Search3D width={widthPercent * 36} height={heightPercent * 36} />
      </MenuButton>

      <CustomRadioButton data={Data} />
      <ImgThumbnail width={70} height={70}></ImgThumbnail>
      <ImgThumbnail width={80} height={80}></ImgThumbnail>
    </ScrollView>
  );
};

export default SplashScreen;

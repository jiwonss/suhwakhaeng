import { ComponentType, useEffect, useState } from 'react';
import { SvgProps } from 'react-native-svg';
import { ScrollView, View } from 'react-native';
import styled from 'styled-components/native';
import { Spacer } from '../../components/basic/Spacer';
import { BasicButton } from '../../components/button/Buttons';
import Header from '../../components/header/Header';
import { SearchInputBox } from '../../components/inputBox/Input';
import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { getCropsData } from '../../apis/services/crops/CropsList';
// 작물 이모지 컴포넌트
import BellPepper from '../../../assets/icons/bellPepper.svg';
import Carrot from '../../../assets/icons/carrot.svg';
import ChiliPepper from '../../../assets/icons/chiliPepper.svg';
import Cucumber from '../../../assets/icons/cucumber.svg';
import Eggplant from '../../../assets/icons/eggplant.svg';
import Garlic from '../../../assets/icons/garlic.svg';
import GreenOnion from '../../../assets/icons/greenOnion.svg';
import Lettuce from '../../../assets/icons/lettuce.svg';
import Onion from '../../../assets/icons/onion.svg';
import Potato from '../../../assets/icons/potato.svg';
import Pumpkin from '../../../assets/icons/pumpkin.svg';
import SweetPotato from '../../../assets/icons/sweetPotato.svg';
import Tomato from '../../../assets/icons/tomato.svg';
import Watermelon from '../../../assets/icons/watermelon.svg';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';

interface Crop {
  id: number;
  name: string;
}

interface Plant {
  id: number;
  name: string;
  Icon?: ComponentType<SvgProps>;
}

const Container = styled.View`
  margin-left: ${20 * widthPercent}px;
  margin-right: ${20 * widthPercent}px;
  margin-bottom: ${20 * heightPercent}px;
  row-gap: ${5 * heightPercent}px;
`;
const PlantContainer = styled.View`
  margin-left: ${20 * widthPercent}px;
  margin-right: ${20 * widthPercent}px;
  margin-bottom: ${20 * heightPercent}px;
  row-gap: ${5 * heightPercent}px;
  column-gap: ${26 * widthPercent}px;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;
export const iconMapping = [
  { engName: 'Eggplant', name: '가지', Icon: Eggplant },
  { engName: 'SweetPotato', name: '고구마', Icon: SweetPotato },
  { engName: 'ChiliPepper', name: '고추', Icon: ChiliPepper },
  { engName: 'Potato', name: '감자', Icon: Potato },
  { engName: 'Carrot', name: '당근', Icon: Carrot },
  { engName: 'Garlic', name: '마늘', Icon: Garlic },
  { engName: 'Lettuce', name: '상추', Icon: Lettuce },
  { engName: 'Watermelon', name: '수박', Icon: Watermelon },
  { engName: 'Onion', name: '양파', Icon: Onion },
  { engName: 'Cucumber', name: '오이', Icon: Cucumber },
  { engName: 'GreenOnion', name: '파', Icon: GreenOnion },
  { engName: 'BellPepper', name: '파프리카', Icon: BellPepper },
  { engName: 'Tomato', name: '토마토', Icon: Tomato },
  { engName: 'Pumpkin', name: '호박', Icon: Pumpkin },
];

const PlantBookScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [searchValue, setSearchValue] = useState<string>('');
  const dummyCount = 3 - (iconMapping.length % 3 || 3);
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    const getData = async () => {
      const { dataBody } = await getCropsData();
      const mappedData = dataBody.map((item: Crop) => {
        const iconItem = iconMapping.find((icon) => icon.engName === item.name); // 영어 이름과 일치하는 아이템 찾기
        return {
          ...item,
          name: iconItem ? iconItem.name : item.name,
          Icon: iconItem ? iconItem.Icon : null,
        };
      });
      setPlants(mappedData);
    };

    getData();
  }, []);

  const onSearch = () => {
    console.log('검색');
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }} contentContainerStyle={{ paddingBottom: 50 * heightPercent }}>
        {/*헤더*/}
        <Header type={'default'} title={'작물도감'} />
        {/*작물검색*/}
        <View style={{ alignItems: 'center' }}>
          <SearchInputBox value={searchValue} setValue={setSearchValue} onSubmitSearch={onSearch} placeHolder={'작물 이름을 입력해주세요'} />
        </View>
        <Spacer space={20} />
        <Container>
          <Typo.BODY4_M>작물 목록</Typo.BODY4_M>
        </Container>
        {/*작물 리스트 가나다순으로 정렬*/}
        <PlantContainer>
          {plants.map((plant, index) => (
            <View key={index} style={{ alignItems: 'center', width: 100, marginBottom: 20 * heightPercent }}>
              <BasicButton
                borderColor={Color.GRAY50}
                backgroundColor={Color.GRAY100}
                borderRadius={50}
                width={80}
                height={80}
                onPress={() => {
                  navigation.navigate('VarietySelectScreen', { plantName: plant.name });
                }}
              >
                {plant.Icon && <plant.Icon width={50} height={50} />}
              </BasicButton>
              <Spacer space={5} />
              <Typo.BODY4_M>{plant.name}</Typo.BODY4_M>
            </View>
          ))}
          {/* 더미 버튼 렌더링 */}
          {Array.from({ length: dummyCount }).map((_, index) => (
            <View key={`dummy-${index}`} style={{ width: 80, height: 80, opacity: 0 }} />
          ))}
        </PlantContainer>
      </ScrollView>
    </View>
  );
};

export default PlantBookScreen;

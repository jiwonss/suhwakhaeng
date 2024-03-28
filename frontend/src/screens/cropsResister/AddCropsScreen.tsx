import React, { ComponentType, useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { SvgProps } from 'react-native-svg';
import styled from 'styled-components/native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Spacer } from '../../components/basic/Spacer';
import { BasicButton } from '../../components/button/Buttons';
import Header from '../../components/header/Header';
import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { getCropsData } from '../../apis/services/crops/Crops';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';
import { iconMapping } from '../crops/CropsScreen';

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

const AddCropsScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    const getData = async () => {
      const { dataBody } = await getCropsData();
      const mappedData = dataBody.map((item: Crop) => {
        const iconItem = iconMapping.find((icon) => icon.engName === item.name);
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

  return (
    <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }} contentContainerStyle={{ paddingBottom: 50 * heightPercent }}>
        <Header type={'default'} firstIcon={'back'} />
        <Container>
          <Typo.BODY2_M>어떤 작물을 추가하시겠어요?</Typo.BODY2_M>
        </Container>
        <PlantContainer>
          {plants.map((plant, index) => (
            <View key={index} style={{ alignItems: 'center', width: 100, marginBottom: 20 * heightPercent }}>
              <BasicButton
                borderColor={Color.GRAY50}
                backgroundColor={Color.GRAY100}
                borderRadius={50}
                width={80}
                height={80}
                onPress={() => navigation.navigate('CropsVarietyScreen', { plantName: plant.name, plantId: plant.id, value: 2 })}
              >
                {plant.Icon && <plant.Icon width={50} height={50} />}
              </BasicButton>
              <Spacer space={5} />
              <Typo.BODY4_M>{plant.name}</Typo.BODY4_M>
            </View>
          ))}
        </PlantContainer>
      </ScrollView>
    </View>
  );
};

export default AddCropsScreen;

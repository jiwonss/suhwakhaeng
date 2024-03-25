import { ScrollView, View } from 'react-native';
import styled from 'styled-components/native';
import { Spacer } from '../../components/basic/Spacer';
import { BasicButton } from '../../components/button/Buttons';
import Header from '../../components/header/Header';
import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { plantData } from '../plantBook/PlantBookScreen';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';

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

const DefaultPlantResisterScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const dummyCount = 3 - (plantData.length % 3 || 3);

  return (
    <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }} contentContainerStyle={{ paddingBottom: 50 * heightPercent }}>
        {/*헤더*/}
        <Header type={'default'} firstIcon={'back'} />
        {/*전체 작물 글자*/}
        <Container>
          <Typo.BODY2_M>어떤 작물을 추가하시겠어요?</Typo.BODY2_M>
        </Container>
        {/*작물 리스트 가나다순으로 정렬*/}
        <PlantContainer>
          {plantData.map((plant, index) => (
            <View key={index} style={{ alignItems: 'center', width: 100, marginBottom: 20 * heightPercent }}>
              <BasicButton
                borderColor={Color.GRAY50}
                backgroundColor={Color.GRAY100}
                borderRadius={50}
                width={80}
                height={80}
                onPress={() => navigation.navigate('KindPlantScreen', { plantName: plant.name })}
              >
                <plant.Icon width={50} height={50} />
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

export default DefaultPlantResisterScreen;

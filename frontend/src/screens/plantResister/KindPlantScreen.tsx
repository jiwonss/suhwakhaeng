import { ScrollView, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { Divider } from '../../components/basic/Divider';
import { Spacer } from '../../components/basic/Spacer';
import Header from '../../components/header/Header';
import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { useRoute } from '@react-navigation/core';
import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';

const Container = styled.View`
  margin-left: ${20 * widthPercent}px;
  margin-right: ${20 * widthPercent}px;
  margin-bottom: ${20 * heightPercent}px;
  row-gap: ${5 * heightPercent}px;
`;

const KindPlantScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'KindPlantScreen'>>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { plantName } = route.params;
  const Select = [{ content: '품종1' }, { content: '품종2' }, { content: '품종3' }];

  const onSubmit = (varietyName: string) => {
    navigation.navigate('EnvironmentPlantScreen', {
      plantName,
      varietyName,
    });
  };
  return (
    <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }} contentContainerStyle={{ paddingBottom: 50 * heightPercent }}>
        {/*헤더*/}
        <Header type={'default'} firstIcon={'back'} title={plantName} />
        <Spacer space={20} />
        {/*품종 선택 안내메시지*/}
        <Container>
          <Typo.BODY2_M>
            현재 <Typo.BODY2_M color={Color.GREEN600}>{plantName}</Typo.BODY2_M>를 <Typo.BODY2_M color={Color.GREEN600}>재배 중</Typo.BODY2_M>이신가요?
          </Typo.BODY2_M>
        </Container>
        {/*품종선택*/}
        <Container>
          {Select.map((item, index) => (
            <View key={index}>
              <TouchableOpacity onPress={() => onSubmit(item.content)}>
                <Spacer space={23} />
                <Typo.BODY3_M>{item.content}</Typo.BODY3_M>
                <Spacer space={23} />
              </TouchableOpacity>
              <Divider marginHorizontal={1} />
            </View>
          ))}
        </Container>
      </ScrollView>
    </View>
  );
};

export default KindPlantScreen;

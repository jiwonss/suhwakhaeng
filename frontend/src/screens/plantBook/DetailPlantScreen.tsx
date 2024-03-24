import { ScrollView, View } from 'react-native';
import styled from 'styled-components/native';
import { Spacer } from '../../components/basic/Spacer';
import Header from '../../components/header/Header';
import * as Color from '../../config/color/Color';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
// import { useRoute } from '@react-navigation/core';
// import { RouteProp } from '@react-navigation/native';
// import { RootStackParamList } from '../../stacks/mainStack/MainStack';

const Container = styled.View`
  margin-left: ${20 * widthPercent}px;
  margin-right: ${20 * widthPercent}px;
  margin-bottom: ${20 * heightPercent}px;
  row-gap: ${5 * heightPercent}px;
`;

const DetailPlantScreen = () => {
  // const route = useRoute<RouteProp<RootStackParamList, 'DetailPlantScreen'>>();
  // const { plantName, varietyName } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }} contentContainerStyle={{ paddingBottom: 50 * heightPercent }}>
        {/*헤더*/}
        <Header type={'default'} firstIcon={'back'} />
        <Spacer space={20} />
      </ScrollView>
    </View>
  );
};

export default DetailPlantScreen;

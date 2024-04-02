import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import styled from 'styled-components/native';
import { Spacer } from '../../components/basic/Spacer';
import { Card } from '../../components/card/Card';
import Header from '../../components/header/Header';
import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';
import { useRoute } from '@react-navigation/core';

interface DiagnosisResult {
  isHealthy?: boolean;
  plant?: string;
  disease?: string;
  environment?: string;
  content?: string;
  protect?: {
    basic?: string[];
  };
}

const Container = styled.View`
    margin-left: ${20 * widthPercent}px;
    margin-right: ${20 * widthPercent}px;
    margin-bottom: ${20 * heightPercent}px;
    row-gap: ${5 * heightPercent}px;
`;
const TextContainer = styled.Text`
    margin-left: ${widthPercent * 8}px;
    width: ${widthPercent * 300 - widthPercent * 24}px;
`;

const ImageContainer = styled.View`
    align-items: center;
    justify-content: center;
    margin-top: ${5 * heightPercent}px;
    margin-bottom: ${20 * heightPercent}px;
`;


const DetailDiseasePlantScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'DetailDiseasePlantScreen'>>();
  const diagnosisResult: DiagnosisResult = route.params.diagnosisResult;
  const photo = route.params.photo;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePressBack = () => {
    navigation.navigate('BottomNavigation', { screen: 'DiseasePlantScreen' });
  };

  const renderProtectContent = () => {
    if (!diagnosisResult.isHealthy && diagnosisResult.protect) {
      if (diagnosisResult.protect.basic) {
        return diagnosisResult.protect.basic.map((item, index) => (
          <TextContainer key={`basic-${index}`}>{item}</TextContainer>
        ));
      } else {
        // 'basic' 이외의 다른 키들에 대한 처리 (선택적)
        return Object.entries(diagnosisResult.protect).map(([key, value]) => (
          <View key={key}>
            <Typo.BODY3_M>- {key}</Typo.BODY3_M>
            <Spacer space={5} />
            {value.map((item, index) => (
              <TextContainer key={`${key}-${index}`}>{item}</TextContainer>
            ))}
            <Spacer space={15} />
          </View>
        ));
      }
    }
    return null; // 작물이 건강할 경우 또는 protect 정보가 없을 경우
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }}
                  contentContainerStyle={{ paddingBottom: 50 * heightPercent }}>
        <Header type={'default'} firstIcon={'back'} onPressFirstIcon={handlePressBack} />
        <ImageContainer>
          <Image source={{ uri: photo.uri }} style={{ width: 300, height: 300 }} />
        </ImageContainer>
        <Container>
          <Typo.BODY1_M>
            {
              diagnosisResult.isHealthy ?
                '' :
                <Typo.BODY1_M>{diagnosisResult.plant} - {diagnosisResult.disease ||
                  <Typo.BODY1_M>이 작물은 <Typo.BODY1_M
                    color={Color.GREEN600}>건강</Typo.BODY1_M>합니다.</Typo.BODY1_M>}</Typo.BODY1_M>
            }
          </Typo.BODY1_M>
        </Container>
        <Spacer space={20} />
        {/* 추가적인 정보 표시 */}
        {!diagnosisResult.isHealthy && (
          <>
            <Container>
              <Typo.BODY3_M>발생 환경</Typo.BODY3_M>
              <Card backgroundColor={Color.GRAY100} width={widthPercent * 300}>
                <TextContainer>{diagnosisResult.environment}</TextContainer>
              </Card>
              <Spacer space={15} />
              <Typo.BODY3_M>주요 증상</Typo.BODY3_M>
              <Card backgroundColor={Color.GRAY100} width={widthPercent * 300}>
                <TextContainer>{diagnosisResult.content}</TextContainer>
              </Card>
              <Spacer space={15} />
              <Typo.BODY3_M>예방 및 방제 대책</Typo.BODY3_M>
              <Card backgroundColor={Color.GRAY100} width={widthPercent * 300}>
                {renderProtectContent()}
              </Card>
            </Container>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default DetailDiseasePlantScreen;

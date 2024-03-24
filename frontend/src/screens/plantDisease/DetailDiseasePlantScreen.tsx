import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import styled from 'styled-components/native';
import { Spacer } from '../../components/basic/Spacer';
import { Card } from '../../components/card/Card';
import Header from '../../components/header/Header';
import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';
// import { useRoute } from '@react-navigation/core';
// import { RouteProp } from '@react-navigation/native';
// import { RootStackParamList } from '../../stacks/mainStack/MainStack';

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
  // const route = useRoute<RouteProp<RootStackParamList, 'DetailDiseasePlantScreen'>>();
  // const { photo } = route.params;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePressBack = () => {
    navigation.navigate('DiseasePlantScreen');
  };

  const photo =
    'https://previews.123rf.com/images/virtosmedia/virtosmedia2303/virtosmedia230313583/199713431-%ED%91%B8%EB%A5%B8-%ED%95%98%EB%8A%98-%EB%B0%B0%EA%B2%BD%EC%97%90-%EB%B6%84%ED%99%8D%EC%83%89-%EA%BD%83%EC%9D%B4-%EB%A7%8C%EB%B0%9C%ED%95%9C-%EB%B2%9A%EA%BD%83%EB%82%98%EB%AC%B4-%EA%B0%80%EC%A7%80.jpg';
  return (
    <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }} contentContainerStyle={{ paddingBottom: 50 * heightPercent }}>
        {/*헤더*/}
        <Header type={'default'} firstIcon={'back'} onPressFirstIcon={handlePressBack} />
        <ImageContainer>
          <Image source={{ uri: photo }} style={{ width: 300, height: 300 }} />
        </ImageContainer>
        <Container>
          <Typo.BODY1_M>plant - disease</Typo.BODY1_M>
        </Container>
        <Spacer space={20} />
        {/*상세내용*/}
        <Container>
          <Typo.BODY3_M>environment</Typo.BODY3_M>
          <Card backgroundColor={Color.GRAY100} width={widthPercent * 300}>
            <TextContainer>원인이 들어갑니다.</TextContainer>
          </Card>
          <Spacer space={15} />

          <Typo.BODY3_M>content</Typo.BODY3_M>
          <Card backgroundColor={Color.GRAY100} width={widthPercent * 300}>
            <TextContainer>증상이 들어갑니다.</TextContainer>
          </Card>
          <Spacer space={15} />

          <Typo.BODY3_M>protect</Typo.BODY3_M>
          <Card backgroundColor={Color.GRAY100} width={widthPercent * 300}>
            {/*베이직이면 이렇게*/}
            <TextContainer>방제 대책이 들어갑니다.</TextContainer>
            {/* 베이직이 아니라 여러개의 리스트면 map 사용해서 출력*/}
          </Card>
        </Container>
      </ScrollView>
    </View>
  );
};

export default DetailDiseasePlantScreen;

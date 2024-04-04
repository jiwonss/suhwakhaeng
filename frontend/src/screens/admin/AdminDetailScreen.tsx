import styled from 'styled-components/native';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import { Alert, Image, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { BasicButton } from '../../components/button/Buttons';
import { Spacer } from '../../components/basic/Spacer';
import { UriImageLoader } from '../../components/image/ImageLoader';
import { allowBusiness } from '../../apis/services/admin/Admin';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';

interface AdminDetailProps {
  route: {
    params: {
      businessId: number;
      nickname: string;
      image: string;
    };
  };
}

const UserImage = styled.View`
  width: 100%;
  border: 1px solid black;
`;
type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const AdminDetailScreen = (props: AdminDetailProps) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <Container>
      <Header type='default' firstIcon='back' title={props.route.params.nickname} />
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <UriImageLoader uri={props.route.params.image} style={{ width: '100%', height: 'auto', aspectRatio: 1 }} resizeMode='center' />
        <Spacer space={heightPercent * 20}></Spacer>
        <BasicButton
          onPress={() => {
            allowBusiness(props.route.params.businessId);
            Alert.alert('수확행', '승인하였습니다');
            navigation.push('BottomNavigation', { screen: 'MyProfileScreen' });
          }}
          width={widthPercent * 150}
          height={heightPercent * 40}
          borderColor={Color.GREEN500}
          borderRadius={10}
        >
          <Typo.BODY4_M color={Color.WHITE}>사업자 등록 허가</Typo.BODY4_M>
        </BasicButton>
      </View>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${Color.WHITE};
`;

export default AdminDetailScreen;

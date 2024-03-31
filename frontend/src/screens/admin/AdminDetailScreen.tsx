import styled from 'styled-components/native';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import { Image, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { BasicButton } from '../../components/button/Buttons';
import { Spacer } from '../../components/basic/Spacer';

interface AdminDetailProps {
  route: {
    params: {
      id: any;
    };
  };
}

const UserImage = styled.View`
  width: 100%;
  border: 1px solid black;
`;

const AdminDetailScreen = (props: AdminDetailProps) => {
  return (
    <Container>
      <Header type='default' firstIcon='back' title='김범수' />
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <UserImage source={{ uri: 'http://example.com/image.jpg' }} style={{ width: '100%', height: 'auto', aspectRatio: 1 }} resizeMode='center' />
        <Spacer space={heightPercent * 20}></Spacer>
        <BasicButton onPress={() => {}} width={widthPercent * 150} height={heightPercent * 40} borderColor={Color.GREEN500} borderRadius={10}>
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

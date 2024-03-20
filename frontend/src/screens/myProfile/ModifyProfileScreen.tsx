import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import Header from '../../components/header/Header';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { BasicButton } from '../../components/button/Buttons';
import { SingleLineInputBox } from '../../components/inputBox/Input';
import { DropDown } from '../../components/dropdown/DropDown';
import ProfileImage from '../../components/profileImg/ProfileImg';
import Camera from '../../../assets/icons/camera.svg';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  MyProfileScreen: undefined;
};
type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const ModifyProfileScreen = () => {
  // 네비게이션
  const navigation = useNavigation<RootStackNavigationProp>();

  const onSubmit = () => {
    // TODO: 작성한 값 보내기
    navigation.navigate('MyProfileScreen');
  };

  // 입력 값
  const [name, setName] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');
  const [introduction, setIntroduction] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const userTypeList = ['소비자', '농민'];

  return (
    <Container>
      <Header type='default' firstIcon='back' title='프로필 수정' />
      <FormContainer>
        <ImageContainer>
          <ProfileImage url={imgUrl} width={widthPercent * 60} height={heightPercent * 60} />
          <CameraButtonContainer
            onPress={() => {
              console.log('사진 변경');
              setImgUrl('');
            }}
          >
            <Camera width={widthPercent * 12} height={heightPercent * 12} />
          </CameraButtonContainer>
        </ImageContainer>
        <FormItemContainer>
          <Typo.BODY4_M>이름 (실명)</Typo.BODY4_M>
          <SingleLineInputBox value={name} onChangeText={setName} placeholder={'이름을 입력해주세요'} />
        </FormItemContainer>
        <FormItemContainer>
          <Typo.BODY4_M>유형</Typo.BODY4_M>
          <DropDown dataList={userTypeList} onSelect={() => {}} defaultText={'유형 선택'} />
        </FormItemContainer>
        <FormItemContainer>
          <Typo.BODY4_M>한줄 프로필</Typo.BODY4_M>
          <SingleLineInputBox value={introduction} onChangeText={setIntroduction} placeholder={'나를 대표하는 한 줄을 입력해주세요'} />
        </FormItemContainer>
        <FormItemContainer>
          <Typo.BODY4_M>지역</Typo.BODY4_M>
          <SingleLineInputBox value={address} onChangeText={setAddress} placeholder={'지역을 입력해주세요'} />
        </FormItemContainer>
      </FormContainer>
      <ButtonContainer>
        <BasicButton onPress={onSubmit} height={heightPercent * 45} borderColor={Color.GREEN500} borderRadius={10}>
          <Typo.BODY3_M color={Color.WHITE}>작성 완료</Typo.BODY3_M>
        </BasicButton>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${Color.WHITE};
  position: relative;
`;

const FormContainer = styled.View`
  flex-direction: column;
  justify-content: center;
`;

const FormItemContainer = styled.View`
  padding: ${heightPercent * 8}px ${widthPercent * 20}px;
`;

const ButtonContainer = styled.View`
  padding: ${heightPercent * 0}px ${widthPercent * 20}px;
  position: absolute;
  bottom: ${heightPercent * 15}px;
  width: 100%;
`;

const ImageContainer = styled.View`
  margin: auto;
  padding: ${heightPercent * 20}px;
  position: relative;
`;

const CameraButtonContainer = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${widthPercent * 20}px;
  height: ${heightPercent * 20}px;
  background-color: ${Color.GRAY100};
  border-radius: 10px;
  border-width: 1px;
  border-color: ${Color.GRAY200};
  position: absolute;
  bottom: ${heightPercent * 10}px;
  left: ${widthPercent * 60}px;
`;

export default ModifyProfileScreen;

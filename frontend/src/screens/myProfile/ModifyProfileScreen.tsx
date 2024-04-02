import React, { useState } from 'react';
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
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../recoil/atoms/userInfoState';
import { modifyUserInfo } from '../../apis/services/user/user';
import * as ImagePicker from 'expo-image-picker';
import { Platform, Touchable, TouchableWithoutFeedback, View } from 'react-native';
import { uploadImagesToFirebaseStorage } from '../../util/BasicUtil';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';

type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

interface ModifyProfileProps {
  route: {
    params: { sido: string; gugun: string; dong: string; address: string };
  };
}

const ModifyProfileScreen = (props: ModifyProfileProps) => {
  // 네비게이션
  const navigation = useNavigation<RootStackNavigationProp>();

  // 기존 내 정보
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  // 입력 값
  const [name, setName] = useState<string>(userInfo.nickname);
  const [imgUrl, setImgUrl] = useState<string>(userInfo.profileImage);
  const [profileContent, setProfileContent] = useState<string>(userInfo.profileContent);
  const [sido, setSido] = useState<string>(userInfo.sido);
  const [gugun, setGugun] = useState<string>(userInfo.gugun);
  const [dong, setDong] = useState<string>(userInfo.dong);
  const [address, setAddress] = useState<string>('');
  const [role, setRole] = useState<string>(userInfo.role);

  const userTypeList = ['소비자', '농부'];

  const onSubmit = async () => {
    //  파이어베이스에 이미지 전송, 이미지 url 받아오기
    const imageUrls: string[] = [imgUrl];
    const newImaggeUrls = await uploadImagesToFirebaseStorage(imageUrls, `프로필//${userInfo.userId}`);

    // TODO: 작성한 값 보내기
    const params = {
      profileImage: newImaggeUrls[0] ? newImaggeUrls[0] : '',
      nickname: name,
      role: role,
      profileContent: profileContent,
      sido: props.route.params.sido,
      gugun: props.route.params.gugun,
      dong: props.route.params.dong,
      roadNameAddress: props.route.params.address,
    };

    const response = await modifyUserInfo(params);
    // 페이지 이동
    if (response.dataHeader.successCode === 1) {
      alert('프로필 수정을 실패했습니다.');
    } else {
      setUserInfo({
        ...userInfo,
        role: role,
        nickname: name,
        profileImage: imgUrl,
        profileContent: profileContent,
        sido: props.route.params.sido ? props.route.params.sido : userInfo.sido,
        gugun: props.route.params.gugun ? props.route.params.gugun : userInfo.gugun,
        dong: props.route.params.dong ? props.route.params.dong : userInfo.dong,
        address: props.route.params.address ? props.route.params.address : userInfo.address,
      });
      alert('프로필 수정 성공!');
    }
    navigation.push('BottomNavigation', { screen: 'MyProfileScreen' });
  };

  const onPressCameraButton = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      // assets 속성이 없는 경우 result.uri 직접 사용
      const newImageUrl = result.assets[0].uri;

      // 이미지가 선택되었을 경우에만 추가
      setImgUrl(newImageUrl);
    }
  };

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header type='default' firstIcon='back' title='프로필 수정' />
      <FormContainer>
        <ImageContainer>
          <ProfileImage url={imgUrl} width={widthPercent * 60} height={heightPercent * 60} />
          <CameraButtonContainer onPress={onPressCameraButton}>
            <Camera width={widthPercent * 12} height={heightPercent * 12} />
          </CameraButtonContainer>
        </ImageContainer>
        <FormItemContainer>
          <Typo.BODY4_M>이름 (실명)</Typo.BODY4_M>
          <SingleLineInputBox value={name} onChangeText={setName} placeholder={'이름을 입력해주세요'} />
        </FormItemContainer>
        <FormItemContainer>
          <Typo.BODY4_M>유형</Typo.BODY4_M>
          <DropDown dataList={userTypeList} onSelect={setRole} defaultText={userInfo.role ? role : '유형 선택'} />
        </FormItemContainer>
        <FormItemContainer>
          <Typo.BODY4_M>한줄 프로필</Typo.BODY4_M>
          <SingleLineInputBox value={profileContent} onChangeText={setProfileContent} placeholder={'나를 대표하는 한 줄을 입력해주세요'} />
        </FormItemContainer>
        <FormItemContainer>
          {/* 지역 선택 추후 수정 */}
          <Typo.BODY4_M>지역</Typo.BODY4_M>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('PostCodeScreen', { id: 0, screenName: 'ModifyProfile' });
            }}
          >
            <AddressContainer>
              <Typo.BODY4_M color={Color.GRAY400}>
                {props.route.params.address ? props.route.params.address : userInfo.address ? userInfo.address : '지역을 입력해주세요'}
              </Typo.BODY4_M>
            </AddressContainer>
          </TouchableWithoutFeedback>
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

const Container = styled.KeyboardAvoidingView`
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

const AddressContainer = styled.View`
  height: ${heightPercent * 36}px;
  border-radius: 10px;
  border-width: 0.8px;
  border-color: ${Color.GRAY300};
  padding: ${widthPercent * 10}px;
  margin: ${heightPercent * 10}px 0px;
`;

export default ModifyProfileScreen;

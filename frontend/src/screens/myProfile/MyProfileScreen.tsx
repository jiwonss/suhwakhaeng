import React, { useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import styled from 'styled-components/native';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import Header from '../../components/header/Header';
import { BasicButton } from '../../components/button/Buttons';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { BussinessProfileCard } from '../../components/profileCard/ProfileCard';
import { Alert, View } from 'react-native';
import { Spacer } from '../../components/basic/Spacer';
import Feather from '../../../assets/icons/Feather Icon.svg';
import Favorite_border from '../../../assets/icons/favorite_border.svg';
import New_Icon from '../../../assets/icons/new.svg';
import Sunny from '../../../assets/icons/Sunny.svg';
import Person_remove from '../../../assets/icons/person-remove.svg';
import Location from '../../../assets/icons/location.svg';
import Lucide from '../../../assets/icons/Lucide Icon.svg';
import { PlantAdd, PlantItem } from '../../components/plantAdd/PlantAdd';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfoState } from '../../recoil/atoms/userInfoState';
import { removeTokens } from '../../util/TokenUtil';
import { tokenState } from '../../recoil/atoms/tokenState';
import { SlideModal } from '../../components/modal/Modal';
import { deleteMyCropInfo, getMyCropListInfo } from '../../apis/services/crops/Crops';

type RootStackParamList = {
  ModifyProfileScreen: { sido: string; gugun: string; dong: string; address: string };
  MyPostScreen: undefined;
  FavoriteProductScreen: undefined;
  FarmScreen: undefined;
  SetLocationScreen: undefined;
  WeatherScreen: undefined;
};

type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

interface CropItem {
  myCropsId: number;
  myCropsName: string;
  cropsName: string;
  cropsVarietyName: string;
  location: {
    sido: string;
    gugun: string;
    dong: string;
  };
}

type BottomTabParamList = {
  MyProfileScreen: { reloadProfile?: boolean };
};

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${Color.WHITE};
  position: relative;
`;

const FormContainer = styled.View`
  flex-direction: column;
  justify-content: center;
`;

const FormItemContainer = styled.View`
  padding: ${heightPercent * 20}px ${widthPercent * 20}px;
  padding-bottom: ${widthPercent * 10}px;
  border-color: ${Color.GRAY200};
  border-bottom-width: 1px;
`;

const ButtonContainer = styled.View`
  padding: ${heightPercent * 8}px ${widthPercent * 20}px;
`;

const StyledButton = styled.TouchableOpacity`
  flex-direction: row;
  margin: ${heightPercent * 7}px ${widthPercent * 4}px;
`;

const StyledView = styled.View`
  margin: ${heightPercent * 7}px ${widthPercent * 4}px;
`;

const MyProfileScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [token, setToken] = useRecoilState(tokenState);
  const [modalVisible, setModalVisible] = useState(false);
  const userInfo = useRecoilValue(userInfoState);
  const [myCrops, setMyCrops] = useState<CropItem[]>([]);
  const [selectedCropId, setSelectedCropId] = useState<number>(0);

  // 작물 목록 가져오기
  useFocusEffect(
    React.useCallback(() => {
      const fetchMyCrops = async () => {
        try {
          const response = await getMyCropListInfo();
          if (response.dataBody) {
            setMyCrops(response.dataBody);
          }
        } catch (error) {
          console.error('내가 키우는 작물 목록을 불러오는 중 오류 발생:', error);
        }
      };

      fetchMyCrops();
    }, [])
  );

  // 작물 지우기
  const deleteMyCrop = async (myCropsId: number) => {
    try {
      await deleteMyCropInfo(myCropsId);
      setMyCrops(myCrops.filter((crop) => crop.myCropsId !== myCropsId));
    } catch (error) {
      console.error('내 작물 삭제 중 오류 발생:', error);
    }
  };

  return (
    <>
      <Container>
        <Header type='default' title='프로필' />
        <FormContainer>
          <FormItemContainer>
            <BussinessProfileCard url={userInfo.profileImage} name={userInfo.nickname} location={`${userInfo.sido} ${userInfo.gugun}`} Certified={userInfo.isBusiness} />
            <Spacer space={heightPercent * 20}></Spacer>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <BasicButton
                onPress={() =>
                  navigation.navigate('ModifyProfileScreen', {
                    sido: '',
                    gugun: '',
                    dong: '',
                    address: '',
                  })
                }
                width={widthPercent * 150}
                height={heightPercent * 30}
                disabled={false}
                backgroundColor={Color.WHITE}
                borderColor={Color.GRAY500}
                borderRadius={10}
              >
                <Typo.BODY4_M>프로필 수정</Typo.BODY4_M>
              </BasicButton>

              <BasicButton
                onPress={() => console.log('Button pressed')}
                width={widthPercent * 150}
                height={heightPercent * 30}
                disabled={false}
                backgroundColor={Color.WHITE}
                borderColor={Color.GRAY500}
                borderRadius={10}
              >
                <Typo.BODY4_M>사업자 등록</Typo.BODY4_M>
              </BasicButton>
            </View>
          </FormItemContainer>
          <FormItemContainer>
            <Typo.BODY4_B>내가 키우는 작물</Typo.BODY4_B>
            <StyledView>
              <PlantAdd></PlantAdd>
            </StyledView>
            {myCrops.map(({ location: { dong, gugun, sido }, myCropsName, cropsName, myCropsId }, index) => {
              // 기존 코드와 동일하게 작물 목록 렌더링
              const locationString = `${sido ?? ''} ${gugun ?? ''} ${dong ?? ''}`.trim();
              return (
                <StyledView key={index}>
                  <PlantItem
                    onPress={() => {
                      setModalVisible(true);
                      setSelectedCropId(myCropsId);
                    }}
                    cropsName={cropsName}
                    name={myCropsName}
                    location={locationString}
                  ></PlantItem>
                </StyledView>
              );
            })}
          </FormItemContainer>
          <FormItemContainer>
            <Typo.BODY4_B>내 활동</Typo.BODY4_B>
            <Spacer space={heightPercent * 4}></Spacer>
            <StyledButton onPress={() => navigation.navigate('MyPostScreen')}>
              <Feather width={widthPercent * 16} height={heightPercent * 16}></Feather>
              <Spacer space={widthPercent * 8} horizontal></Spacer>
              <Typo.BODY4_M>작성한 글</Typo.BODY4_M>
            </StyledButton>

            <StyledButton onPress={() => navigation.navigate('FavoriteProductScreen')}>
              <Favorite_border width={widthPercent * 16} height={heightPercent * 16}></Favorite_border>
              <Spacer space={widthPercent * 8} horizontal></Spacer>
              <Typo.BODY4_M>관심 상품</Typo.BODY4_M>
            </StyledButton>

            <StyledButton onPress={() => navigation.navigate('FarmScreen')}>
              <New_Icon width={widthPercent * 16} height={heightPercent * 16}></New_Icon>
              <Spacer space={widthPercent * 8} horizontal></Spacer>
              <Typo.BODY4_M>영농일지/영농장부</Typo.BODY4_M>
            </StyledButton>
          </FormItemContainer>
          <FormItemContainer>
            <Typo.BODY4_B>내 지역 정보</Typo.BODY4_B>
            <Spacer space={heightPercent * 4}></Spacer>
            <StyledButton onPress={() => navigation.navigate('SetLocationScreen')}>
              <Location width={widthPercent * 16} height={heightPercent * 16}></Location>
              <Spacer space={widthPercent * 8} horizontal></Spacer>
              <Typo.BODY4_M>거주지역</Typo.BODY4_M>
            </StyledButton>

            <StyledButton onPress={() => navigation.navigate('WeatherScreen')}>
              <Sunny width={widthPercent * 16} height={heightPercent * 16}></Sunny>
              <Spacer space={widthPercent * 8} horizontal></Spacer>
              <Typo.BODY4_M>날씨</Typo.BODY4_M>
            </StyledButton>
          </FormItemContainer>

          <ButtonContainer>
            <StyledButton
              onPress={() => {
                alert('로그아웃 되었습니다.');
                removeTokens();
                setTimeout(() => {
                  setToken(false);
                }, 300);
              }}
            >
              <Lucide width={widthPercent * 16} height={heightPercent * 16}></Lucide>
              <Spacer space={widthPercent * 8} horizontal></Spacer>
              <Typo.BODY4_M color={Color.GRAY400}>로그아웃</Typo.BODY4_M>
            </StyledButton>

            <StyledButton onPress={() => {}}>
              <Person_remove width={widthPercent * 16} height={heightPercent * 16}></Person_remove>
              <Spacer space={widthPercent * 8} horizontal></Spacer>
              <Typo.BODY4_M color={Color.GRAY400}>회원탈퇴</Typo.BODY4_M>
            </StyledButton>
          </ButtonContainer>
        </FormContainer>
        <SlideModal isVisible={modalVisible} setIsVisible={setModalVisible}>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <BasicButton
              onPress={() => {
                console.log('수정 페이지로 이동');
                // navigation.navigate('UpdatePostScreen', { postData });
                setModalVisible(false);
              }}
              width={300}
              height={50}
              backgroundColor={Color.WHITE}
              borderColor={Color.GRAY500}
              borderRadius={10}
            >
              <Typo.BODY3_M color={Color.GREEN500}>수정하기</Typo.BODY3_M>
            </BasicButton>
            <Spacer space={12} />
            <BasicButton
              onPress={() => {
                Alert.alert('삭제', '정말 삭제하시겠습니까?', [
                  { text: '아니오', onPress: () => setModalVisible(false), style: 'cancel' },
                  {
                    text: '예',
                    onPress: () => {
                      deleteMyCrop(selectedCropId);
                      setModalVisible(false);
                    },
                    style: 'destructive',
                  },
                ]);
                setModalVisible(false);
              }}
              width={300}
              height={50}
              backgroundColor={Color.GREEN500}
              borderColor={Color.GRAY500}
              borderRadius={10}
            >
              <Typo.BODY3_M color={Color.WHITE}>삭제하기</Typo.BODY3_M>
            </BasicButton>
          </View>
        </SlideModal>
      </Container>
    </>
  );
};

export default MyProfileScreen;

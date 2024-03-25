import React from 'react';
import styled from 'styled-components/native';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import Header from '../../components/header/Header';
import { BasicButton } from '../../components/button/Buttons';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { BussinessProfileCard } from '../../components/profileCard/ProfileCard';
import { View } from 'react-native';
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
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  ModifyProfileScreen: undefined;
  MyPostScreen: undefined;
  FavoriteProductScreen: undefined;
  FarmDairyScreen: undefined;
  SetLocationScreen: undefined;
  WeatherScreen: undefined;
};
type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

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

  return (
    <>
      <Container>
        <Header type='default' title='프로필' />
        <FormContainer>
          <FormItemContainer>
            <BussinessProfileCard name={'김농민'} location={'광주 서구'} Certified={false}></BussinessProfileCard>
            <Spacer space={heightPercent * 20}></Spacer>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <BasicButton
                onPress={() => navigation.navigate('ModifyProfileScreen')}
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
            <StyledView>
              <PlantItem onPress={()=>{}} name='감자' location='광주광역시 서구 금호 2동'></PlantItem>
            </StyledView>
            <StyledView>
              <PlantItem onPress={()=>{}} name='고추' location='광주광역시 서구 금호 2동'></PlantItem>
            </StyledView>
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

            <StyledButton onPress={() => navigation.navigate('FarmDairyScreen')}>
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
            <StyledButton onPress={() => {}}>
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
      </Container>
    </>
  );
};

export default MyProfileScreen;

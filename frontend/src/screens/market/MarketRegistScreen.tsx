import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import Header from '../../components/header/Header';
import { BasicButton } from '../../components/button/Buttons';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { MultiLineInputBox, SingleLineInputBox } from '../../components/inputBox/Input';
import CustomRadioButton from '../../components/cutomRadioButton/CutomRadioButton';
import ImgUploader from '../../components/imgUploader/ImgUploader';
import { registMarketPost } from '../../apis/services/market/market';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';
import { useNavigation } from '@react-navigation/native';
import { getKST, uploadImagesToFirebaseStorage } from '../../util/BasicUtil';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../recoil/atoms/userInfoState';
import { ActivityIndicator, Alert, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Spacer } from '../../components/basic/Spacer';

type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

interface MarketRegistProps {
  route: {
    params: { address: string; x: number; y: number; cate: string };
  };
}

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
  padding: ${heightPercent * 8}px ${widthPercent * 20}px;
`;

const ImageFormItemContainer = styled.View`
  position: relative;
  padding: ${heightPercent * 8}px ${widthPercent * 24}px;
`;

const ButtonContainer = styled.View`
  padding: ${heightPercent * 0}px ${widthPercent * 20}px;
`;

const AddressContainer = styled.View`
  height: ${heightPercent * 36}px;
  border-radius: 10px;
  border-width: 0.8px;
  border-color: ${Color.GRAY300};
  padding: ${widthPercent * 10}px;
  margin: ${heightPercent * 10}px 0px;
`;

const MarketRegistScreen = (props: MarketRegistProps) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const userInfo = useRecoilValue(userInfoState);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [category, setCategory] = useState<string>(props.route.params.cate ? props.route.params.cate : 'CROP');
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [imgUrls, setImgUrls] = useState<string[]>([]);

  // 주소 보낼 떄 x, y 좌표랑 도로명 주소 보내야함
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [address, setAddress] = useState<string>('');

  const [isUploading, setIsUploading] = useState<boolean>(false);

  const radioData = [
    {
      content: '작물',
      event: () => {
        setActiveIndex(0);
        setCategory('CROP');
      },
      active: activeIndex === 0,z
    },
    {
      content: '농자재',
      event: () => {
        setActiveIndex(1);
        setCategory('MATERIAL');
      },
      active: activeIndex === 1,
    },
    {
      content: '체험',
      event: () => {
        setActiveIndex(2);
        setCategory('EXPERIENCE');
      },
      active: activeIndex === 2,
    },
    {
      content: '일손',
      event: () => {
        setActiveIndex(3);
        setCategory('WORK');
      },
      active: activeIndex === 3,
    },
  ];

  const onPressButton = async () => {
    // TODO: 작성 완료 후 상세보기 페이지로 이동?
    if (!title) {
      Alert.alert('수확행', '제목을 입력해주세요');
      return;
    } else if (!price) {
      Alert.alert('수확행', '가격을 입력해주세요');
      return;
    } else if (!content) {
      Alert.alert('수확행', '내용을 입력해주세요');
      return;
    } else {
      setIsUploading(true);
      const newImageUrls = await uploadImagesToFirebaseStorage(imgUrls, `장터//${userInfo.userId}//${getKST()}`);
      const params = {
        cate: category,
        title: title,
        price: parseInt(price),
        content: content,
        image1: newImageUrls[0],
        image2: newImageUrls[1],
        image3: newImageUrls[2],
        image4: newImageUrls[3],
        x: props.route.params.x,
        y: props.route.params.y,
        roadNameAddress: props.route.params.address,
      };
      const response = await registMarketPost(params);
      setActiveIndex(0);
      setAddress('');
      setCategory('');
      setTitle('');
      setPrice('');
      setContent('');
      setImgUrls([]);
      if (response.dataHeader.successCode === 0) {
        Alert.alert('수확행', '등록 완료!');
        setIsUploading(false);
      }
      navigation.push('BottomNavigation', { screen: 'MarketScreen' });
    }
  };

  useEffect(() => {
    setCategory(props.route.params.cate ? props.route.params.cate : 'CROP');
    if (props.route.params.cate === 'CROP' || '') {
      setActiveIndex(0);
    } else if (props.route.params.cate === 'MATERIAL') {
      setActiveIndex(1);
    } else if (props.route.params.cate === 'EXPERIENCE') {
      setActiveIndex(2);
    } else if (props.route.params.cate === 'WORK') {
      setActiveIndex(3);
    }
  }, []);

  return (
    <Container>
      <Header type='default' title='장터글 등록' firstIcon='exit' />
      {!isUploading ? (
        <FormContainer>
          <FormItemContainer style={{ rowGap: heightPercent * 8 }}>
            <Typo.BODY4_M>분류 선택</Typo.BODY4_M>
            <CustomRadioButton data={radioData} />
          </FormItemContainer>
          <FormItemContainer>
            <Typo.BODY4_M>제목 입력</Typo.BODY4_M>
            <SingleLineInputBox value={title} onChangeText={setTitle} placeholder={'제목을 입력해주세요'} />
          </FormItemContainer>
          <FormItemContainer>
            <Typo.BODY4_M>가격 입력</Typo.BODY4_M>
            <SingleLineInputBox keyboardType='decimal-pad' value={price} onChangeText={setPrice} placeholder={'가격을 입력해주세요 (숫자만 입력)'} />
          </FormItemContainer>
          <FormItemContainer>
            <Typo.BODY4_M>내용 입력</Typo.BODY4_M>
            <MultiLineInputBox value={content} onChangeText={setContent} placeholder={'내용을 입력해주세요'} />
          </FormItemContainer>
          <ImageFormItemContainer>
            <Typo.BODY4_M>사진 (선택)</Typo.BODY4_M>
            <ImgUploader data={imgUrls} setData={setImgUrls} />
          </ImageFormItemContainer>
          <FormItemContainer>
            <Typo.BODY4_M>주소 (선택)</Typo.BODY4_M>
            {/* 눌렀을 때 주소 검색 페이지로 연결되어야 하는데 나중에 할게요.. */}
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('PostCodeScreen', { id: 0, screenName: 'MarketRegist' });
              }}
            >
              <AddressContainer>
                <Typo.BODY4_M color={Color.GRAY400}>{props.route.params.address ? props.route.params.address : '주소를 입력해주세요'}</Typo.BODY4_M>
              </AddressContainer>
            </TouchableWithoutFeedback>
          </FormItemContainer>
          <ButtonContainer>
            <BasicButton onPress={onPressButton} height={heightPercent * 45} borderColor={Color.GREEN500} borderRadius={10}>
              <Typo.BODY3_M color={Color.WHITE}>작성 완료</Typo.BODY3_M>
            </BasicButton>
          </ButtonContainer>
        </FormContainer>
      ) : (
        <>
          <View style={{ flexDirection: 'column', alignItems: 'center', paddingVertical: heightPercent * 150 }}>
            <Typo.BODY3_M>등록 중입니다</Typo.BODY3_M>
            <Spacer space={heightPercent * 20} />
            <ActivityIndicator size='large'></ActivityIndicator>
          </View>
        </>
      )}
    </Container>
  );
};

export default MarketRegistScreen;

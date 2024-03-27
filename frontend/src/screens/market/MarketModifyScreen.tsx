import React, { useEffect, useState } from 'react';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import styled from 'styled-components/native';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import CustomRadioButton from '../../components/cutomRadioButton/CutomRadioButton';
import { MultiLineInputBox, SingleLineInputBox } from '../../components/inputBox/Input';
import Header from '../../components/header/Header';
import ImgUploader from '../../components/imgUploader/ImgUploader';
import { BasicButton } from '../../components/button/Buttons';
import { getMarketPostDetail, modifyMarketPost } from '../../apis/services/market/market';
import { uploadImagesToFirebaseStorage } from '../../util/BasicUtil';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../recoil/atoms/userInfoState';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';
import { StackNavigationProp } from '@react-navigation/stack';
import { TouchableWithoutFeedback } from 'react-native';

type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

interface MarketDetailProps {
  route: {
    params: { id: number; address: string; x: number; y: number };
  };
}

const MarketModifyScreen = (props: MarketDetailProps) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const userInfo = useRecoilValue(userInfoState);
  const [postDetailInfo, setPostDetailInfo] = useState<{
    postId: number | null;
    title: string;
    price: number;
    content: string;
    cate: string;
    image1: string | null;
    image2: string | null;
    image3: string | null;
    image4: string | null;
    x: number | null;
    y: number | null;
    roadNameAddress: string;
  }>({ postId: null, title: '', price: 0, content: '', cate: '', image1: '', image2: null, image3: null, image4: null, x: null, y: null, roadNameAddress: '' });

  const [activeIndex, setActiveIndex] = useState<number>();
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [imgUrls, setImgUrls] = useState<string[]>([]);
  const [category, setCategory] = useState<string>('');
  // 주소 보낼 떄 x, y 좌표랑 도로명 주소 보내야함
  const [x, setX] = useState();
  const [y, setY] = useState();
  const [address, setAddress] = useState<string>('');

  const onChangeType = () => {
    alert('분류는 변경할 수 없습니다');
  };

  const radioData = [
    { content: '작물', event: onChangeType, active: activeIndex === 0 },
    { content: '농자재', event: onChangeType, active: activeIndex === 1 },
    { content: '체험', event: onChangeType, active: activeIndex === 2 },
    { content: '일손', event: onChangeType, active: activeIndex === 3 },
  ];

  const onPressButton = async () => {
    // TODO: 작성 완료 후 상세보기 페이지로 이동
    // 파이어베이스 업로드

    const newImgUrls = await uploadImagesToFirebaseStorage(imgUrls, `장터//${userInfo.userId}//${props.route.params.id}`);
    console.log(newImgUrls);
    const params = { tradeId: props.route.params.id };
    const data = {
      cate: category,
      title: title,
      price: parseInt(price),
      content: content,
      image1: newImgUrls[0],
      image2: newImgUrls[1],
      image3: newImgUrls[2],
      image4: newImgUrls[3],
      x: props.route.params.x ? props.route.params.x : x,
      y: props.route.params.y ? props.route.params.y : y,
      roadNameAddress: props.route.params.address ? props.route.params.address : address,
    };
    const response = await modifyMarketPost(params, data);
    if (response.dataHeader.successCode === 0) {
      alert('수정 완료!');
    }
    navigation.navigate('MarketScreen');
  };

  useEffect(() => {
    const getPostDetail = async () => {
      const params = { tradeId: props.route.params.id };
      const response = await getMarketPostDetail(params);
      setTitle(response.dataBody.tradeDetailInfo.title);
      setContent(response.dataBody.tradeDetailInfo.content);
      setPrice(response.dataBody.tradeDetailInfo.price);
      setX(response.dataBody.tradeDetailInfo.axisLocation.x);
      setY(response.dataBody.tradeDetailInfo.axisLocation.y);
      setAddress(response.dataBody.tradeDetailInfo.axisLocation.roadNameAddress);
      setCategory(response.dataBody.tradeDetailInfo.cate);
      switch (response.dataBody.tradeDetailInfo.cate) {
        case 'CROP':
          setActiveIndex(0);
          break;
        case 'MATERIAL':
          setActiveIndex(1);
          break;
        case 'EXPERIENCE':
          setActiveIndex(2);
          break;
        case 'WORK':
          setActiveIndex(3);
          break;
      }

      if (response.dataBody.tradeDetailInfo.image1) {
        setImgUrls([...imgUrls, response.dataBody.tradeDetailInfo.image1]);
      }
      if (response.dataBody.tradeDetailInfo.image2) {
        setImgUrls([...imgUrls, response.dataBody.tradeDetailInfo.image1, response.dataBody.tradeDetailInfo.image2]);
      }
      if (response.dataBody.tradeDetailInfo.image3) {
        setImgUrls([...imgUrls, response.dataBody.tradeDetailInfo.image1, response.dataBody.tradeDetailInfo.image2, response.dataBody.tradeDetailInfo.image3]);
      }
      if (postDetailInfo.image4) {
        setImgUrls([
          ...imgUrls,
          response.dataBody.tradeDetailInfo.image1,
          response.dataBody.tradeDetailInfo.image2,
          response.dataBody.tradeDetailInfo.image3,
          response.dataBody.tradeDetailInfo.image4,
        ]);
      }
      console.log(postDetailInfo);
    };

    getPostDetail();
  }, []);

  return (
    <Container>
      <Header type='default' title='장터글 수정' firstIcon='exit' />
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
          <SingleLineInputBox value={String(price)} onChangeText={setPrice} placeholder={'가격을 입력해주세요 (숫자만 입력)'} />
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
              navigation.navigate('PostCodeScreen', { id: props.route.params.id, screenName: 'MarketModify' });
            }}
          >
            <AddressContainer>
              <Typo.BODY4_M color={Color.GRAY400}>{props.route.params.address ? props.route.params.address : address}</Typo.BODY4_M>
            </AddressContainer>
          </TouchableWithoutFeedback>
        </FormItemContainer>
        <ButtonContainer>
          <BasicButton onPress={onPressButton} height={heightPercent * 45} borderColor={Color.GREEN500} borderRadius={10}>
            <Typo.BODY3_M color={Color.WHITE}>작성 완료</Typo.BODY3_M>
          </BasicButton>
        </ButtonContainer>
      </FormContainer>
    </Container>
  );
};

/** styled component 영역 */

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

export default MarketModifyScreen;

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

interface MarketDetailProps {
  route: {
    params: { id: number };
  };
}

const MarketModifyScreen = (props: MarketDetailProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [title, setTitle] = useState<string>('김농부');
  const [price, setPrice] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [imgUrls, setImgUrls] = useState<string[]>([]);
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

  useEffect(() => {
    // console.log(`선택된 분류: ${radioData[activeIndex].content}`);
  }, [activeIndex]);

  const onPressButton = () => {
    // TODO: 작성 완료 후 상세보기 페이지로 이동
    console.log('작성 완료');
  };

  useEffect(() => {
    //TODO: postId로 postData 불러오기
    const postData = {
      userId: 1,
      name: '김농민',
      date: '2024-03-12 11:02:02',
      classification: '작물',
      title: '감자 1kg',
      price: '1000',
      content: '싱싱한 햇감자 팝니다.. 서구 금호동으로 오세요 \n아아아',
      x: 37.59523, // 주소 x 좌표
      y: 127.086, // 주소 y 좌표
      address: '광주광역시 서구',
      imgUrl_one: '',
      imgUrl_two: '',
      imgUrl_three: '',
      imgUrl_four: '',
    };
    setTitle(postData.title);
    setPrice(postData.price);
    setContent(postData.content);
    setAddress(postData.address);
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
          <SingleLineInputBox value={price} onChangeText={setPrice} placeholder={'가격을 입력해주세요 (숫자만 입력)'} />
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
          <SingleLineInputBox value={address} onChangeText={setAddress} placeholder={'주소를 입력해주세요'} />
        </FormItemContainer>
        <ButtonContainer>
          <BasicButton onPress={onPressButton} width={widthPercent * 300} height={heightPercent * 45} borderColor={Color.GREEN500} borderRadius={10}>
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

export default MarketModifyScreen;

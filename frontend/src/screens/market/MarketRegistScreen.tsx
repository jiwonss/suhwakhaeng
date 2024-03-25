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

const MarketRegistScreen = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [imgUrls, setImgUrls] = useState<string[]>([]);
  // 주소 보낼 떄 x, y 좌표랑 도로명 주소 보내야함
  const [x, setX] = useState();
  const [y, setY] = useState();
  const [address, setAddress] = useState<string>('');

  const radioData = [
    { content: '작물', event: () => setActiveIndex(0), active: activeIndex === 0 },
    { content: '농자재', event: () => setActiveIndex(1), active: activeIndex === 1 },
    { content: '체험', event: () => setActiveIndex(2), active: activeIndex === 2 },
    { content: '일손', event: () => setActiveIndex(3), active: activeIndex === 3 },
  ];

  useEffect(() => {
    console.log(`선택된 분류: ${radioData[activeIndex].content}`);
  }, [activeIndex]);

  const onPressButton = () => {
    // TODO: 작성 완료 후 상세보기 페이지로 이동?
    console.log('작성 완료');
  };

  return (
    <Container>
      <Header type='default' title='장터글 등록' firstIcon='exit' />
      <FormContainer>
        <FormItemContainer style={{ rowGap: heightPercent * 8 }}>
          <Typo.BODY4_M>분류 선택</Typo.BODY4_M>
          <CustomRadioButton data={radioData} />
        </FormItemContainer>
        <FormItemContainer>
          <Typo.BODY4_M>제목 입력</Typo.BODY4_M>
          <SingleLineInputBox onChangeText={setTitle} placeholder={'제목을 입력해주세요'} />
        </FormItemContainer>
        <FormItemContainer>
          <Typo.BODY4_M>가격 입력</Typo.BODY4_M>
          <SingleLineInputBox onChangeText={setPrice} placeholder={'가격을 입력해주세요 (숫자만 입력)'} />
        </FormItemContainer>
        <FormItemContainer>
          <Typo.BODY4_M>내용 입력</Typo.BODY4_M>
          <MultiLineInputBox onChangeText={setContent} placeholder={'내용을 입력해주세요'} />
        </FormItemContainer>
        <ImageFormItemContainer>
          <Typo.BODY4_M>사진 (선택)</Typo.BODY4_M>
          <ImgUploader data={imgUrls} setData={setImgUrls} />
        </ImageFormItemContainer>
        <FormItemContainer>
          <Typo.BODY4_M>주소 (선택)</Typo.BODY4_M>
          {/* 눌렀을 때 주소 검색 페이지로 연결되어야 하는데 나중에 할게요.. */}
          <SingleLineInputBox onChangeText={setAddress} placeholder={'주소를 입력해주세요'} />
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

export default MarketRegistScreen;

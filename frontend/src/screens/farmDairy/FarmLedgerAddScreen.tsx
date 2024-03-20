import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import Header from '../../components/header/Header';
import { BasicButton } from '../../components/button/Buttons';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { DropDown } from '../../components/dropdown/DropDown';
import CustomRadioButton from '../../components/cutomRadioButton/CutomRadioButton';
import { SingleLineInputBox } from '../../components/inputBox/Input';
import ImgUploader from '../../components/imgUploader/ImgUploader';
import storage from '@react-native-firebase/storage';

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

const ButtonContainer = styled.View`
  padding: ${heightPercent * 8}px ${widthPercent * 20}px;
`;

const StyledView = styled.View`
  margin:  0px ${widthPercent * 50}px;
`;

const FarmLedgerAddScreen = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [urls, setUrls] = useState([]);
  const radioData = [
    { content: '수입', event: () => setActiveIndex(0), active: activeIndex === 0 },
    { content: '지출', event: () => setActiveIndex(1), active: activeIndex === 1 },
  ];

  const [dataList, setDataList] = useState('');
  const crops = ['서울', '경기', '인천', '강원', '충청', '경상', '전라', '제주'];


  useEffect(() => {
    console.log(`선택된 분류: ${radioData[activeIndex].content}`);
  }, [activeIndex]);

  const onPressButton = () => {
    // TODO: 작성 완료 후 상세보기 페이지로 이동?
    console.log('작성 완료');
  };

  // 이미지를 Firebase Storage에 업로드하는 함수 --> onPress Button 안으로
  const uploadImagesToFirebaseStorage = async (imageUrls: string[]) => {
    try {
      const downloadUrls = []; // 업로드된 이미지의 다운로드 URL을 저장할 배열
  
      // 이미지를 업로드하고 다운로드 URL을 가져오는 작업을 순차적으로 수행
      for (let i = 0; i < imageUrls.length; i++) {
        const imageUrl = imageUrls[i];
        const response = await fetch(imageUrl); // 이미지를 가져옴
        const blob = await response.blob(); // 이미지를 Blob 객체로 변환
        const filename = `image_${i}.png`; // 이미지 파일명 생성

        // 여기에다가 나중에 글이나, 경로로 유일하게 만들어야함
        const reference = storage().ref().child(`images//${filename}`); // 이미지를 저장할 경로 설정
        //
        
        await reference.put(blob); // 이미지를 Storage에 업로드
        console.log(`Image ${i + 1} uploaded successfully!`);
  
        // 이미지가 업로드된 후 해당 이미지의 다운로드 URL을 가져와서 배열에 추가
        const downloadUrl = await reference.getDownloadURL();
        downloadUrls.push(downloadUrl);
      }
  
      console.log('All images uploaded successfully!');
      console.log(downloadUrls);
      return downloadUrls; // 업로드된 이미지들의 다운로드 URL을 반환
    } catch (error) {
      console.error('Error uploading images:', error);
      return []; // 오류가 발생한 경우 빈 배열을 반환
    }
  };


  return (
    <Container>
      <Header type='default' title='영농 장부' firstIcon='back' />
      <FormContainer>
        <FormItemContainer>
          <StyledView>
            <CustomRadioButton data={radioData}></CustomRadioButton>
          </StyledView>
        </FormItemContainer>
        <FormItemContainer>
          <Typo.BODY4_M>작물</Typo.BODY4_M>
          <DropDown
            dataList={crops} // 드롭다운 목록에 표시할 항목들의 배열
            onSelect={(selectedItem:any) => setDataList(selectedItem)} // 사용자가 항목을 선택했을 때 실행될 콜백 함수
            defaultText='작물 선택' // 드롭다운 버튼에 표시될 기본 텍스트
          />
        </FormItemContainer>
        <FormItemContainer>
          <Typo.BODY4_M >카테고리</Typo.BODY4_M>
          <SingleLineInputBox placeholder={'카테고리를 작성해주세요'}></SingleLineInputBox>
        </FormItemContainer>
        <FormItemContainer>
          <Typo.BODY4_M >금액</Typo.BODY4_M>
          <SingleLineInputBox placeholder={'금액을 입력해주세요'}></SingleLineInputBox>
        </FormItemContainer>
        <FormItemContainer>
          <Typo.BODY4_M >한줄 메모(선택)</Typo.BODY4_M>
          <SingleLineInputBox placeholder={'내용을 작성해주세요'}></SingleLineInputBox>
        </FormItemContainer>
        <FormItemContainer>
        <Typo.BODY4_M >사진 (선택)</Typo.BODY4_M>
          <ImgUploader data={urls} setData={setUrls}></ImgUploader>
        </FormItemContainer>
        <ButtonContainer>
          <BasicButton onPress={()=>uploadImagesToFirebaseStorage(urls)} height={heightPercent * 45} borderColor={Color.GREEN500} borderRadius={10}>
            <Typo.BODY3_M color={Color.WHITE}>작성 완료</Typo.BODY3_M>
          </BasicButton>
        </ButtonContainer>
      </FormContainer>
    </Container>
  );
};

export default FarmLedgerAddScreen;

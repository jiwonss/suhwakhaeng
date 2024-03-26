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
import { uploadImagesToFirebaseStorage } from '../../util/BasicUtil';
import DatePicker from 'react-native-date-picker';

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

const StyledButton = styled.TouchableOpacity`
  height: ${heightPercent * 36}px;
  width: '100%';
  border-radius: 10px;
  border-width: 0.8px;
  border-color: ${Color.GRAY300};
  padding: ${widthPercent * 10}px;
  margin: ${heightPercent * 10}px 0px;
  font-family: 'GmarketSansTTFMedium';
  font-size: ${widthPercent * 12}px;
`;

const StyledView = styled.View`
  margin:  0px ${widthPercent * 50}px;
`;

const FarmLedgerAddScreen = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [urls, setUrls] = useState([]);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [choose, setChoose] = useState(false);
  const radioData = [
    { content: '수입', event: () => setActiveIndex(0), active: activeIndex === 0 },
    { content: '지출', event: () => setActiveIndex(1), active: activeIndex === 1 },
  ];

  const [dataList, setDataList] = useState('');
  const crops = ['서울', '경기', '인천', '강원', '충청', '경상', '전라', '제주'];

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year} ${month} ${day}`;
  };
  
  useEffect(() => {
    console.log(`선택된 분류: ${radioData[activeIndex].content}`);
  }, [activeIndex]);

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
          <Typo.BODY4_M>날짜</Typo.BODY4_M>

          <StyledButton
            onPress={() => {
              setOpen(true);
            }}
          >
            { choose === true ? <Typo.BODY4_M color={Color.GRAY400}>{formatDate(date)}</Typo.BODY4_M> : <Typo.BODY4_M color={Color.GRAY400}>날짜 선택</Typo.BODY4_M> }
          </StyledButton>

          <DatePicker
            mode='date'
            modal
            open={open}
            date={date}
            onConfirm={(chooseDate) => {
              setOpen(false);
              setChoose(true);
              setDate(chooseDate);
            }}
            onCancel={() => {
              setOpen(false);
            }}
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
          <BasicButton onPress={()=>uploadImagesToFirebaseStorage(urls, '영농일지//범수')} height={heightPercent * 45} borderColor={Color.GREEN500} borderRadius={10}>
            <Typo.BODY3_M color={Color.WHITE}>작성 완료</Typo.BODY3_M>
          </BasicButton>
        </ButtonContainer>
      </FormContainer>
    </Container>
  );
};

export default FarmLedgerAddScreen;

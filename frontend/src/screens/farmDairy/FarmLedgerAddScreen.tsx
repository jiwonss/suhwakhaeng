import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import Header from '../../components/header/Header';
import { BasicButton } from '../../components/button/Buttons';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import CustomRadioButton from '../../components/cutomRadioButton/CutomRadioButton';
import { SingleLineInputBox } from '../../components/inputBox/Input';
import ImgUploader from '../../components/imgUploader/ImgUploader';
import { uploadImagesToFirebaseStorage } from '../../util/BasicUtil';
import DatePicker from 'react-native-date-picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { CreateLedger, getCropsSimple } from '../../apis/farm/farm';
import SelectDropdown from 'react-native-select-dropdown';
import { Spacer } from '../../components/basic/Spacer';
import { ActivityIndicator } from 'react-native';

type RootStackParamList = {
  FarmScreen: undefined;
  AddCropsScreen: undefined;
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
  padding: ${heightPercent * 8}px ${widthPercent * 20}px;
`;

const FormItemContainer0 = styled.View`
  flex: 1;
  align-items: center;
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
  margin: 0px ${widthPercent * 50}px;
`;

const TextContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: ${heightPercent * 80}px;
  row-gap: ${heightPercent * 20}px;
`;

const FarmLedgerAddScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [render, setRender] = useState(1);
  const [finance, setFinance] = useState('수입');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [choose, setChoose] = useState(false);
  const [crops, setCrops] = useState([]);
  const [i, setI] = useState(null);

  const [postdate, setPostdate] = useState('');
  const [myCrops, setMyCrops] = useState([]);
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState(null);
  const [amount, setAmount] = useState(null);
  const [urls, setUrls] = useState([]);

  const radioData = [
    { content: '수입', event: () => setFinance('수입'), active: finance === '수입' },
    { content: '지출', event: () => setFinance('지출'), active: finance === '지출' },
  ];

  const onPressButton = async () => {
    setRender(1);
    const fetchData = async () => {
      let image = null;
      if (urls && urls.length !== 0) {
        const test = await uploadImagesToFirebaseStorage(urls, `영농장부//${Date()}//${myCrops[i].myCropsId}`);
        image = test[0];
      }
      // console.log(finance,title,content,amount,image,postdate)

      await CreateLedger({
        myCropsId: myCrops[i].myCropsId,
        finance: finance,
        title: title,
        content: content,
        amount: parseInt(amount),
        image: image,
        date: postdate,
      });

      console.log('글 생성 완료..');
    };

    await fetchData();
    // TODO: 작성 완료 후 상세보기 페이지로 이동?
    navigation.push('FarmScreen');
    console.log('이동');
  };

  const handleTextChange = (text) => {
    // 입력된 값이 숫자인지 확인
    if (/^\d+$/.test(text) || text === '') {
      // 숫자이거나 빈 문자열인 경우에만 값을 설정
      setAmount(text);
    }
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCropsSimple();
      //작물 드롭다운 설정
      if (response.dataBody.length === 0) {
        setRender(0);
        return;
      }
      setRender(2);
      setCrops(response.dataBody.map((item) => item.myCropsName));
      setMyCrops(response.dataBody);
    };

    fetchData();
  }, []);

  const onPress = () => {
    navigation.push('AddCropsScreen');
  };

  return (
    <Container>
      <Header type='default' title='영농 장부' firstIcon='back' />
      {render === 0 && (
        <FormContainer>
          <FormItemContainer0>
            <Typo.BODY1_B color={Color.GREEN600}>내 작물 정보가 없습니다!</Typo.BODY1_B>
            <Spacer space={heightPercent * 10}></Spacer>
            <Typo.BODY1_B color={Color.GREEN600}>작물 설정을 해주세요!</Typo.BODY1_B>
            <Spacer space={heightPercent * 20}></Spacer>
            <BasicButton
              onPress={onPress}
              width={widthPercent * 150}
              height={heightPercent * 50}
              disabled={false}
              backgroundColor={Color.GREEN500}
              borderColor={Color.WHITE}
              borderRadius={10}
            >
              <Typo.BODY4_M color={Color.WHITE}>작물 설정하러가기</Typo.BODY4_M>
            </BasicButton>
          </FormItemContainer0>
        </FormContainer>
      )}
      {render === 1 && (
          <TextContainer>
          <ActivityIndicator size='large' />
        </TextContainer>
      )}
      {render === 2 && (
        <FormContainer>
          <FormItemContainer>
            <StyledView>
              <CustomRadioButton data={radioData}></CustomRadioButton>
            </StyledView>
          </FormItemContainer>
          <FormItemContainer>
            <Typo.BODY4_M>작물</Typo.BODY4_M>
            <SelectDropdown
              buttonStyle={{
                borderRadius: 10,
                borderWidth: 0.8,
                borderColor: Color.GRAY300,
                backgroundColor: Color.WHITE,
                width: '100%',
                height: heightPercent * 36,
                padding: widthPercent * 10,
                marginVertical: heightPercent * 10,
              }}
              buttonTextStyle={{
                textAlign: 'left', // 텍스트를 왼쪽 정렬
                fontSize: widthPercent * 12, // 텍스트 크기 설정
                fontFamily: 'GmarketSansTTFMedium',
                color: Color.GRAY400, // 텍스트 색상 설정
              }}
              data={crops}
              onSelect={(selectedItem, index) => setI(index)}
              buttonTextAfterSelection={(selectedItem, index) => selectedItem}
              rowTextForSelection={(item, index) => item}
              defaultButtonText={'작물 선택'}
              dropdownOverlayColor='none'
              dropdownStyle={{ borderRadius: widthPercent * 5, borderColor: Color.GRAY300, backgroundColor: Color.WHITE }}
            />
          </FormItemContainer>
          <FormItemContainer>
            <Typo.BODY4_M>날짜</Typo.BODY4_M>

            <StyledButton
              onPress={() => {
                setOpen(true);
              }}
            >
              {choose === true ? <Typo.BODY4_M color={Color.GRAY400}>{formatDate(date)}</Typo.BODY4_M> : <Typo.BODY4_M color={Color.GRAY400}>날짜 선택</Typo.BODY4_M>}
            </StyledButton>

            <DatePicker
              mode='date'
              modal
              open={open}
              date={date}
              maximumDate={new Date()}
              onConfirm={(chooseDate) => {
                setOpen(false);
                setChoose(true);
                setDate(chooseDate);
                setPostdate(formatDate(chooseDate));
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </FormItemContainer>
          <FormItemContainer>
            <Typo.BODY4_M>거래처</Typo.BODY4_M>
            <SingleLineInputBox placeholder={'거래처를 작성해주세요'} onChangeText={(text) => setTitle(text)}></SingleLineInputBox>
          </FormItemContainer>
          <FormItemContainer>
            <Typo.BODY4_M>금액</Typo.BODY4_M>
            <SingleLineInputBox placeholder={'금액을 입력해주세요'} keyboardType='decimal-pad' onChangeText={(text) => handleTextChange(text)}></SingleLineInputBox>
          </FormItemContainer>
          <FormItemContainer>
            <Typo.BODY4_M>한줄 메모(선택)</Typo.BODY4_M>
            <SingleLineInputBox placeholder={'내용을 작성해주세요'} onChangeText={(text) => setContent(text)}></SingleLineInputBox>
          </FormItemContainer>
          <FormItemContainer>
            <Typo.BODY4_M>사진 (선택)</Typo.BODY4_M>
            <ImgUploader data={urls} setData={setUrls} maximage={1}></ImgUploader>
          </FormItemContainer>
          <ButtonContainer>
            <BasicButton onPress={onPressButton} height={heightPercent * 45} borderColor={Color.GREEN500} borderRadius={10}>
              <Typo.BODY3_M color={Color.WHITE}>작성 완료</Typo.BODY3_M>
            </BasicButton>
          </ButtonContainer>
        </FormContainer>
      )}
    </Container>
  );
};

export default FarmLedgerAddScreen;

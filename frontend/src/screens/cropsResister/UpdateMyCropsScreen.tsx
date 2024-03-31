import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import styled from 'styled-components/native';
import { Spacer } from '../../components/basic/Spacer';
import { BasicButton } from '../../components/button/Buttons';
import { DropDown } from '../../components/dropdown/DropDown';
import Header from '../../components/header/Header';
import { SingleLineInputBox } from '../../components/inputBox/Input';
import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { useRoute } from '@react-navigation/core';
import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';
import { useRecoilState } from 'recoil';
import { myCropsList } from '../../recoil/atoms/myCrops';
import { getMyCropInfo, patchMyCropInfo } from '../../apis/services/crops/Crops';

interface MyLocation {
  sido: string;
  gugun: string;
  dong: string;
}

interface MyCropInfoType {
  cropsVarietyId?: number;
  myCropsId?: number;
  myCropsName?: string;
  cropsName?: string;
  cropsVarietyName?: string;
  location?: MyLocation;
  area?: number;
  areaUnit?: string;
  yield?: number;
}

interface PatchMyCropInfoType {
  area: number;
  name: string;
  areaUnit: string;
  yield: number;
  location?: MyLocation;
}

const Container = styled.View`
  margin-left: ${20 * widthPercent}px;
  margin-right: ${20 * widthPercent}px;
  row-gap: ${5 * heightPercent}px;
`;

const ButtonContainer = styled.View`
  padding: ${heightPercent * 8}px ${widthPercent * 20}px;
`;

const UpdateMyCropsScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'UpdateMyCropsScreen'>>();
  const { myCropsId, sido = '', gugun = '', dong = '' } = route.params;
  const dropDownData = ['평방미터', '평', '헥타르'];
  const [selectData, setSelectData] = useState('평방미터');
  const [Name, setName] = useState('');
  const [cropsName, setCropsName] = useState('');
  const [cropsVarietyName, setCropsVarietyName] = useState('');
  const [area, setArea] = useState<string>('0');
  const [cropYield, setCropYield] = useState<string>('0');
  const [myCrops, setMyCrops] = useRecoilState(myCropsList);

  // 작물 정보 조회
  useEffect(() => {
    if (myCropsId) {
      const fetchMyCropInfo = async () => {
        try {
          const data = await getMyCropInfo(myCropsId);
          console.log(data); // 데이터 구조 확인
          setName(data.dataBody.myCropsName ?? '');
          setCropsName(data.dataBody.cropsName ?? '');
          setCropsVarietyName(data.dataBody.cropsVarietyName ?? '');
          setArea(data.dataBody.area?.toString() ?? '0');
          setCropYield(data.dataBody.yield?.toString() ?? '0');
        } catch (error) {
          console.error('작물 정보 조회 중 오류 발생:', error);
        }
      };
      fetchMyCropInfo();
    }
  }, [myCropsId]);

  // 작물 수정 정보 전역상태에 반영
  const RecoilPatchMyCrop = (updatedCropInfo: MyCropInfoType) => {
    setMyCrops(myCrops.map((crop) => (crop.myCropsId === updatedCropInfo.myCropsId ? updatedCropInfo : crop)));
  };

  // 서버에 전송할 작물 정보를 구성합니다.
  const submitCropInfo = async () => {
    if (!myCropsId) {
      console.error('필요한 정보가 누락되었습니다.');
      return;
    }
    const cropInfo: PatchMyCropInfoType = {
      area: parseFloat(area),
      name: Name,
      areaUnit: selectData,
      yield: parseFloat(cropYield),
      location: {
        sido: 'sido',
        gugun: 'gugun',
        dong: 'dong',
      },
    };
    try {
      // 작물 수정 API 호출
      console.log('작물 정보 수정 요청:', myCropsId, cropInfo);
      const response = await patchMyCropInfo(myCropsId, cropInfo);
      console.log('작물 정보 수정 성공', response);
      RecoilPatchMyCrop(cropInfo);
      navigation.goBack();
    } catch (error) {
      console.error('작물 정보 수정 중 오류 발생:', error);
    }
  };

  const handleAreaChange = (text: string) => {
    setArea(text.replace(/[^0-9.]/g, '')); // 숫자와 소수점만 입력 허용
  };

  const handleCropYieldChange = (text: string) => {
    setCropYield(text.replace(/[^0-9.]/g, ''));
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }}>
        {/*헤더*/}
        <Header type={'default'} firstIcon={'back'} title={Name} />
        <Spacer space={20} />
        <Container>
          <Typo.BODY2_M>
            <Typo.BODY2_M color={Color.GREEN600}>
              {cropsName}({cropsVarietyName})
            </Typo.BODY2_M>
            의 재배 정보을 선택해주세요
          </Typo.BODY2_M>
          <Spacer space={20} />
        </Container>
        <Container>
          <Typo.BODY4_M>표시이름 (별칭)</Typo.BODY4_M>
          <SingleLineInputBox placeholder={'표시 이름을 작성해주세요.'} value={Name} onChangeText={setName} />
          <Spacer space={10} />
        </Container>
        <Container>
          <Typo.BODY4_M>지역</Typo.BODY4_M>
          <BasicButton
            onPress={() => {
              navigation.navigate('PostCodeScreen', { id: 0, screenName: 'UpdateMyCrops', plantName: cropsName });
            }}
            height={heightPercent * 36}
            borderColor={Color.GRAY300}
            backgroundColor={Color.WHITE}
            borderRadius={10}
          >
            <Typo.BODY4_M color={Color.GRAY400}>{sido ? `${sido} ${gugun} ${dong}` : '지역 검색'}</Typo.BODY4_M>
          </BasicButton>
          <Spacer space={10} />
        </Container>

        <Container>
          <Typo.BODY4_M>재배 면적(선택)</Typo.BODY4_M>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <SingleLineInputBox placeholder='재배 면적 입력' keyboardType='decimal-pad' value={area.toString()} onChangeText={handleAreaChange} />
            <DropDown width={104} dataList={dropDownData} onSelect={setSelectData} defaultText={'평방미터'} />
          </View>
          <Spacer space={10} />
        </Container>
        <Container>
          <Typo.BODY4_M>수확량(선택)</Typo.BODY4_M>
          <SingleLineInputBox placeholder='수확량 입력 (Kg단위)' keyboardType='decimal-pad' value={cropYield.toString()} onChangeText={handleCropYieldChange} />
        </Container>
      </ScrollView>
      <ButtonContainer>
        <BasicButton onPress={submitCropInfo} height={heightPercent * 45} borderColor={Color.GREEN500} borderRadius={10}>
          <Typo.BODY3_M color={Color.WHITE}>작성 완료</Typo.BODY3_M>
        </BasicButton>
      </ButtonContainer>
    </View>
  );
};
export default UpdateMyCropsScreen;

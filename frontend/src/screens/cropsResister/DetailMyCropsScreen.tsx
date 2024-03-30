import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import styled from 'styled-components/native';
import { Spacer } from '../../components/basic/Spacer';
import { BasicButton } from '../../components/button/Buttons';
import { DropDown } from '../../components/dropdown/DropDown';
import Header from '../../components/header/Header';
import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { useRoute } from '@react-navigation/core';
import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';
import { getMyCropInfo } from '../../apis/services/crops/Crops';

interface Location {
  sido: string;
  gugun: string;
  dong: string;
}

interface MyCropInfo {
  myCropsId: number;
  myCropsName: string;
  cropsName: string;
  cropsVarietyName: string;
  location: Location;
  area: number;
  areaUnit: string;
  yield: number;
}

const FormContainer = styled.View`
  flex-direction: column;
  justify-content: center;
`;

const FormItemContainer = styled.View`
  padding: ${heightPercent * 15}px ${widthPercent * 40}px;
`;
const MiniFormItemContainer = styled.View`
  padding: ${heightPercent * 15}px 0;
  padding-left: ${widthPercent * 40}px;
`;
const ButtonContainer = styled.View`
  padding: ${heightPercent * 8}px ${widthPercent * 20}px;
`;

const DetailMyCropsScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [myCropInfo, setMyCropInfo] = useState<MyCropInfo>();
  const route = useRoute<RouteProp<RootStackParamList, 'DetailMyCropsScreen'>>();
  const { myCropsId } = route.params;
  const [selectData, setSelectData] = useState('평방미터');
  const dropDownData = ['평방미터', '평', '헥타르'];

  // 작물 정보 조회
  useEffect(() => {
    if (myCropsId) {
      const fetchMyCropInfo = async () => {
        try {
          const data = await getMyCropInfo(myCropsId);
          setMyCropInfo(data.dataBody);
        } catch (error) {
          console.error('작물 정보 조회 중 오류 발생:', error);
        }
      };
      fetchMyCropInfo();
    }
  }, [myCropsId]);

  const [convertedArea, setConvertedArea] = useState<string>('0');

  // 단위 변환 포매팅
  const convertArea = (unit: string, area: number) => {
    let converted = area;
    switch (unit) {
      case '평방미터':
        converted = area;
        break;
      case '평':
        converted = area * 0.3025;
        break;
      case '헥타르':
        converted = area / 10000;
        break;
    }
    // 소수점 3자리까지만 표현
    const formatted = converted.toFixed(3);
    // 문자열을 실수로 변환 후, 원래 숫자와 비교하여 소수점 아래가 모두 0인지 확인
    const asNumber = parseFloat(formatted);
    // 소수점 아래가 모두 0이면 정수 부분만 문자열로 반환, 아니면 원래 포맷팅된 문자열 반환
    return asNumber % 1 === 0 ? asNumber.toString() : formatted;
  };

  // 단위 변환(소수점 3자리까지 표현)
  useEffect(() => {
    if (myCropInfo?.area) {
      const area = convertArea(selectData, myCropInfo.area);
      setConvertedArea(area);
    }
  }, [selectData, myCropInfo?.area]);

  return (
    <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }}>
        {/*헤더*/}
        <Header type={'default'} firstIcon={'back'} title={myCropInfo?.myCropsName} />

        <FormContainer>
          <FormItemContainer>
            <View style={{ flexDirection: 'row' }}>
              <Typo.BODY3_M color={Color.GREEN500}>작물명</Typo.BODY3_M>
              <Spacer space={25} horizontal={true} />
              <Typo.BODY3_M>{myCropInfo?.cropsName}</Typo.BODY3_M>
            </View>
          </FormItemContainer>
          <FormItemContainer>
            <View style={{ flexDirection: 'row' }}>
              <Typo.BODY3_M color={Color.GREEN500}>품종명</Typo.BODY3_M>
              <Spacer space={25} horizontal={true} />
              <Typo.BODY3_M>{myCropInfo?.cropsVarietyName}</Typo.BODY3_M>
            </View>
          </FormItemContainer>
          <FormItemContainer>
            <View style={{ flexDirection: 'row' }}>
              <Typo.BODY3_M color={Color.GREEN500}>표시이름 (별칭)</Typo.BODY3_M>
              <Spacer space={25} horizontal={true} />
              <Typo.BODY3_M>{myCropInfo?.myCropsName}</Typo.BODY3_M>
            </View>
          </FormItemContainer>
          <FormItemContainer>
            <View style={{ flexDirection: 'row' }}>
              <Typo.BODY3_M color={Color.GREEN500}>재배 지역</Typo.BODY3_M>
              <Spacer space={25} horizontal={true} />
              <Typo.BODY3_M>
                {myCropInfo?.location.sido} {myCropInfo?.location.gugun} {myCropInfo?.location.dong}
              </Typo.BODY3_M>
            </View>
          </FormItemContainer>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MiniFormItemContainer>
              <View style={{ flexDirection: 'row' }}>
                <Typo.BODY3_M color={Color.GREEN500}>재배 면적</Typo.BODY3_M>
                <Spacer space={25} horizontal={true} />
                <Typo.BODY3_M>{convertedArea}</Typo.BODY3_M>
                <Spacer space={10} horizontal={true} />
              </View>
            </MiniFormItemContainer>
            <DropDown width={75} height={33} dataList={dropDownData} onSelect={setSelectData} defaultText={'평방미터'} />
          </View>
          <FormItemContainer>
            <View style={{ flexDirection: 'row' }}>
              <Typo.BODY3_M color={Color.GREEN500}>수확량</Typo.BODY3_M>
              <Spacer space={25} horizontal={true} />
              <Typo.BODY3_M>{myCropInfo?.yield}</Typo.BODY3_M>
              <Spacer space={10} horizontal={true} />
              <Typo.BODY3_M>Kg</Typo.BODY3_M>
            </View>
          </FormItemContainer>
        </FormContainer>
      </ScrollView>
      <ButtonContainer>
        <BasicButton
          onPress={() => {
            navigation.navigate('MyProfileScreen');
          }}
          height={heightPercent * 45}
          borderColor={Color.GREEN500}
          borderRadius={10}
        >
          <Typo.BODY3_M color={Color.WHITE}>뒤로 가기</Typo.BODY3_M>
        </BasicButton>
      </ButtonContainer>
    </View>
  );
};
export default DetailMyCropsScreen;

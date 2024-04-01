import React, { useEffect, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import styled from 'styled-components/native';
import { Spacer } from '../../components/basic/Spacer';
import Header from '../../components/header/Header';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';

import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { useRoute } from '@react-navigation/core';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';
import { getCropVarietyInfo } from '../../apis/services/crops/Crops';
import { Card } from '../../components/card/Card';
import { Divider } from '../../components/basic/Divider';

interface RenderConditionsWithBreaksProps {
  contents: string;
  WrapperComponent: React.ComponentType<{ key: React.Key; children: React.ReactNode }>;
}

interface CropDetails {
  tableTitle: string[];
  tableInfo?: {
    tableHead: string[];
    tableTitle: string[];
    tableBody: string[][];
  };
  cropsInfo?: {
    id: number;
    name: string;
    category: string;
    growingCondition: string;
    pestType: string;
    diseaseType: string;
  };
  cropsVarietyInfo?: {
    id: number;
    name: string;
    category: string;
    usage: string;
    function: string;
    characteristic: string;
    adaptationArea: string;
    caution: string;
    image: string;
  };
}

const TableContainer = styled.View`
  flex-direction: row;
`;

const TableHead = styled.View`
  flex-direction: column;
`;

const TableBody = styled.View`
  flex: 1;
`;

const Container = styled.View`
  margin-left: ${20 * widthPercent}px;
  margin-right: ${20 * widthPercent}px;
  margin-bottom: ${20 * heightPercent}px;
  row-gap: ${5 * heightPercent}px;
`;

const TableRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const TableCell = styled.Text`
  flex: 1;
  text-align: center;
  padding-top: ${10 * heightPercent}px;
  padding-bottom: ${10 * heightPercent}px;
  padding-right: ${4 * widthPercent}px;
  padding-left: ${4 * widthPercent}px;
  font-family: 'GmarketSansTTFMedium';
`;

const CropsDetailScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'CropsDetailScreen'>>();
  const { cropsId, cropsVarietyId } = route.params;

  //  작물의 품종 데이터 상세 조회 결과값
  const [cropDetails, setCropDetails] = useState<CropDetails | null>(null);

  // 기본정보
  const cropsName = cropDetails?.cropsInfo?.name;
  const cropsVarietyName = cropDetails?.cropsVarietyInfo?.name;
  const cropsVarietyCategory = cropDetails?.cropsVarietyInfo?.category;

  // 품종정보
  const cropsVarietyUsage = cropDetails?.cropsVarietyInfo?.usage;
  const cropsVarietyFunction = cropDetails?.cropsVarietyInfo?.function;
  const cropsVarietyCharacteristic = cropDetails?.cropsVarietyInfo?.characteristic;
  const cropsVarietyAdaptationArea = cropDetails?.cropsVarietyInfo?.adaptationArea;
  const cropsVarietyCaution = cropDetails?.cropsVarietyInfo?.caution;
  const cropsVarietyImage = cropDetails?.cropsVarietyInfo?.image;

  // 재배정보
  const growingCondition = cropDetails?.cropsInfo?.growingCondition;

  // 병해, 해충
  const diseaseType = cropDetails?.cropsInfo?.diseaseType;
  const pestType = cropDetails?.cropsInfo?.pestType;

  // 작물 재배 정보 조회
  useEffect(() => {
    const fetchCropVarietyInfo = async () => {
      const data = await getCropVarietyInfo(cropsId, cropsVarietyId);
      setCropDetails(data.dataBody);
    };

    fetchCropVarietyInfo();
  }, [cropsId, cropsVarietyId]);

  // 테이블 렌더링
  const renderTable = (tableInfo: CropDetails['tableInfo']) => {
    const renderTableBody = (row: string[]) => {
      return row.map((cell, cellIndex) => <TableCell key={cellIndex}>{cell}</TableCell>);
    };
    if (!tableInfo) return null;

    return (
      <TableContainer>
        <TableHead>
          {tableInfo.tableHead.map((head, index) => (
            <TableCell key={`head-${index}`}>
              <TableCell>{head}</TableCell>
            </TableCell>
          ))}
        </TableHead>
        <TableBody>
          <TableRow>
            {tableInfo.tableTitle.map((title, index) => (
              <TableCell key={index}>{title}</TableCell>
            ))}
          </TableRow>
          {tableInfo.tableBody.map((row, rowIndex) => (
            <TableRow key={rowIndex}>{renderTableBody(row)}</TableRow>
          ))}
        </TableBody>
      </TableContainer>
    );
  };

  // "|" 문자열을 기준으로 나누어 줄바꿈하고 렌더링
  const renderConditionsWithBreaks: React.FC<RenderConditionsWithBreaksProps> = ({ contents, WrapperComponent }) => {
    return contents.split('|').map((contents, index) => (
      <>
        <WrapperComponent key={index}>- {contents}</WrapperComponent>
        <Spacer space={15} />
      </>
    ));
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }} contentContainerStyle={{ paddingBottom: 50 * heightPercent }}>
        <Header type={'default'} firstIcon={'back'} />
        {/* 이미지 */}
        <Image source={{ uri: cropsVarietyImage }} style={{ width: '100%', height: 'auto', aspectRatio: 1 }} resizeMode='center' />
        {/* 이름 */}
        {/*<LoadingSpinner loading={true} />*/}
        <Card>
          <Typo.BODY1_B>{cropsName}</Typo.BODY1_B>
          <Spacer space={10} />
          <Typo.BODY3_M>
            <Typo.BODY3_B>{cropsVarietyName}</Typo.BODY3_B> ({cropsVarietyCategory})
          </Typo.BODY3_M>
        </Card>
        <Spacer space={15} />
        <Divider />
        <Spacer space={15} />

        {/* 품종 정보 */}
        <Card>
          <Typo.BODY3_M color={Color.GREEN600}>용도 </Typo.BODY3_M>
          <Spacer space={5} />
          <Typo.BODY4_M>{cropsVarietyUsage}</Typo.BODY4_M>
          <Spacer space={15} />

          <Typo.BODY3_M color={Color.GREEN600}>기능 </Typo.BODY3_M>
          <Spacer space={5} />
          <Typo.BODY4_M>{cropsVarietyFunction}</Typo.BODY4_M>
          <Spacer space={15} />
          <Typo.BODY3_M color={Color.GREEN600}>특성 </Typo.BODY3_M>
          <Spacer space={5} />
          {cropsVarietyCharacteristic
            ? renderConditionsWithBreaks({
                contents: cropsVarietyCharacteristic,
                WrapperComponent: Typo.BODY4_M,
              })
            : null}
          <Spacer space={15} />
          <Typo.BODY3_M color={Color.GREEN600}>적응 지역 </Typo.BODY3_M>
          <Spacer space={5} />
          {cropsVarietyAdaptationArea
            ? renderConditionsWithBreaks({
                contents: cropsVarietyAdaptationArea,
                WrapperComponent: Typo.BODY4_M,
              })
            : null}
          <Spacer space={15} />
          <Typo.BODY3_M color={Color.GREEN600}>주의 사항 </Typo.BODY3_M>
          <Spacer space={5} />
          {cropsVarietyCaution
            ? renderConditionsWithBreaks({
                contents: cropsVarietyCaution,
                WrapperComponent: Typo.BODY4_M,
              })
            : null}
        </Card>
        <Spacer space={15} />
        <Divider />
        <Spacer space={15} />

        {/* 재배 기간 및 기후 조건 */}
        <Card>
          <Typo.BODY3_M color={Color.GREEN600}>추천 재배 기간 </Typo.BODY3_M>
          <Spacer space={5} />
          <Container>{cropDetails?.tableInfo ? renderTable(cropDetails.tableInfo) : null}</Container>
          <Typo.BODY3_M color={Color.GREEN600}>추천 재배 기후 조건 </Typo.BODY3_M>
          <Spacer space={5} />
          {growingCondition
            ? renderConditionsWithBreaks({
                contents: growingCondition,
                WrapperComponent: Typo.BODY4_M,
              })
            : null}
        </Card>
        <Spacer space={15} />
        <Divider />
        <Spacer space={15} />

        {/* 병해충 정보 */}
        <Card>
          <Typo.BODY3_M color={Color.GREEN600}>병해 종류 </Typo.BODY3_M>
          <Spacer space={5} />
          <Typo.BODY4_M>{diseaseType}</Typo.BODY4_M>
          <Spacer space={15} />
          <Typo.BODY3_M color={Color.GREEN600}>해충 종류 </Typo.BODY3_M>
          <Spacer space={5} />
          <Typo.BODY4_M>{pestType}</Typo.BODY4_M>
          <Spacer space={15} />
        </Card>
        <Spacer space={15} />
        <Divider />
        <Spacer space={15} />
      </ScrollView>
    </View>
  );
};

export default CropsDetailScreen;

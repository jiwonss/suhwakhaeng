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
    return contents.split('|').map((contents, index) => <WrapperComponent key={index}>- {contents}</WrapperComponent>);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }} contentContainerStyle={{ paddingBottom: 50 * heightPercent }}>
        <Header type={'default'} firstIcon={'back'} />
        {/* 이미지 */}
        <Image source={{ uri: cropsVarietyImage }} style={{ width: '100%', height: 'auto', aspectRatio: 1 }} resizeMode='center' />
        {/* 이름 */}
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
          {cropsVarietyCharacteristic ? renderConditionsWithBreaks({ contents: cropsVarietyCharacteristic, WrapperComponent: Typo.BODY4_M }) : null}
          <Spacer space={15} />
          <Typo.BODY3_M color={Color.GREEN600}>적응 지역 </Typo.BODY3_M>
          <Spacer space={5} />
          {cropsVarietyAdaptationArea ? renderConditionsWithBreaks({ contents: cropsVarietyAdaptationArea, WrapperComponent: Typo.BODY4_M }) : null}
          <Spacer space={15} />
          <Typo.BODY3_M color={Color.GREEN600}>주의 사항 </Typo.BODY3_M>
          <Spacer space={5} />
          {cropsVarietyCaution ? renderConditionsWithBreaks({ contents: cropsVarietyCaution, WrapperComponent: Typo.BODY4_M }) : null}
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
          {growingCondition ? renderConditionsWithBreaks({ contents: growingCondition, WrapperComponent: Typo.BODY4_M }) : null}
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

// {
// 	"name" : "감자",
// 	"category" : "FOOD_CROPS",
// 	"growingCondition" : "적배적온 : 14~23℃|덩이줄기 비대 적온 : 주간 23~24℃, 야간 10~14℃|전 생육기간동안 필요한 강수량 : 300~450mm|적정 토양산도 : pH 5.0~6.0",
// 	"diseaseType" : "검은무늬썩음병,겹둥근무늬병,균핵병,더뎅이병,역병,탄저병",
// 	"pestType" : "복숭아혹진딧물, 아메리카잎굴파리, 오이총채벌레, 청동방아벌레, 큰이십팔점박이무당벌레, 파밤나방",
//   "shippingTimeTableInfo": {
//     "tableHead": "작형,파종기,수확기,출하기,성출하기",
//     "tableTitle": "겨울재배,봄재배,여름재배,가을재배",
//     "shippingTimeTableValueInfoList": [
//       {
//         "croppingTypeName": "겨울재배",
//         "rowOrder": 0,
//         "columnOrder": 0,
//         "value" : "12중~1중"
//       },
//       {
//         "croppingTypeName": "겨울재배",
//         "rowOrder": 0,
//         "columnOrder": 1,
//         "value" : "4중~5중"
//       },
//       {
//         "croppingTypeName": "겨울재배",
//         "rowOrder": 0,
//         "columnOrder": 2,
//         "value" : "4중~7중"
//       },
//       {
//         "croppingTypeName": "겨울재배",
//         "rowOrder": 0,
//         "columnOrder": 3,
//         "value" : "4하"
//       },
//
//       {
//         "croppingTypeName": "봄재배",
//         "rowOrder": 1,
//         "columnOrder": 0,
//         "value" : "3상~중"
//       },
//       {
//         "croppingTypeName": "봄재배",
//         "rowOrder": 1,
//         "columnOrder": 1,
//         "value" : "6하~7중"
//       },
//       {
//         "croppingTypeName": "봄재배",
//         "rowOrder": 1,
//         "columnOrder": 2,
//         "value" : "6하~7하"
//       },
//       {
//         "croppingTypeName": "봄재배",
//         "rowOrder": 1,
//         "columnOrder": 3,
//         "value" : "7중"
//       },
//
//       {
//         "croppingTypeName": "여름재배",
//         "rowOrder": 2,
//         "columnOrder": 0,
//         "value" : "4하~5중"
//       },
//       {
//         "croppingTypeName": "여름재배",
//         "rowOrder": 2,
//         "columnOrder": 1,
//         "value" : "9중~9중"
//       },
//       {
//         "croppingTypeName": "여름재배",
//         "rowOrder": 2,
//         "columnOrder": 2,
//         "value" : "9중~2하"
//       },
//       {
//         "croppingTypeName": "여름재배",
//         "rowOrder": 2,
//         "columnOrder": 3,
//         "value" : "9상~10하"
//       },
//
//       {
//         "croppingTypeName": "가을재배",
//         "rowOrder": 3,
//         "columnOrder": 0,
//         "value" : "7중~8상"
//       },
//       {
//         "croppingTypeName": "가을재배",
//         "rowOrder": 3,
//         "columnOrder": 1,
//         "value" : "10하~12상"
//       },
//       {
//         "croppingTypeName": "가을재배",
//         "rowOrder": 3,
//         "columnOrder": 2,
//         "value" : "10하~1하"
//       },
//       {
//         "croppingTypeName": "가을재배",
//         "rowOrder": 3,
//         "columnOrder": 3,
//         "value" : "11하"
//       }
//     ]
//   }
// }
//     "cropsVarietyInfo": {
//       "id": 4,
//       "name": "골든에그",
//       "category": "여름감자",
//       "usage": "가공용",
//       "function": "가공적성",
//       "characteristic": "내서성 및 다수성으로 중앙아시아 지역 기후에 적응성이 좋음|지상부 숙기는 중숙성임|꽃은 흰색이며, 환경에 따라 열매가 맺힘|괴경은 장타원형으로 눈이 얕고 표피와 육색이 진한 황색임|카자흐스탄, 키르기스스탄 및 국내 고랭지 여름재배에 적합함|휴면기간은 90일 내외로 수미와 유사함",
//       "adaptationArea": "카자흐스탄,키르기스스탄,강원(고랭지)",
//       "caution": "감자역병 및 바이러스에 약하므로 채종재배 시 진딧물방제 등 병해충 방제를 철저히 할 것|생육기간이 다소 길어서 국내 고랭지재배 시는 산광싹틔우기를 통해 출현을 촉진하도록 할 것",
//       "image": "https://www.seed.go.kr/imgView/seed/farmView/imgView.do?filename=/VAR_FILE/2019/201912010501323867.JPG"
//     }
//   }
// }

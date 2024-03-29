import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
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

interface CropDetails {
  tableTitle: string[];
  tableInfo?: {
    tableHead: string[];
    tableTitle: string[];
    tableBody: string[][];
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
  const [cropDetails, setCropDetails] = useState<CropDetails | null>(null);

  useEffect(() => {
    const fetchCropVarietyInfo = async () => {
      const data = await getCropVarietyInfo(cropsId, cropsVarietyId);
      setCropDetails(data.dataBody);
    };

    fetchCropVarietyInfo();
  }, [cropsId, cropsVarietyId]);

  const renderTableRow = (row: string[]) => {
    return row.map((cell, cellIndex) => <TableCell key={cellIndex}>{cell}</TableCell>);
  };

  const renderTable = (tableInfo: CropDetails['tableInfo']) => {
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
            <TableRow key={rowIndex}>{renderTableRow(row)}</TableRow>
          ))}
        </TableBody>
      </TableContainer>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }} contentContainerStyle={{ paddingBottom: 50 * heightPercent }}>
        <Header type={'default'} firstIcon={'back'} />
        <Typo.BODY4_M>작물 상세페이지</Typo.BODY4_M>
        <Spacer space={20} />
        <Container>{cropDetails && cropDetails.tableInfo ? renderTable(cropDetails.tableInfo) : null}</Container>
      </ScrollView>
    </View>
  );
};

export default CropsDetailScreen;

// {
//   "dataHeader": {
//     "successCode": 0,
//     "resultCode": null,
//     "resultMessage": null
//   },
//   "dataBody": {
//     "cropsInfo": {
//       "id": 2,
//       "name": "토마토",
//       "category": "VEGETABLE",
//       "growingCondition": "생육온도 : 발아적온 25~30℃ 육묘적온 20~25℃ 개화적온 20~25℃ 생육적온 17~27℃ 과비대적온 25~30℃ 저장적온 4℃|재배적지 : 토양산도 pH 6.5~7.0 범위에서 생육양호",
//       "diseaseType": "검은점뿌리썩음병,겹무늬병,궤양병,균핵병,덤블위축바이러스,모자이크병,반점위조바이러스,뿌리역병,시들음병,잎곰팡이병,잎마름병,잎마름역병,잘록병,잿빛곰팡이병,점무늬병,줄기끝마름병,줄기무름병,줄기속썩음병,탄저병,풋마름병,황화잎말림바이러스,흰가루병,흰무늬병",
//       "pestType": "꽃노랑총채벌레,담배가루이,담배거세미나방,대만총채벌레,목화진딧물,복숭아혹진딧물,아메리카잎굴파리,온실가루이,왕담배나방,토마토녹응애"
//     },
//     "cultivationCharacteristicInfo": {
//       "id": 1,
//       "scientificName": "Lycopersicum esculentum MILL.",
//       "classification": "가지과",
//       "physiologicalCharacteristic": "호온성 채소이나 고온다습하면 착과불량, 과실비대 부진, 열과, 품질저하 및 병해발생 증가|육묘기 야간온도가 12℃ 이하의 저온에 처하면 기형과 발생증가|일장에 대해서는 중일성 작물이나 꽃눈분화는 16시간 정도의 장일에서 빨라지고, 제 1화방의 착과 절위는 8시간 정도의 단일하에서 낮아짐",
//       "mainTech": "밀식재배 (90×50cm→90×20cm) : 93%증수|점적관수 재배 (분수관수 대비) : 6~10% 증수|이산화탄소 시비 : 무시용 대비 32% 증수|어린묘 재배 (9~11엽묘→5~6엽묘) : 43% 증수"
//     },
//     "tableInfo": {
//       "tableId": 2,
//       "tableHead": [
//         "작형",
//         "촉성재배",
//         "반촉성재배",
//         "조숙재배",
//         "노지억제재배"
//       ],
//       "tableTitle": [
//         "파종기",
//         "정식기",
//         "수확기",
//         "성출하기"
//       ],
//       "tableBody": [
//         [
//           "9상~10상",
//           "10하~11하",
//           "1중~5상",
//           "2상~4중"
//         ],
//         [
//           "11중~12하",
//           "12하~2상",
//           "3상~6상",
//           "4상~6중"
//         ],
//         [
//           "2상~3상",
//           "5상~5하",
//           "6중~7하",
//           "6상~7중"
//         ],
//         [
//           "4상~4하",
//           "5상~5하",
//           "7하~10상",
//           "8상~9중"
//         ]
//       ]
//     },
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

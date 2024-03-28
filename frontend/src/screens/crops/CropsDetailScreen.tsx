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

const Container = styled.View`
  margin-left: ${20 * widthPercent}px;
  margin-right: ${20 * widthPercent}px;
  margin-bottom: ${20 * heightPercent}px;
  row-gap: ${5 * heightPercent}px;
`;

const Table = styled.View`
  margin: 10px 0;
`;

const TableRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 0;
`;

const TableCell = styled.Text`
  flex: 1;
  text-align: center;
`;

const CropsDetailScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'CropsDetailScreen'>>();
  const { cropsId, cropsVarietyId } = route.params;
  const [cropDetails, setCropDetails] = useState(null);

  useEffect(() => {
    const fetchCropVarietyInfo = async () => {
      const data = await getCropVarietyInfo(cropsId, cropsVarietyId);
      setCropDetails(data.dataBody);
    };

    fetchCropVarietyInfo();
  }, [cropsId, cropsVarietyId]);

  const renderTable = (tableInfo) => (
    <Table>
      <TableRow>
        {tableInfo.tableHead.map((head, index) => (
          <TableCell key={index}>{head}</TableCell>
        ))}
      </TableRow>
      {tableInfo.tableBody.map((row, rowIndex) => (
        <TableRow key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <TableCell key={cellIndex}>{cell}</TableCell>
          ))}
        </TableRow>
      ))}
    </Table>
  );

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

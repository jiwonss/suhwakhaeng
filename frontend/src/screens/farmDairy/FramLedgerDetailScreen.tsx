import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import Header from '../../components/header/Header';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { View } from 'react-native';
import { LocalImageLoader, UriImageLoader } from '../../components/image/ImageLoader';
import { Spacer } from '../../components/basic/Spacer';
import { MoreModal } from '../../modules/marketModules/MarketDetailModules';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { deleteLedger, getLedgerDetail } from '../../apis/farm/farm';

interface FarmLedgerDetailProps {
  route: {
    params: {
      accountBookId: number;
      today: string;
    };
  };
}

type RootStackParamList = {
  FarmScreen: undefined;
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
  padding: ${heightPercent * 15}px ${widthPercent * 40}px;
`;

const FarmDairyDetailScreen = (props: FarmLedgerDetailProps) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState({});
  const onPressButton = () => {
    setIsVisible((prevState) => !prevState);
    console.log('작성 완료');
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getLedgerDetail(props.route.params.accountBookId);
      setData(response.dataBody);
      console.log(response.dataBody);
      console.log(props.route.params.today)
    };

    fetchData();
  }, []);

  const onDelete = (postId: number) => {
    const fetchData = async () => {
      await deleteLedger(postId);
      console.log('처리');
    };

    fetchData();
    navigation.push('FarmScreen');
  };

  return (
    <Container>
      <Header type='default' firstIcon='back' secondIcon='more' onPressMore={onPressButton} />
      <FormContainer>
        <FormItemContainer>
          <Typo.BODY3_B>{props.route.params.today}</Typo.BODY3_B>
        </FormItemContainer>
        <FormItemContainer>
          <View style={{ flexDirection: 'row' }}>
            <Typo.BODY3_M color={Color.GREEN500}>작물명</Typo.BODY3_M>
            <Typo.BODY3_M> | </Typo.BODY3_M>
            <Typo.BODY3_M>{data.myCropsName}</Typo.BODY3_M>
          </View>
        </FormItemContainer>
        <FormItemContainer>
          <View style={{ flexDirection: 'row' }}>
            <Typo.BODY3_M color={Color.GREEN500}>거래처</Typo.BODY3_M>
            <Typo.BODY3_M> | </Typo.BODY3_M>
            <Typo.BODY3_M>{data.title}</Typo.BODY3_M>
          </View>
        </FormItemContainer>
        <FormItemContainer>
          <View style={{ flexDirection: 'row' }}>
            {data && data.finance === 'INCOME' ? <Typo.BODY3_M color={Color.GREEN500}>수입</Typo.BODY3_M> : <Typo.BODY3_M color={Color.GREEN500}>지출</Typo.BODY3_M>}
            <Typo.BODY3_M> | </Typo.BODY3_M>
            <Typo.BODY3_M>{data.amount}원</Typo.BODY3_M>
          </View>
        </FormItemContainer>
        <FormItemContainer>
          <View style={{ flexDirection: 'row' }}>
            <Typo.BODY3_M color={Color.GREEN500}>한줄 메모</Typo.BODY3_M>
            <Typo.BODY3_M> | </Typo.BODY3_M>
            <Typo.BODY3_M>{data.content}</Typo.BODY3_M>
          </View>
        </FormItemContainer>
        <FormItemContainer>
            <Spacer space={heightPercent * 40}></Spacer>
            {data.image && <UriImageLoader style={{ width: '100%', height: heightPercent * 300 }} resizeMode='contain' uri={data.image} /> }
          </FormItemContainer>
      </FormContainer>
      <MoreModal isVisible={isVisible} setIsVisible={setIsVisible} onDelete={onDelete} onModify={() => {}} postId={props.route.params.accountBookId} status={1}></MoreModal>
    </Container>
  );
};

export default FarmDairyDetailScreen;

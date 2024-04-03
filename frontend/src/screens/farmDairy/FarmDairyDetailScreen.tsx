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
import { deleteDiary } from '../../apis/farm/farm';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

interface FarmDiaryDetailProps {
  route: {
    params: {
      diary: any;
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

const FarmDairyDetailScreen = (props: FarmDiaryDetailProps) => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState({});
  const onPressButton = () => {
    setIsVisible((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchData = async () => {
      setData(props.route.params.diary);
    };

    fetchData();
  }, []);

  const onDelete = (diaryId : number) => {
    const fetchData = async () => {
      await deleteDiary(diaryId);
    };

    fetchData();
    navigation.push('FarmScreen');
  };

  return (
    <Container>
      <Header type='default' firstIcon='back' secondIcon='more' onPressMore={onPressButton} />
      {Object.keys(data).length !== 0 && (
        <FormContainer>
          <FormItemContainer>
            <Typo.BODY3_B>{data.diaryDate}</Typo.BODY3_B>
          </FormItemContainer>
          <FormItemContainer>
            <View style={{ flexDirection: 'row' }}>
              <Typo.BODY3_M color={Color.GREEN500}>작물명</Typo.BODY3_M>
              <Typo.BODY3_M> | </Typo.BODY3_M>
              <Typo.BODY3_M>{data.myCropsSimpleResponse.myCropsName}</Typo.BODY3_M>
            </View>
          </FormItemContainer>
          <FormItemContainer>
            <View style={{ flexDirection: 'row' }}>
              <Typo.BODY3_M color={Color.GREEN500}>영농작업</Typo.BODY3_M>
              <Typo.BODY3_M> | </Typo.BODY3_M>
              <Typo.BODY3_M>{data.diaryContent}</Typo.BODY3_M>
            </View>
          </FormItemContainer>
          <FormItemContainer>
            <View style={{ flexDirection: 'row' }}>
              <Typo.BODY3_M color={Color.GREEN500}>한줄 메모</Typo.BODY3_M>
              <Typo.BODY3_M> | </Typo.BODY3_M>
              <Typo.BODY3_M>{data.diaryMemo}</Typo.BODY3_M>
            </View>
          </FormItemContainer>
          <FormItemContainer>
            <Spacer space={heightPercent * 40}></Spacer>
            {data.diaryImage && <UriImageLoader style={{ width: '100%', height: heightPercent * 300 }} resizeMode='contain' uri={data.diaryImage} /> }
          </FormItemContainer>
        </FormContainer>
      )}
      <MoreModal isVisible={isVisible} setIsVisible={setIsVisible} onDelete={ ()=> onDelete(props.route.params.diary.diaryId)} onModify={() => {}} postId={0} status={1}></MoreModal>
    </Container>
  );
};

export default FarmDairyDetailScreen;

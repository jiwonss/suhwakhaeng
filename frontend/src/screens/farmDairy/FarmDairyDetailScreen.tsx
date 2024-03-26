import React, { useState } from 'react';
import styled from 'styled-components/native';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import Header from '../../components/header/Header';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { View } from 'react-native';
import { LocalImageLoader, UriImageLoader } from '../../components/image/ImageLoader';
import { Spacer } from '../../components/basic/Spacer';
import { MoreModal } from '../../modules/marketModules/MarketDetailModules';

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

const FarmDairyDetailScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const onPressButton = () => {
    setIsVisible(prevState => !prevState);
    console.log('작성 완료');
  };
  
  const onDelete = () => {
    const fetchData = async () => {
      const diaryList = await deleteDiary();
      //
      console.log(diaryList);
    };
    
    fetchData();
  };

  return (
    <Container>
      <Header type='default' firstIcon='back' secondIcon='more' onPressMore={onPressButton}/>
      <FormContainer>
        <FormItemContainer>
          <Typo.BODY3_B>2024.03.23</Typo.BODY3_B>
        </FormItemContainer>
        <FormItemContainer>
          <View style={{ flexDirection: 'row' }}>
            <Typo.BODY3_M color={Color.GREEN500}>작물명</Typo.BODY3_M>
            <Typo.BODY3_M > | </Typo.BODY3_M>
            <Typo.BODY3_M >감자</Typo.BODY3_M>
          </View>
        </FormItemContainer>
        <FormItemContainer>
        <View style={{ flexDirection: 'row' }}>
            <Typo.BODY3_M color={Color.GREEN500}>영농작업</Typo.BODY3_M>
            <Typo.BODY3_M > | </Typo.BODY3_M>
            <Typo.BODY3_M >씨뿌림</Typo.BODY3_M>
          </View>
        </FormItemContainer>
        <FormItemContainer>
        <View style={{ flexDirection: 'row' }}>
            <Typo.BODY3_M color={Color.GREEN500}>한줄 메모</Typo.BODY3_M>
            <Typo.BODY3_M > | </Typo.BODY3_M>
            <Typo.BODY3_M >감자의 씨를 뿌렸어요</Typo.BODY3_M>
          </View>
        </FormItemContainer>
        <FormItemContainer>
          <Spacer space={heightPercent * 40}></Spacer>
          <LocalImageLoader style={{ width: '100%', height: heightPercent * 150 }} resizeMode='contain' source={require('../../../assets/imgs/favicon.png')} />
          <Spacer space={heightPercent * 40}></Spacer>
          <LocalImageLoader style={{ width: '100%', height: heightPercent * 150 }} resizeMode='contain' source={require('../../../assets/imgs/favicon.png')} />
          <Spacer space={heightPercent * 40}></Spacer>
          <LocalImageLoader style={{ width: '100%', height: heightPercent * 150 }} resizeMode='contain' source={require('../../../assets/imgs/favicon.png')} />
          <Spacer space={heightPercent * 40}></Spacer>
          <LocalImageLoader style={{ width: '100%', height: heightPercent * 150 }} resizeMode='contain' source={require('../../../assets/imgs/favicon.png')} />
        </FormItemContainer>
      </FormContainer>
      <MoreModal isVisible={isVisible} setIsVisible={setIsVisible} onDelete={onDelete} onModify={()=>{}} postId={0}>          
      </MoreModal>
    </Container>
  );
};

export default FarmDairyDetailScreen;

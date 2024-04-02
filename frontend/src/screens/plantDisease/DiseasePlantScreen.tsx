import { ActivityIndicator, ScrollView, View } from 'react-native';
import styled from 'styled-components/native';
import Camera from '../../../assets/icons/camera_color.svg';
import Search3D from '../../../assets/icons/search3D.svg';
import { Spacer } from '../../components/basic/Spacer';
import { NewsItemCard } from '../../components/card/NewsItemCard';
import Header from '../../components/header/Header';
import MenuButton from '../../components/menuButton/MenuButton';
import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';
import React, { useEffect, useState } from 'react';
import { getNews } from '../../apis/services/news/news';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../recoil/atoms/userInfoState';

const Container = styled.View`
  margin-left: ${20 * widthPercent}px;
  margin-right: ${20 * widthPercent}px;
  margin-bottom: ${20 * heightPercent}px;
  row-gap: ${5 * heightPercent}px;
`;

const TextContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: ${heightPercent * 80}px;
  row-gap: ${heightPercent * 20}px;
`;

const DiseasePlantScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const userInfo = useRecoilValue(userInfoState);
  const [render, setRander] = useState(false);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getData = async () => {
      // 로그인 하기//
      const { dataBody } = await getNews();

      const newdata = dataBody.map((item) => {
        if (item.thumbnail.includes('data:image/gif;base64')) {
          return { ...item, thumbnail: '' };
        }
        return item;
      });

      console.log(newdata);
      setRander(true);
      setNews(newdata);
    };

    getData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }} contentContainerStyle={{ paddingBottom: 50 * heightPercent }}>
        {/*헤더*/}
        <Header type={'default'} title={'작물 병원'} />
        <Spacer space={20} />
        <Container>
          <Typo.BODY4_M>
            {userInfo.nickname}작물의 <Typo.BODY4_M color={Color.GREEN500}>상태</Typo.BODY4_M>를 확인해볼까요?
          </Typo.BODY4_M>
        </Container>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <MenuButton size='big' title='작물 검색' borderColor={Color.GREEN50} onPressButton={() => navigation.navigate('CropsScreen')}>
            <Search3D width={widthPercent * 40} height={heightPercent * 40} />
          </MenuButton>
          <Spacer horizontal={true} space={40} />
          <MenuButton size='big' title='질병 진단' onPressButton={() => navigation.navigate('CameraScreen')}>
            <Camera width={widthPercent * 40} height={heightPercent * 40} />
          </MenuButton>
        </View>
        <Spacer space={40} />
        <Container>
          <Typo.BODY4_M>
            최근 농업에선 <Typo.BODY4_M color={Color.GREEN500}>어떤 일</Typo.BODY4_M>들이 있었을까요?
          </Typo.BODY4_M>
          <Spacer space={widthPercent * 20}></Spacer>
          {render ? (
            news.map((item, index) => (
              <NewsItemCard
                key={index}
                company={item.company} // 회사 정보 추가
                content={item.content} // 컨텐츠 내용
                date={item.date} // 날짜 정보 추가
                href={item.url} // 하이퍼링크 정보
                title={item.title} // 제목 정보
                uri={item.thumbnail} // 이미지 URI 정보
              />
            ))
          ) : (
            <TextContainer>
              <ActivityIndicator size='large' />
            </TextContainer>
          )}
        </Container>
      </ScrollView>
    </View>
  );
};

export default DiseasePlantScreen;

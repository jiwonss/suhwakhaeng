import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import Header from '../../components/header/Header';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChattingListItem } from '../../components/profileCard/ProfileCard';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { Spacer } from '../../components/basic/Spacer';
import { BasicButton } from '../../components/button/Buttons';
import BottomNavigation from '../../components/navigation/BottomNavigation';

type RootStackParamList = {
  ChattingRoomScreen: { id: number };
  MarketScreen: undefined;
};
type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const Container = styled.View`
  flex: 1;
  background-color: ${Color.WHITE};
`;

const ContentContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: ${heightPercent * 100}px;
`;

const ChatListScreen = () => {
  // 네비게이션
  const navigation = useNavigation<RootStackNavigationProp>();

  const onPressChatItem = (chatId: number) => {
    navigation.navigate('ChattingRoomScreen', { id: chatId });
  };

  // 채팅 목록
  const [chatData, setChatData] = useState<
    {
      chatId: number;
      userId: number;
      userName: string;
      address: string;
      date: string;
      message: string;
      profileImge: string;
    }[]
  >([]);

  useEffect(() => {
    // TODO: 렌더링 시 채팅 목록 불러오기
    const data: React.SetStateAction<{ chatId: number; userId: number; userName: string; address: string; date: string; message: string; profileImge: string }[]> = [
      {
        chatId: 1,
        userId: 1,
        userName: '김농민',
        address: '광주 서구',
        date: '2024-03-20 10:23:44',
        message: '안녕하세요',
        profileImge: '',
      },
      {
        chatId: 2,
        userId: 2,
        userName: '박농민',
        address: '광주 서구',
        date: '2024-03-20 9:23:44',
        message: '안녕하세요',
        profileImge: '',
      },
      {
        chatId: 3,
        userId: 2,
        userName: '박농민',
        address: '광주 서구',
        date: '2024-03-20 9:23:44',
        message: '햇감자 너무 맛있어요 진짜 눈물나요 장난아니네요 감사합니다',
        profileImge: '',
      },
    ];
    setChatData(data);
  }, []);

  return (
    <Container>
      <Header type='default' title='채팅 내역' firstIcon='back' />
      <ScrollView style={{ flex: 1, marginTop: heightPercent * 10 }}>
        {chatData.length !== 0 ? (
          chatData.map((elem) => (
            <ChattingListItem key={elem.chatId} onPress={() => onPressChatItem(elem.chatId)} name={elem.userName} date={elem.date} location={elem.address} certification={false}>
              <Typo.BODY4_M numberOfLines={1}>{elem.message}</Typo.BODY4_M>
            </ChattingListItem>
          ))
        ) : (
          <ContentContainer>
            <Typo.BODY4_M>인증된 수확행 회원들이 직접 올린 물건을 구경하고</Typo.BODY4_M>
            <Spacer space={heightPercent * 4} />
            <Typo.BODY4_M>1:1 채팅으로 거래해보세요</Typo.BODY4_M>
            <Spacer space={heightPercent * 20} />
            <BasicButton
              onPress={() => {
                navigation.navigate('MarketScreen');
              }}
              width={widthPercent * 100}
              height={heightPercent * 45}
              borderColor={Color.GREEN500}
              borderRadius={10}
            >
              <Typo.BODY3_M color={Color.WHITE}>장터 구경하기</Typo.BODY3_M>
            </BasicButton>
          </ContentContainer>
        )}
      </ScrollView>
    </Container>
  );
};

export default ChatListScreen;

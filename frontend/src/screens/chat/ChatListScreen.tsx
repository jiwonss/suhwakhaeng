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
import { getChatList } from '../../apis/services/chat/chat';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';

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
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const onPressChatItem = (chatId: string) => {
    navigation.navigate('ChattingRoomScreen', { id: chatId });
  };

  // 채팅 목록
  const [chatData, setChatData] = useState<
    {
      userInfo: {
        userId: number;
        nickname: string;
        profileImage: string;
        sido: string;
        gugun: string;
      };
      id: string;
      lastMessage: string;
      sendTime: string;
    }[]
  >([]);

  useEffect(() => {
    // TODO: 렌더링 시 채팅 목록 불러오기
    const getList = async () => {
      const response = await getChatList();
      console.log(response.dataBody);
      setChatData(response.dataBody);
      setIsLoaded(true);
    };

    getList();
  }, []);

  return (
    <Container>
      <Header type='default' title='채팅 내역' firstIcon='back' />
      <ScrollView style={{ flex: 1, marginTop: heightPercent * 10 }}>
        {isLoaded ? (
          chatData.length !== 0 ? (
            chatData.map((elem) => (
              <ChattingListItem
                key={elem.userInfo.userId}
                onPress={() => onPressChatItem(elem.id)}
                name={elem.userInfo.nickname}
                date={elem.sendTime}
                location={`${elem.userInfo.sido} ${elem.userInfo.gugun}`}
                certification={false}
              >
                <Typo.BODY4_M numberOfLines={1}>{elem.lastMessage}</Typo.BODY4_M>
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
          )
        ) : (
          <></>
        )}
      </ScrollView>
    </Container>
  );
};

export default ChatListScreen;

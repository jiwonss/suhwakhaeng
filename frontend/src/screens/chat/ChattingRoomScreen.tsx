import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';
import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import Header from '../../components/header/Header';
import { Keyboard, ScrollView } from 'react-native';
import { SingleLineInputBox } from '../../components/inputBox/Input';
import { SendButton } from '../../components/button/Buttons';
import { widthPercent } from '../../config/dimension/Dimension';
import { MyChat, PartnerChat } from '../../components/chattingMessage/ChattingMessage';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../recoil/atoms/userInfoState';
import * as StompJs from '@stomp/stompjs';
<<<<<<< HEAD
import { getChatData } from '../../apis/services/chat/chat';
=======
import { Client } from '@stomp/stompjs';
import { TextEncoder, TextDecoder } from 'text-encoding';
import EncryptedStorage from 'react-native-encrypted-storage';
import { getChatList } from '../../apis/services/chat/Chat';
>>>>>>> 1c5e1f539fde057eb1a912fb8da074abbc8bd1ae

interface ChattingRoomProps {
  route: {
    params: { id: string };
  };
}

interface Chat {
  id: null | string | number;
  chatRoomId: string;
  userId: number;
  message: string;
  nickname: string;
  profileImage: string;
  sendTime: string;
}

const Container = styled.View`
  flex: 1;
  background-color: ${Color.WHITE};
`;

const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 auto;
  column-gap: ${widthPercent * 4}px;
  /* border: 1px; */
`;

const ChattingRoomScreen = (props: ChattingRoomProps) => {
  const [token, setToken] = useState<null | string>(null);
  Object.assign('global', {
    TextEncoder,
    TextDecoder,
  });

  // 보낼 메세지
  const [message, setMessage] = useState<string>('');
<<<<<<< HEAD
  const [client, changeClient] = useState<StompJs.Client>(new StompJs.Client());

  const onSubmitMessage = () => {
    if (message) {
      // TODO: 메세지 보내기
      // sendMessage(message, 'pub/room/1', 1);
      setChatData([...chatData, { userId: parseInt(userInfo.userId), message: message, date: getKST() }]);
=======

  // 채팅 데이터
  const userInfo = useRecoilValue(userInfoState);
  const [chatData, setChatData] = useState<Array<Chat>>([]);

  const client = useRef<Client | null>(null);

  const onSubmitMessage = () => {
    if (message) {
      client.current?.publish({
        destination: `/pub/room/${props.route.params.id}`,
        headers: { Authorization: token !== null ? token : '' },
        body: JSON.stringify({
          message: message,
        }),
      });
>>>>>>> 1c5e1f539fde057eb1a912fb8da074abbc8bd1ae
      setMessage('');
    }
    Keyboard.dismiss();
  };

<<<<<<< HEAD
  // 채팅 데이터
  const userInfo = useRecoilValue(userInfoState);
  const [chatData, setChatData] = useState<
    {
      id: string;
      userId: number;
      chatRoomId: string;
      nickname: string;
      profileImage: string;
      message: string;
      sendTime: string;
    }[]
  >([]);
=======
  useEffect(() => {
    const callback = function (text: any) {
      if (text.body) {
        const data = JSON.parse(text.body);
        setChatData([...chatData, data]);
      }
    };
>>>>>>> 1c5e1f539fde057eb1a912fb8da074abbc8bd1ae

    const connect = () => {
      client.current = new StompJs.Client({
        brokerURL: 'ws://13.209.147.164:9001 /ws',
        reconnectDelay: 5000, // 자동 재 연결
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        forceBinaryWSFrames: true,
        onConnect: () => {
          client.current?.subscribe(`/topic/room.${props.route.params.id}`, callback); // 연결 후에 subscribe
        },
        onStompError: (frame) => {
          console.error(frame);
        },
      });

      client.current.activate();
    };

    const disconnect = () => {
      client.current?.deactivate();
    };
    const getAccessToken = async () => {
      const resToken = await EncryptedStorage.getItem('accessToken');
      setToken(resToken);
    };
    getAccessToken();
    connect();
    return () => disconnect();
  }, [chatData, props.route.params.id]);

  useEffect(() => {
<<<<<<< HEAD
    const getData = async () => {
      const response = await getChatData({ chatRoomId: props.route.params.id });
      setChatData(response.dataBody);
    };

    getData();
    connect();
    return () => disConnect();
  }, []);
=======
    const getChatListResponse = async () => {
      const response = await getChatList(props.route.params.id);
      setChatData(response.dataBody);
    };
    getChatListResponse();
  }, [props.route.params.id]);
>>>>>>> 1c5e1f539fde057eb1a912fb8da074abbc8bd1ae

  // 스크롤 하단으로
  const scrollViewRef = useRef<ScrollView | null>(null);
  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: false });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatData]);

  return (
    <Container>
      <Header type='default' title='김농민' firstIcon='back' />
      <ScrollView style={{ padding: widthPercent * 10 }} ref={scrollViewRef} onLayout={scrollToBottom}>
        {chatData.map((item) =>
<<<<<<< HEAD
          String(item.userId) == userInfo.userId ? (
            <MyChat timeStamp={item.date} key={item.date}>
=======
          item.userId === Number(userInfo.userId) ? (
            <MyChat timeStamp={item.sendTime} key={item.sendTime}>
>>>>>>> 1c5e1f539fde057eb1a912fb8da074abbc8bd1ae
              <Typo.BODY4_M color={Color.WHITE}>{item.message}</Typo.BODY4_M>
            </MyChat>
          ) : (
            <PartnerChat backgroundColor={Color.GRAY100} timeStamp={item.sendTime} key={item.sendTime}>
              <Typo.BODY4_M color={Color.BLACK}>{item.message}</Typo.BODY4_M>
            </PartnerChat>
          )
        )}
      </ScrollView>
      <ButtonContainer>
        <SingleLineInputBox width={300} placeholder={'메세지를 입력하세요'} value={message} onChangeText={setMessage} />
        <SendButton onPress={onSubmitMessage} />
      </ButtonContainer>
    </Container>
  );
};

export default ChattingRoomScreen;

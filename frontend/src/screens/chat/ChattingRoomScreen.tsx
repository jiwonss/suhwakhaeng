import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';
import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import Header from '../../components/header/Header';
import { Keyboard, ScrollView } from 'react-native';
import { SingleLineInputBox } from '../../components/inputBox/Input';
import { SendButton } from '../../components/button/Buttons';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { MyChat, PartnerChat } from '../../components/chattingMessage/ChattingMessage';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../recoil/atoms/userInfoState';
import { getKST } from '../../util/BasicUtil';
import * as StompJs from '@stomp/stompjs';
import { getChatData } from '../../apis/services/chat/chat';

interface ChattingRoomProps {
  route: {
    params: { id: string };
  };
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
  // 보낼 메세지
  const [message, setMessage] = useState<string>('');
  const [client, changeClient] = useState<StompJs.Client>(new StompJs.Client());

  const onSubmitMessage = () => {
    if (message) {
      // TODO: 메세지 보내기
      // sendMessage(message, 'pub/room/1', 1);
      setChatData([...chatData, { userId: parseInt(userInfo.userId), message: message, date: getKST() }]);
      setMessage('');
    }
    Keyboard.dismiss();
  };

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

  const callback = function (message: any) {
    if (message.body) {
      setChatData([...chatData, message]);
    }
  };

  const connect = () => {
    try {
      const clientdata = new StompJs.Client({
        brokerURL: 'ws://localhost:8888/ws',
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });
      clientdata.debug(() => {
        console.log('h');
      });
      clientdata.onConnect = function () {
        console.log('연결되었습니다.');
        clientdata.subscribe(`/topic/room.1`, callback);
      };
      // console.log(clientdata.brokerURL, clientdata.active);
      clientdata.activate();
      changeClient(clientdata);
    } catch (err) {
      console.log(err);
    }
  };

  const disConnect = () => {
    if (client === null) {
      return;
    }
    client.deactivate();
  };

  useEffect(() => {
    const getData = async () => {
      const response = await getChatData({ chatRoomId: props.route.params.id });
      setChatData(response.dataBody);
    };

    getData();
    connect();
    return () => disConnect();
  }, []);

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
          String(item.userId) == userInfo.userId ? (
            <MyChat timeStamp={item.date} key={item.date}>
              <Typo.BODY4_M color={Color.WHITE}>{item.message}</Typo.BODY4_M>
            </MyChat>
          ) : (
            <PartnerChat backgroundColor={Color.GRAY100} timeStamp={item.date} key={item.date}>
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

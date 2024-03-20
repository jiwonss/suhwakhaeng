import styled from 'styled-components/native';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import * as Color from '../../config/color/Color';
import React from 'react';
import { View } from 'react-native';

interface ChattingMessageProps {
  minHeight?: number;
  minWidth?: number;
  maxWidth?: number;
  children: React.ReactNode;
  backgroundColor?: string;
  timeStamp: Date | string;
}

const StyledChatContainer = styled.View<{
  minHeight?: number;
  minWidth?: number;
  maxWidth?: number;
  backgroundColor?: string;
}>`
  min-height: ${(props) => props.minHeight || heightPercent * 15}px;
  min-width: ${(props) => props.minWidth || widthPercent * 25}px;
  max-width: ${(props) => props.maxWidth || widthPercent * 150}px;
  background-color: ${(props) => props.backgroundColor || Color.GREEN400};
  border-radius: 10px;
  padding: ${heightPercent * 10}px ${widthPercent * 12}px;
  margin: 5px 7px;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
`;

interface TimeStampProps {
  timeStamp: Date | string;
}

const TimeStampText = styled.Text`
  font-family: 'GmarketSansTTFMedium';
  font-size: 12px;
  color: ${Color.ONYX};
  justify-content: flex-end;
  margin-bottom: 5px;
`;

// 타임스탬프 컴포넌트
/**
 * 채팅 메시지의 타임스탬프를 표시하는 컴포넌트입니다. 타임스탬프는 `Date` 객체 또는 문자열 형태로 받을 수 있으며,
 * 시간은 HH:mm 형식으로 포맷됩니다.
 *
 * @component
 * @example
 * <TimeStamp timeStamp={new Date()} />
 *
 * @param {Object} props - 컴포넌트에 전달되는 props 객체입니다.
 * @param {Date|string} props.timeStamp - 표시할 시간입니다. `Date` 객체나 ISO 8601 형식의 문자열을 받을 수 있습니다.
 */
const TimeStamp: React.FC<TimeStampProps> = ({ timeStamp }: { timeStamp: Date | string }) => {
  const formatTime = (time: Date | string) => {
    const date = typeof time === 'string' ? new Date(time) : time;
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  return <TimeStampText>{formatTime(timeStamp)}</TimeStampText>;
};

// 나의 채팅 메시지 컴포넌트
/**
 * 사용자(본인)의 채팅 메시지를 표시하는 컴포넌트입니다. 메시지 옆에 타임스탬프가 표시됩니다.
 *
 * @component
 * @example
 * <MyChat
 *   timeStamp={new Date()}
 *   minHeight={20}
 *   minWidth={100}
 *   maxWidth={200}
 *   backgroundColor={Color.BLUE200}
 * >
 *   <Text>안녕하세요!</Text>
 * </MyChat>
 *
 * @param {ChattingMessageProps} props - 컴포넌트에 전달되는 props 객체입니다.
 */
export const MyChat = (props: ChattingMessageProps) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
      <TimeStamp timeStamp={props.timeStamp} />
      <StyledChatContainer {...props}>{props.children}</StyledChatContainer>
    </View>
  );
};

// 상대방 채팅 메시지 컴포넌트
/**
 * 상대방의 채팅 메시지를 표시하는 컴포넌트입니다. 메시지 옆에 타임스탬프가 표시됩니다.
 *
 * @component
 * @example
 * <PartnerChat
 *   timeStamp="2023-03-17T12:00:00Z"
 *   minHeight={20}
 *   minWidth={100}
 *   maxWidth={200}
 *   backgroundColor={Color.GREEN200}
 * >
 *   <Text>반갑습니다!</Text>
 * </PartnerChat>
 *
 * @param {ChattingMessageProps} props - 컴포넌트에 전달되는 props 객체입니다.
 */

export const PartnerChat = (props: ChattingMessageProps) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
      <StyledChatContainer {...props}>{props.children}</StyledChatContainer>
      <TimeStamp timeStamp={props.timeStamp} />
    </View>
  );
};

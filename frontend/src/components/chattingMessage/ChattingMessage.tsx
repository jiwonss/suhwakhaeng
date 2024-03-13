import styled from 'styled-components/native';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import * as Color from '../../config/color/Color';
import React from 'react';
import { View } from 'react-native';

interface ChattingMessageProps {
  minHeight?: number;
  minWidth?: number;
  children: React.ReactNode;
  backgroundColor?: string;
  timeStamp: Date | string;
}

interface TimeStampProps {
  timeStamp: Date | string;
}

const TimeStamp: React.FC<TimeStampProps> = ({ timeStamp }) => {
  const formatTime = (time: Date | string) => {
    const date = typeof time === 'string' ? new Date(time) : time;
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  return <TimeStampText>{formatTime(timeStamp)}</TimeStampText>;
};

export const MyChat = (props: ChattingMessageProps) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
      <TimeStamp timeStamp={props.timeStamp} />
      <StyledChatContainer {...props}>{props.children}</StyledChatContainer>
    </View>
  );
};
export const PartnerChat = (props: ChattingMessageProps) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
      <StyledChatContainer {...props}>{props.children}</StyledChatContainer>
      <TimeStamp timeStamp={props.timeStamp} />
    </View>
  );
};
const StyledChatContainer = styled.View<{
  minHeight?: number;
  minWidth?: number;
  backgroundColor?: string;
}>`
  min-height: ${(props) => props.minHeight || heightPercent * 15}px;
  min-width: ${(props) => props.minWidth || widthPercent * 25}px;
  max-width: ${(props) => props.minWidth || widthPercent * 150}px;
  background-color: ${(props) => props.backgroundColor || Color.GREEN400};
  border-radius: 10px;
  padding: 5px 10px;
  margin: 5px 7px;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
`;

const TimeStampText = styled.Text`
  font-size: 12px;
  color: ${Color.ONYX};
  justify-content: flex-end;
  margin-bottom: 5px;
`;

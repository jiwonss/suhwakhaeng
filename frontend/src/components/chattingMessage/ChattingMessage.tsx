import styled from 'styled-components/native';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import * as Color from '../../config/color/Color';
import React from 'react';
import { View } from 'react-native';

interface ChattingMessageProps {
  width?: number;
  height?: number;
  children: React.ReactNode;
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
    <View style={{ display: 'flex', flexDirection: 'row' }}>
      <StyledChatContainer {...props}>{props.children}</StyledChatContainer>;
      <TimeStamp timeStamp={props.timeStamp} />
    </View>
  );
};

const StyledChatContainer = styled.View<{
  height?: number;
  width?: number;
}>`
  height: ${(props) => props.height || heightPercent * 15}px;
  width: ${(props) => props.width || widthPercent * 130}px;
  background-color: ${Color.GREEN400};
  border-radius: 10px;
  margin: 5px 5px;
  align-items: center;
  justify-content: left;
`;

const TimeStampText = styled.Text`
  font-size: 12px;
  color: ${Color.ONYX};
  margin-left: 5px;
  margin-right: 5px;
`;

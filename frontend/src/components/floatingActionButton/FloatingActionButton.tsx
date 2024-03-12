import React from 'react';
import { View } from 'react-native';
import ActionButton from 'react-native-action-button';
import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';

interface FloatingActionButtonProps {
  data: Array<{ title: string; event: () => void; color: string }>;
}

const FloatingActionButton = (props: FloatingActionButtonProps) => {
  return (
    <ActionButton buttonColor={Color.GREEN500}>
      {props.data.map((item) => (
        <ActionButton.Item key={item.title} buttonColor={item.color} width={widthPercent * 100} height={heightPercent * 40} onPress={item.event}>
          <Typo.BODY3_M color={Color.WHITE}>{item.title}</Typo.BODY3_M>
        </ActionButton.Item>
      ))}
    </ActionButton>
  );
};

export default FloatingActionButton;

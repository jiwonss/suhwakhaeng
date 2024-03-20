import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import * as Color from '../../config/color/Color';
import * as Typo from '../typography/Typography';
import styled from 'styled-components/native';
import { BasicButton } from '../button/Buttons';
import Plus from '../../../assets/icons/plus.svg';
import { Spacer } from '../basic/Spacer';

type PlantAddProps = {
  onPress: () => void;
  width?: number;
  height?: number;
  svgWidth?: number;
  svgHeight?: number;
  backgroundColor: string;
  borderColor: string;
  children?: React.ReactNode;
  name?: string;
  location?: string;
};

const RowView = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const PlantAdd = () => {
  return (
    <TouchableOpacity>
      <RowView>
        <BasicButton
          onPress={() => console.log('Button pressed')}
          width={24}
          height={24}
          disabled={false}
          backgroundColor={Color.GRAY200}
          borderRadius={50}
          borderColor={Color.GRAY200}
        >
          <Plus />
        </BasicButton>
        <Spacer space={14} />
        <Typo.BODY4_M color={Color.GRAY200}>작물 추가</Typo.BODY4_M>
      </RowView>
    </TouchableOpacity>
  );
};

export const PlantItem = (props: PlantAddProps) => {
  return (
    <TouchableOpacity>
      <RowView>
        <BasicButton
          onPress={() => console.log('Button pressed')}
          width={props.width}
          height={props.height}
          disabled={false}
          backgroundColor={Color.GRAY200}
          borderRadius={50}
          borderColor={Color.GRAY200}
        >
          {/*작물 이모지*/}
          <View style={{ width: props.svgWidth, height: props.svgHeight }}>{props.children}</View>
        </BasicButton>
      </RowView>
    </TouchableOpacity>
  );
};

import React from 'react';
import { TouchableOpacity } from 'react-native';
import * as Color from '../../config/color/Color';
import * as Typo from '../typography/Typography';
import styled from 'styled-components/native';
import { BasicButton } from '../button/Buttons';
import Plus from '../../../assets/icons/plus.svg';

type PlantAddProps = {
  onPress: () => void;
  width?: number;
  height?: number;
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
const Margin14 = styled.View`
  margin-right: 14px;
`;

const Margin10 = styled.View`
  margin-right: 14px;
`;
export const PlantAdd = (props: PlantAddProps) => {
  return (
    <TouchableOpacity>
      <RowView>
        <BasicButton
          onPress={() => console.log('Button pressed')}
          width={props.width || 24}
          height={props.height || 24}
          disabled={false}
          backgroundColor={props.backgroundColor || Color.GRAY200}
          borderRadius={50}
          borderColor={props.borderColor || Color.GRAY200}
        >
          <Plus />
        </BasicButton>
        <Margin14 />
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
          width={24}
          height={24}
          disabled={false}
          backgroundColor={Color.GRAY200}
          borderRadius={50}
          borderColor={Color.GRAY200}
        >
          {/*작물 이모지*/}
          {props.children}
        </BasicButton>
        <Margin14 />
        <Typo.BODY4_M color={Color.BLACK}>감자</Typo.BODY4_M>
        <Margin10 />
        <Typo.Detail1_M color={Color.GRAY200}>작물 추가</Typo.Detail1_M>
      </RowView>
    </TouchableOpacity>
  );
};

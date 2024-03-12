import React, { useState } from 'react';
import { DimensionValue, TouchableOpacity, View } from 'react-native';
import * as Color from '../../config/color/Color';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import styled from 'styled-components/native';
import LikeActive from '../../../assets/icons/likeActive.svg';
import LikeDefault from '../../../assets/icons/likeDefault.svg';
import Send from '../../../assets/icons/send.svg';

type BasicButtonProps = {
  onPress: () => void;
  width?: DimensionValue;
  height?: number;
  disabled?: boolean;
  backgroundColor?: string;
  borderColor: string;
  borderRadius: number;
  children: React.ReactNode;
};

export const BasicButton = (props: BasicButtonProps) => {
  return (
    <View style={{
      width: props.width || '50%', paddingHorizontal: widthPercent * 4,
    }}>
      <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
        <StyledView backgroundColor={props.backgroundColor || Color.GREEN500} borderColor={props.borderColor}
                    borderRadius={props.borderRadius} height={props.height}>
          {props.children}
        </StyledView>
      </TouchableOpacity>
    </View>
  );
};

const StyledView = styled.View<{ backgroundColor: string; borderColor: string; borderRadius: number; height?: number }>`
    background-color: ${(props) => props.backgroundColor};
    border-radius: ${(props) => props.borderRadius}px;
    border-width: ${widthPercent * 0.5};
    border-color: ${(props) => props.borderColor};
    padding-top: ${heightPercent * 2};
    padding-bottom: ${heightPercent * 2};
    height: ${(props) => props.height || 45}px;
    align-items: center;
    justify-content: center;
`;

//////////////////////////////////////////////////

type LikeButtonProps = {
  onPress: () => void;
  width?: DimensionValue;
  height?: DimensionValue;
  disabled?: boolean;
};

export const LikeButton = (props: LikeButtonProps) => {
  const [disabled, setDisabled] = useState(false);
  const toggleDisabled = () => {
    setDisabled(!disabled);
  };
  return (
    <StyledContainer width={props.width || 45} height={props.height || 45}>
      <TouchableOpacity onPress={toggleDisabled} disabled={props.disabled}>
        {disabled ? <LikeActive /> : <LikeDefault />}
      </TouchableOpacity>
    </StyledContainer>
  );
};

export const SendButton = (props: LikeButtonProps) => {
  return (
    <StyledContainer width={36} height={36}>
      <TouchableOpacity onPress={props.onPress}>
        <Send />
      </TouchableOpacity>
    </StyledContainer>
  );
};

const StyledContainer = styled.View<{ width: DimensionValue; height: DimensionValue }>`
    width: ${(props) => (typeof props.width === 'number' ? props.width * widthPercent : 50 * widthPercent)}px;
    height: ${(props) => (typeof props.height === 'number' ? props.height * widthPercent : 50 * widthPercent)}px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

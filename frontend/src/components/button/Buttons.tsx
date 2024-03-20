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
  width: number;
  height: number;
  disabled?: boolean;
  backgroundColor?: string;
  borderColor: string;
  borderRadius: number;
  children: React.ReactNode;
};

const StyledView = styled.View<{
  backgroundColor: string;
  borderColor: string;
  borderRadius: number;
  height: number;
  width?: number;
}>`
  background-color: ${(props) => props.backgroundColor};
  border-radius: ${(props) => props.borderRadius * widthPercent}px;
  border-width: ${widthPercent * 0.5}px;
  border-color: ${(props) => props.borderColor};
  padding-top: ${heightPercent * 2}px;
  padding-bottom: ${heightPercent * 2}px;
  height: ${(props) => (props.height ? `${props.height}` : 45)}px;
  width: ${(props) => (props.width ? `${props.width}px` : '100%')};
  align-items: center;
  justify-content: center;
`;

const StyledContainer = styled.View<{ width: DimensionValue; height: DimensionValue }>`
  width: ${(props) => (typeof props.width === 'number' ? props.width * widthPercent : 50 * widthPercent)}px;
  height: ${(props) => (typeof props.height === 'number' ? props.height * widthPercent : 50 * widthPercent)}px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;
// 기본 버튼 컴포넌트
/**
 * 사용자 정의 스타일과 동작을 적용할 수 있는 기본 버튼 컴포넌트입니다.
 *
 * @component
 * @example
 * <BasicButton
 *   onPress={() => console.log('Button pressed')}
 *   width={100}
 *   height={50}
 *   disabled={false}
 *   backgroundColor={Color.BLUE500}
 *   borderColor={Color.GRAY500}
 *   borderRadius={10}
 * >
 *   <Text>Press Me</Text>
 * </BasicButton>
 *
 * @param {Object} props - 컴포넌트에 전달되는 props 객체입니다.
 * @param {() => void} props.onPress - 버튼을 눌렀을 때 실행될 콜백 함수입니다.
 * @param {DimensionValue} [props.width='50%'] - 버튼의 너비입니다. 기본값은 '50%'입니다.
 * @param {number} [props.height=45] - 버튼의 높이입니다. 기본값은 45입니다.
 * @param {boolean} [props.disabled=false] - 버튼의 활성/비활성 상태입니다. 기본값은 false입니다.
 * @param {string} [props.backgroundColor=Color.GREEN500] - 버튼의 배경 색상입니다.
 * @param {string} props.borderColor - 버튼의 테두리 색상입니다.
 * @param {number} props.borderRadius - 버튼의 테두리 반경입니다.
 * @param {React.ReactNode} props.children - 버튼 내부에 표시될 컨텐츠입니다.
 *
 * @author 오민상
 */
export const BasicButton = (props: BasicButtonProps) => {
  return (
    <View>
      <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
        <StyledView
          backgroundColor={props.backgroundColor || Color.GREEN500}
          borderColor={props.borderColor}
          borderRadius={props.borderRadius}
          height={props.height}
          width={props.width}
        >
          {props.children}
        </StyledView>
      </TouchableOpacity>
    </View>
  );
};

type LikeButtonProps = {
  onPress: () => void;
  width?: DimensionValue;
  height?: number;
  disabled?: boolean;
};

// 좋아요 버튼 컴포넌트
/**
 * `LikeButton` 컴포넌트는 사용자가 좋아요를 토글할 수 있는 UI를 제공합니다.
 * 좋아요 상태에 따라 다른 아이콘을 표시합니다.
 *
 * @component
 * @example
 * <LikeButton
 *   onPress={() => console.log('Like button pressed')}
 *   width={45}
 *   height={45}
 *   disabled={false}
 * />
 *
 * @param {Object} props - 컴포넌트에 전달되는 props 객체입니다.
 * @param {() => void} props.onPress - 버튼을 눌렀을 때 실행될 콜백 함수입니다.
 * @param {DimensionValue} [props.width=45] - 버튼의 너비입니다. 기본값은 45입니다.
 * @param {number} [props.height=45] - 버튼의 높이입니다. 기본값은 45입니다.
 * @param {boolean} [props.disabled=false] - 버튼의 활성/비활성 상태입니다. 기본값은 false입니다.
 *
 * @author 오민상
 */
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

// 메시지 보내기 버튼 컴포넌트
/**
 * `SendButton` 컴포넌트는 메시지를 보내는 동작을 수행할 수 있는 버튼 UI를 제공합니다.
 *
 * @component
 * @example
 * <SendButton
 *   onPress={() => console.log('Send button pressed')}
 *   width={36}
 *   height={36}
 *   disabled={false}
 * />
 *
 * @param {Object} props - 컴포넌트에 전달되는 props 객체입니다.
 * @param {() => void} props.onPress - 버튼을 눌렀을 때 실행될 콜백 함수입니다.
 * @param {DimensionValue} [props.width=36] - 버튼의 너비입니다. 기본값은 36입니다.
 * @param {number} [props.height=36] - 버튼의 높이입니다. 기본값은 36입니다.
 * @param {boolean} [props.disabled=false] - 버튼의 활성/비활성 상태입니다. 기본값은 false입니다.
 *
 * @author 오민상
 */
export const SendButton = (props: LikeButtonProps) => {
  return (
    <StyledContainer width={36} height={36}>
      <TouchableOpacity onPress={props.onPress}>
        <Send />
      </TouchableOpacity>
    </StyledContainer>
  );
};

import styled from 'styled-components/native';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import * as Color from '../../config/color/Color';
import React from 'react';

interface ClassificationTagProps {
  width?: number;
  height?: number;
  borderRadius?: number;
  backgroundColor?: string;
  children: React.ReactNode;
}

// Classification Basic Tag
/**
 * 기본 태그 컴포넌트입니다.
 *
 * @component
 * @example
 * <BasicTag backgroundColor={Color.GREEN600}>
 *   <Typo.Detail1_M color={Color.WHITE}>기본</Typo.Detail1_M>
 * </BasicTag>
 *
 * @param {Object} props - 컴포넌트에 전달되는 props 객체입니다.
 * @param {number} [props.width=30] - 입력 필드의 너비를 지정합니다. 기본값은 30입니다.
 * @param {number} [props.height=15] - 입력 필드의 높이를 지정합니다. 기본값은 15입니다.
 * @param {number} [props.borderRadius=10] - 버튼의 테두리 반경입니다. 기본값은 10입니다.
 * @param {string} [props.backgroundColor=Color.GREEN400] - 버튼의 배경색을 지정합니다. 기본값은 Color.GREEN400입니다.
 * @param {React.ReactNode} props.children - 버튼 내부에 표시될 컨텐츠입니다.
 *
 * @author 오민상
 */
export const BasicTag = (props: ClassificationTagProps) => {
  return <StyledBasicTag {...props}>{props.children}</StyledBasicTag>;
};
const StyledBasicTag = styled.View<{
  height?: number;
  width?: number;
  borderRadius?: number;
  backgroundColor?: string;
}>`
  height: ${(props) => props.height || heightPercent * 15}px;
  width: ${(props) => props.width || widthPercent * 30}px;
  background-color: ${(props) => props.backgroundColor || Color.GREEN400};
  border-radius: ${({ borderRadius }) => (borderRadius ? `${borderRadius}px` : '10px')};
  margin: 5px 5px;
  align-items: center;
  justify-content: center;
`;

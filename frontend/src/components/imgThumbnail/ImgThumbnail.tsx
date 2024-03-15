import styled from 'styled-components/native';
import React from 'react';
import * as Color from '../../config/color/Color';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';

// 타입 정의
interface ContainerProps {
  width: number;
  height: number;
}

// 스타일드 컴포넌트 정의
const StyledView = styled.View<ContainerProps>`
  width: ${({ width }) => `${widthPercent * width}px`}; /* 이미지 컨테이너의 너비 */
  height: ${({ height }) => `${heightPercent * height}px`}; /* 이미지 컨테이너의 높이 */
  border: 1px solid ${Color.GRAY400};
  border-radius: ${widthPercent * 10}px;
  overflow: hidden; /* borderRadius를 적용하기 위해 overflow를 hidden으로 설정 */
`;

const StyledImage = styled.Image`
  flex: 1;
  width: 100%; /* 이미지의 너비 */
  height: 100%; /* 이미지의 높이 */
`;

// 컴포넌트 정의
interface ProfileImageProps {
  url?: string;
  width: number;
  height: number;
}

const ImgThumbnail: React.FC<ProfileImageProps> = ({ url, width, height }) => {
  const defaultImage = require('../../../assets/imgs/favicon.png'); // 나중에 바꾸기
  return (
    <StyledView width={width} height={height}>
      <StyledImage source={url ? { uri: url } : defaultImage} resizeMode='cover' />
    </StyledView>
  );
};

export default ImgThumbnail;

import styled from 'styled-components/native';
import React from 'react';
import { LocalImageLoader, UriImageLoader } from '../image/ImageLoader';

// 타입 정의
interface ContainerProps {
  width: number;
  height: number;
}

// 스타일드 컴포넌트 정의
const StyledView = styled.View<ContainerProps>`
  width: ${({ width }) => `${width}px`}; /* 이미지 컨테이너의 너비 */
  height: ${({ height }) => `${height}px`}; /* 이미지 컨테이너의 높이 */
  border-radius: ${({ width }) => `${width / 2}px`}; /* 원형 모양의 프로필 이미지를 위한 모양 설정 */
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

const ProfileImage: React.FC<ProfileImageProps> = ({ url, width, height }) => {
  const defaultImage = require('../../../assets/imgs/thumnail.png'); // 나중에 바꾸기

  return (
    <StyledView width={width} height={height}>
      {url ? <UriImageLoader uri={url} style={{ width: '100%', height: '100%' }} resizeMode='cover' /> : <LocalImageLoader source={defaultImage} />}
    </StyledView>
  );
};

export default ProfileImage;

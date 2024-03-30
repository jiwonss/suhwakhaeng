// import React from 'react';
// import styled from 'styled-components/native';
// import homeDefault from '../../../assets/icons/homeDefault.svg';

// interface IconProps {
//   width?: number | '100%';
//   height?: number | '100%';
//   src?: string;
// }

// const IconContainer = styled.View<IconProps>`
//   width: ${(props) => (props.width ? props.width : 'auto')};
//   height: ${(props) => (props.height ? props.height : 'auto')};
//   position: relative;
// `;

// const StyledIcon = styled.Image`
//   position: absolute;
//   top: 45%;
//   left: 50%;
//   /* transform: translate((-50%, -50%)); */
// `;

// const Icon = (props: IconProps) => {
//   return (
//     <IconContainer {...props}>
//       {/* <StyledIcon src={props.src} /> */}
//       <StyledIcon source={homeDefault} />
//     </IconContainer>
//   );
// };

// export default Icon;
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

type IconProps = {
  name: any;
  size: number;
  iconColor?: string;
};

/**
 * - Icon의 기본은 vector icons의 Feater로 사용됩니다.
 * - 더 필요한 사항이 생긴다면 이후에 다른 컴포넌트로 빼게될 것입니다.
 * @param props
 * @returns
 * @author 김수린
 */
export const Icon = (props: IconProps) => {
  return <Ionicons name={props.name} size={props.size} style={{ color: props.iconColor }} />;
};

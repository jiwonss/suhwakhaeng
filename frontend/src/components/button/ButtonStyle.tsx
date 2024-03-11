import styled from 'styled-components/native';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { TouchableOpacity } from 'react-native';

export const LikeButtonStyle = styled.View`
  width: ${widthPercent * 46}px;
  height: ${heightPercent * 46}px;
`;

export const SubmitButtonStyle = styled(TouchableOpacity)`
    align-items: center;
    justify-content: center;
    width: ${widthPercent * 36}px;
    height: ${heightPercent * 36}px;

`;

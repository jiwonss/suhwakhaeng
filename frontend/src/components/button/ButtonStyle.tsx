import styled from 'styled-components/native';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { TouchableOpacity } from 'react-native';
import { GREEN500 } from '../../config/color/Color';

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
export const ShopButtonStyle = styled(TouchableOpacity)`
    align-items: center;
    justify-content: center;
    width: ${widthPercent * 100}px;
    height: ${heightPercent * 40}px;
    background-color: ${GREEN500};
    border-radius: 10px;
`;

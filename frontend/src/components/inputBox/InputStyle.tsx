import styled from 'styled-components/native';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import * as Color from '../../config/color/Color';
// single line InputBox
export const SingleInputStyle = styled.TextInput`
    height: ${heightPercent * 36}px;
    width: ${widthPercent * 300}px;
    border-radius: 10px;
    border-width: 0.8px;
    border-color: ${Color.GRAY300};
`;

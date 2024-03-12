import styled from 'styled-components/native';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import * as Color from '../../config/color/Color';
import * as Font from '../../config/fontStyle/fontStyle';

// single line InputBox
export const SingleInputStyle = styled.TextInput`
    height: ${heightPercent * 36}px;
    width: ${widthPercent * 300}px;
    border-radius: 10px;
    border-width: 0.8px;
    border-color: ${Color.GRAY300};
    padding-left: 7px;
`;


// Multi line InputBox
export const MultiInputStyle = styled.TextInput`
    height: ${heightPercent * 136}px;
    width: ${widthPercent * 300}px;
    border-radius: 10px;
    border-width: 0.8px;
    border-color: ${Color.GRAY300};;
    textAlignVertical: top;
    padding: 7px;
`;
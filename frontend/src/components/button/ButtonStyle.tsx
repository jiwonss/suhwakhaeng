import styled from 'styled-components/native';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { TouchableOpacity } from 'react-native';
import * as Color from '../../config/color/Color';

// 좋아요 버튼 스타일
export const LikeButtonStyle = styled.View`
    width: ${widthPercent * 46}px;
    height: ${heightPercent * 46}px;
`;
// 매시지 보내기 버튼 스타일
export const SendButtonStyle = styled(TouchableOpacity)`
    align-items: center;
    justify-content: center;
    width: ${widthPercent * 36}px;
    height: ${heightPercent * 36}px;
`;

// 장터 이동하기 버튼 스타일
export const ShopButtonStyle = styled(TouchableOpacity)`
    align-items: center;
    justify-content: center;
    width: ${widthPercent * 100}px;
    height: ${heightPercent * 40}px;
    background-color: ${Color.GREEN500};
    border-radius: 10px;
`;

// 프로필 수정 버튼 스타일
export const ProfileSettingButtonStyle = styled(TouchableOpacity)`
    align-items: center;
    justify-content: center;
    width: ${widthPercent * 150}px;
    height: ${heightPercent * 30}px;
    border-radius: 10px;
    border: 0.4px solid ${Color.GRAY400};
`;

// 작성 완료 버튼 스타일
export const SubmitButtonStyle = styled(TouchableOpacity)`
    align-items: center;
    justify-content: center;
    width: ${widthPercent * 300}px;
    height: ${heightPercent * 45}px;
    background-color: ${Color.GREEN500};
    border-radius: 10px;
`;
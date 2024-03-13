import styled from 'styled-components/native';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import * as Color from '../../config/color/Color';

interface ClassificationTagProps {
  onPress: () => void;
  disabled?: boolean;
  width?: number;
  height?: number;
  backgroundColor?: string;
  borderRadius: number;
  children: React.ReactNode;
}

// Classification Basic Tag
/**
 * 분류 필터링에 사용 될 수 있는 기본 태그 컴포넌트입니다.
 *
 * @component
 * @example
 // * <SingleLineInputBox
 // *   placeholder="여기에 입력하세요"
 // *   onChangeText={(text) => console.log(text)}
 // *   width={200}
 // *   height={40}
 // * />
 // *
 // * @param {Object} props - 컴포넌트에 전달되는 props 객체입니다.
 // * @param {string} props.placeholder - 입력 필드에 표시될 플레이스홀더 텍스트입니다.
 // * @param {(text: string) => void} [props.onChangeText] - 텍스트 입력 값이 변경될 때마다 실행될 콜백 함수입니다.
 // *    입력된 텍스트 값(text: string)을 인자로 받으며 선택적입니다.
 // * @param {number} [props.width=300] - 입력 필드의 너비를 지정합니다. 기본값은 300입니다.
 // * @param {number} [props.height=36] - 입력 필드의 높이를 지정합니다. 기본값은 36입니다.
 *
 * @author 오민상
 */
export const BasicTag = (props: ClassificationTagProps) => {
  return <StyledBasicTag {...props} />;
};
const StyledBasicTag = styled.View<{
  height?: number;
  width?: number;
  backgroundColor?: string;
}>`
  height: ${(props) => props.height || heightPercent * 15}px;
  width: ${(props) => props.width || widthPercent * 30}px;
  background-color: ${(props) => props.backgroundColor || Color.GREEN200};
  border-radius: 10px;
  margin: 5px 5px;
`;

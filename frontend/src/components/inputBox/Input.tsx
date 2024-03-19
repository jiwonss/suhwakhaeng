import styled from 'styled-components/native';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import * as Color from '../../config/color/Color';

interface InputBoxProps {
  placeholder: string;
  onChangeText?: (text: string) => void;
  multiline?: boolean;
  width?: number;
  height?: number;
}

const StyledSingleContainer = styled.TextInput<{
  height?: number;
  width?: number;
}>`
  height: ${(props) => props.height || heightPercent * 36}px;
  width: ${(props) => props.width || widthPercent * 300}px;
  border-radius: 10px;
  border-width: 0.8px;
  border-color: ${Color.GRAY300};
  padding-left: 10px;
  margin: 10px 5px 10px 5px;
`;

const StyledMultiContainer = styled.TextInput<{
  height?: number;
  width?: number;
}>`
  height: ${(props) => props.height || heightPercent * 136}px;
  width: ${(props) => props.width || widthPercent * 300}px;
  border-radius: 10px;
  border-width: 0.8px;
  border-color: ${Color.GRAY300};
  padding: 10px;
  margin: 10px 5px 10px 5px;
`;

// single line InputBox
/**
 * 단일 줄 텍스트 입력을 위한 컴포넌트입니다.
 *
 * @component
 * @example
 * <SingleLineInputBox
 *   placeholder="여기에 입력하세요"
 *   onChangeText={(text) => console.log(text)}
 *   width={200}
 *   height={40}
 * />
 *
 * @param {Object} props - 컴포넌트에 전달되는 props 객체입니다.
 * @param {string} props.placeholder - 입력 필드에 표시될 플레이스홀더 텍스트입니다.
 * @param {(text: string) => void} [props.onChangeText] - 텍스트 입력 값이 변경될 때마다 실행될 콜백 함수입니다.
 *    입력된 텍스트 값(text: string)을 인자로 받으며 선택적입니다.
 * @param {number} [props.width=300] - 입력 필드의 너비를 지정합니다. 기본값은 300입니다.
 * @param {number} [props.height=36] - 입력 필드의 높이를 지정합니다. 기본값은 36입니다.
 *
 * @author 오민상
 */
export const SingleLineInputBox = (props: InputBoxProps) => {
  return <StyledSingleContainer {...props} multiline={false} />;
};

// Multi line InputBox
/**
 * 여러 줄 텍스트 입력을 위한 컴포넌트입니다
 *
 * @component
 * @example
 * <MultiLineInputBox
 *   placeholder="여기에 입력하세요"
 *   onChangeText={(text) => console.log(text)}
 *   width={300}
 *   height={100}
 * />
 *
 * @param {Object} props - 컴포넌트에 전달되는 props 객체입니다.
 * @param {string} props.placeholder - 입력 필드에 표시될 플레이스홀더 텍스트입니다.
 * @param {(text: string) => void} [props.onChangeText] - 텍스트 입력 값이 변경될 때마다 실행될 콜백 함수입니다.
 *    입력된 텍스트 값(text: string)을 인자로 받습니다. 이 파라미터는 선택적입니다.
 * @param {number} [props.width=300] - 입력 필드의 너비를 지정합니다. 기본값은 300입니다.
 * @param {number} [props.height=136] - 입력 필드의 높이를 지정합니다. 기본값은 136입니다.
 *
 * @author 오민상
 */
export const MultiLineInputBox = (props: InputBoxProps) => {
  return <StyledMultiContainer {...props} multiline={true} textAlignVertical='top' />;
};

import styled from 'styled-components/native';
import { TextInput, TextInputProps } from 'react-native';

import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import * as Color from '../../config/color/Color';
import SearchGray from '../../../assets/icons/search_gray.svg';
import React from 'react';

interface InputBoxProps {
  placeholder: string;
  onChangeText?: (text: string) => void;
  multiline?: boolean;
  width?: number;
  height?: number;
  children?: React.ReactNode;
  value?: string;
  keyboardType?: TextInputProps['keyboardType'];
  refInput?: React.LegacyRef<TextInput>;
  onBlur?: () => void;
}
interface SearchInputProps {
  title?: string;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  onSubmitSearch?: () => void;
  onPressSearch?: () => void;
  onPressMore?: () => void;
  onPressChat?: () => void;
  placeHolder: string;
}

const StyledSingleContainer = styled.TextInput.attrs({
  placeholderTextColor: `${Color.GRAY400}`,
})<{ height?: number; width?: number }>`
  height: ${(props) => props.height || heightPercent * 36}px;
  width: ${(props) => (props.width ? `${props.width * widthPercent}px` : '100%')};
  border-radius: 10px;
  border-width: 0.8px;
  border-color: ${Color.GRAY300};
  padding: ${widthPercent * 10}px;
  margin: ${heightPercent * 10}px 0px;
  font-family: 'GmarketSansTTFMedium';
  font-size: ${widthPercent * 12}px;
`;

const StyledMultiContainer = styled.TextInput.attrs({
  placeholderTextColor: `${Color.GRAY400}`,
})<{ height?: number; width?: number }>`
  height: ${(props) => props.height || heightPercent * 136}px;
  width: ${(props) => (props.width ? props.width * widthPercent : '100%')};
  border-radius: 10px;
  border-width: 0.8px;
  border-color: ${Color.GRAY300};
  padding: ${widthPercent * 10}px;
  margin: ${heightPercent * 10}px ${widthPercent * 5}px;
  font-family: 'GmarketSansTTFMedium';
  font-size: ${widthPercent * 12}px;
`;

const InputContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${Color.GRAY300};
  border-radius: 10px;
  width: ${widthPercent * 300}px;
  height: ${heightPercent * 36}px;
  padding: ${widthPercent * 8}px;
`;
const StyledInput = styled.TextInput`
  margin-left: ${widthPercent * 4}px;
  font-family: 'GmarketSansTTFMedium';
  font-size: ${widthPercent * 12}px;
  width: 100%;
  height: 100%;
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
  return (
    <StyledSingleContainer ref={props.refInput} {...props} multiline={false} value={props.value} onBlur={props.onBlur}>
      {props.children}
    </StyledSingleContainer>
  );
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
  return (
    <StyledMultiContainer {...props} multiline={true} textAlignVertical='top' value={props.value}>
      {props.children}
    </StyledMultiContainer>
  );
};

// Search Input Box
/**
 * 검색할 때 사용 할 수 있는 인풋 박스입니다.
 *
 * @component
 * @example
 * <SearchInputBox
 *   value={searchValue}
 *   setValue={setSearchValue}
 *   onSubmitSearch={onSubmit}
 *   placeHolder={'작물 이름을 입력해주세요'}
 * />
 *
 * @author 오민상
 */
export const SearchInputBox = (props: SearchInputProps) => {
  const handleChangeText = (text: string) => {
    if (props.setValue) {
      props.setValue(text);
    }
  };

  return (
    <InputContainer>
      <SearchGray width={widthPercent * 20} height={heightPercent * 20} />
      <StyledInput value={props.value} onChangeText={handleChangeText} onSubmitEditing={props.onSubmitSearch} placeholder={props.placeHolder} returnKeyType='done' />
    </InputContainer>
  );
};

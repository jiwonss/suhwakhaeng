import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import styled from 'styled-components/native';
import Back from '../../../assets/icons/back_black.svg';
import More from '../../../assets/icons/more_black.svg';
import Message from '../../../assets/icons/message_black.svg';
import Exit from '../../../assets/icons/exit_black.svg';
import Search from '../../../assets/icons/search_black.svg';
import SearchGray from '../../../assets/icons/search_gray.svg';

import { useNavigation } from '@react-navigation/native';
import React from 'react';

interface HeaderProps {
  type: 'default' | 'leftTitle' | 'search';
  title?: string;
  firstIcon?: string; // 왼쪽 아이콘 이름
  secondIcon?: string; // 오른쪽 첫번째 아이콘 이름
  thirdIcon?: string; // 오른쪽 두번째 아이콘 이름
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  onSubmitSearch?: () => void;
  onPressSearch?: () => void;
  onPressMore?: () => void;
  onPressChat?: () => void;
}

/********* styled component 영역 ************/
const StyledContainer = styled.View`
  height: ${heightPercent * 63}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${widthPercent * 12}px;
`;

const TitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const LeftIconContainer = styled.View`
  width: ${widthPercent * 60}px;
`;

const RightIconContainer = styled.View`
  width: ${widthPercent * 60}px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  column-gap: ${widthPercent * 8}px;
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

const Header = (props: HeaderProps) => {
  const navigation = useNavigation();

  const firstIconSelector = (iconName: string) => {
    if (iconName === 'exit') {
      return <Exit onPress={() => navigation.goBack()} width={widthPercent * 24} height={heightPercent * 24} />;
    } else if (iconName === 'back') {
      return <Back onPress={() => navigation.goBack()} width={widthPercent * 24} height={heightPercent * 24} />;
    }
  };

  const secondIconSelecor = (iconName: string) => {
    if (iconName === 'search') {
      return <Search onPress={props.onPressSearch} width={widthPercent * 24} height={heightPercent * 24} />;
    } else if (iconName === 'more') {
      return <More onPress={props.onPressMore} width={widthPercent * 24} height={heightPercent * 24} />;
    }
  };

  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressSearch = () => {
    props.onPressSearch;
  };

  return (
    <StyledContainer>
      {props.type === 'leftTitle' ? (
        <>
          <Typo.BODY1_B color={Color.GREEN600}>수확행</Typo.BODY1_B>
          <Search onPress={onPressSearch} width={widthPercent * 24} height={heightPercent * 24} />
        </>
      ) : props.type === 'search' ? (
        <>
          <Back onPress={onPressBack} width={widthPercent * 24} height={heightPercent * 24} />
          <InputContainer>
            <SearchGray width={widthPercent * 20} height={heightPercent * 20} />
            <StyledInput value={props.value} onChangeText={props.setValue} placeholder='검색어를 입력하세요' onSubmitEditing={props.onSubmitSearch} returnKeyType='done' />
          </InputContainer>
        </>
      ) : (
        <>
          <LeftIconContainer>{props.firstIcon && firstIconSelector(props.firstIcon)}</LeftIconContainer>
          <TitleContainer>
            <Typo.BODY2_M>{props.title}</Typo.BODY2_M>
          </TitleContainer>
          <RightIconContainer>
            {props.secondIcon && secondIconSelecor(props.secondIcon)}
            {props.thirdIcon && <Message onPress={props.onPressChat} width={widthPercent * 24} height={heightPercent * 24} />}
          </RightIconContainer>
        </>
      )}
    </StyledContainer>
  );
};

export default Header;

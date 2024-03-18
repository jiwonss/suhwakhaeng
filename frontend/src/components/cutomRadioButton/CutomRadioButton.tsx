import styled from 'styled-components/native';
import React from 'react';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import { css } from 'styled-components';

// const [activeIndex, setActiveIndex] = useState(0);
// const Data = [
//   { content: '자유', event: () => setActiveIndex(0), active: activeIndex === 0},
//   { content: '꿀팁', event: () => setActiveIndex(1), active: activeIndex === 1},
//   { content: '농작', event: () => setActiveIndex(2), active: activeIndex === 2},
// ];

// <CustomRadioButton data = { Data }/>

type DataItem = {
  content: string;
  event: () => void;
  active: boolean;
};

interface CustomRadioButtonProps {
  data: DataItem[];
}

interface StyledButtonProps {
  active: boolean;
}

const StyledView = styled.View`
  flex-direction: row;
  width: 100%;
  height: ${heightPercent * 30}px;
  justify-content: space-around;
  align-items: center;
  column-gap: ${widthPercent * 7}px;
  padding-left: ${widthPercent * 7}px;
  padding-right: ${widthPercent * 7}px;
`;

const StyledButton = styled.TouchableOpacity<StyledButtonProps>`
  flex: 1;
  height: ${heightPercent * 30}px;
  border: 1px solid ${Color.GRAY400};
  border-radius: ${widthPercent * 10}px;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.active &&
    css`
      background-color: ${Color.GREEN400};
      border-color: ${Color.GREEN400};
    `}
`;

const CustomRadioButton = (props: CustomRadioButtonProps) => {
  return (
    <StyledView>
      {props.data.map(({ content, event, active }, index) => (
        <StyledButton key={index} active={active} onPress={event}>
          <Typo.BODY4_M color={active ? Color.WHITE : Color.BLACK}>{content}</Typo.BODY4_M>
        </StyledButton>
      ))}
    </StyledView>
  );
};

export default CustomRadioButton;

import styled from 'styled-components/native';
import { widthPercent, heightPercent } from '../../config/dimension/Dimension';
import { TouchableOpacity, View } from 'react-native';
import * as Typo from '../typography/Typography';
import * as Color from '../../config/color/Color';

interface MenuButtonProps {
  size: string;
  children: React.ReactNode;
  title: string;
  backgroundColor?: string;
  borderColor?: string;
  onPressButton: () => void;
}

const StyledContainer = styled.View<Pick<MenuButtonProps, 'size'>>`
  width: ${(props) => (props.size === 'small' ? widthPercent * 60 : widthPercent * 80)}px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: ${widthPercent * 4}px;
`;

const StyledButton = styled.View<Pick<MenuButtonProps, 'size'>>`
  border-radius: 10px;
  width: ${(props) => (props.size === 'small' ? widthPercent * 60 : widthPercent * 80)}px;
  height: ${(props) => (props.size === 'small' ? widthPercent * 60 : widthPercent * 80)}px;
  background-color: ${(props) => (props.size === 'small' ? Color.GRAY100 : Color.GREEN50)};
  border: ${(props) => (props.size === 'small' ? `1px solid ${Color.GRAY200}` : `1px solid ${Color.GREEN50}`)};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const MenuButton = (props: MenuButtonProps) => {
  return (
    <TouchableOpacity onPress={props.onPressButton}>
      <StyledContainer size={props.size}>
        <StyledButton size={props.size}>{props.children}</StyledButton>
        {props.size === 'small' ? <Typo.Detail1_M>{props.title}</Typo.Detail1_M> : <Typo.BODY4_M>{props.title}</Typo.BODY4_M>}
      </StyledContainer>
    </TouchableOpacity>
  );
};

export default MenuButton;

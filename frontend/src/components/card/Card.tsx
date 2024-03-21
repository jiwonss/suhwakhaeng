import styled from 'styled-components/native';
import * as Color from '../../config/color/Color';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';

interface CardProps {
  backgroundColor?: string;
  borderColor?: string;
  width?: number;
  height?: number;
  children: React.ReactNode;
}

const CardContainer = styled.View<CardProps>`
  width: ${(props) => (props.width ? props.width : 'auto')}px;
  height: ${(props) => (props.height ? props.height : 'auto')}px;
  min-height: ${heightPercent * 30}px;
  border: ${(props) => (props.borderColor ? `1px solid ${props.borderColor}` : 'none')};
  border-radius: 10px;
  padding-left: ${widthPercent * 12}px;
  padding-right: ${widthPercent * 12}px;
  padding-bottom: ${heightPercent * 5}px;
  padding-top: ${heightPercent * 5}px;
  display: flex;
  justify-content: center;
  background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : `${Color.WHITE}`)};
`;

export const Card = (props: CardProps) => {
  return <CardContainer {...props}>{props.children}</CardContainer>;
};

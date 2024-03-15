import styled from 'styled-components/native';
import * as FontStyle from '../../config/fontStyle/fontStyle';

interface TypographyProps {
  numberOfLines?: number;
  color?: string;
  children: React.ReactNode;
}

interface FontProps extends TypographyProps {
  fontFamily: string;
  fontSize: number;
}

const StyledTypography = styled.Text<FontProps>`
  font-family: ${(props) => props.fontFamily};
  font-size: ${(props) => `${props.fontSize}px`};
  color: ${(props) => (props.color ? props.color : 'black')};
`;

export const H1 = (props: TypographyProps) => {
  return (
    <StyledTypography numberOfLines={props.numberOfLines} ellipsizeMode='tail' fontFamily={FontStyle.F_PRIMARY_B} fontSize={FontStyle.F_SIZE_XXXL} color={props.color}>
      {props.children}
    </StyledTypography>
  );
};

export const H2 = (props: TypographyProps) => {
  return (
    <StyledTypography numberOfLines={props.numberOfLines} ellipsizeMode='tail' fontFamily={FontStyle.F_PRIMARY_B} fontSize={FontStyle.F_SIZE_XXL} color={props.color}>
      {props.children}
    </StyledTypography>
  );
};

export const H3 = (props: TypographyProps) => {
  return (
    <StyledTypography numberOfLines={props.numberOfLines} ellipsizeMode='tail' fontFamily={FontStyle.F_PRIMARY_B} fontSize={FontStyle.F_SIZE_XL} color={props.color}>
      {props.children}
    </StyledTypography>
  );
};

export const H4 = (props: TypographyProps) => {
  return (
    <StyledTypography numberOfLines={props.numberOfLines} ellipsizeMode='tail' fontFamily={FontStyle.F_PRIMARY_B} fontSize={FontStyle.F_SIZE_L} color={props.color}>
      {props.children}
    </StyledTypography>
  );
};

export const BODY0_B = (props: TypographyProps) => {
  return (
    <StyledTypography numberOfLines={props.numberOfLines} ellipsizeMode='tail' fontFamily={FontStyle.F_PRIMARY_B} fontSize={FontStyle.F_SIZE_XXL} color={props.color}>
      {props.children}
    </StyledTypography>
  );
};

export const BODY0_M = (props: TypographyProps) => {
  return (
    <StyledTypography numberOfLines={props.numberOfLines} ellipsizeMode='tail' fontFamily={FontStyle.F_PRIMARY_M} fontSize={FontStyle.F_SIZE_XXL} color={props.color}>
      {props.children}
    </StyledTypography>
  );
};

export const BODY1_B = (props: TypographyProps) => {
  return (
    <StyledTypography numberOfLines={props.numberOfLines} ellipsizeMode='tail' fontFamily={FontStyle.F_PRIMARY_B} fontSize={FontStyle.F_SIZE_M} color={props.color}>
      {props.children}
    </StyledTypography>
  );
};

export const BODY1_M = (props: TypographyProps) => {
  return (
    <StyledTypography numberOfLines={props.numberOfLines} ellipsizeMode='tail' fontFamily={FontStyle.F_PRIMARY_M} fontSize={FontStyle.F_SIZE_M} color={props.color}>
      {props.children}
    </StyledTypography>
  );
};

export const BODY2_B = (props: TypographyProps) => {
  return (
    <StyledTypography numberOfLines={props.numberOfLines} ellipsizeMode='tail' fontFamily={FontStyle.F_PRIMARY_B} fontSize={FontStyle.F_SIZE_S} color={props.color}>
      {props.children}
    </StyledTypography>
  );
};

export const BODY2_M = (props: TypographyProps) => {
  return (
    <StyledTypography numberOfLines={props.numberOfLines} ellipsizeMode='tail' fontFamily={FontStyle.F_PRIMARY_M} fontSize={FontStyle.F_SIZE_S} color={props.color}>
      {props.children}
    </StyledTypography>
  );
};

export const BODY3_B = (props: TypographyProps) => {
  return (
    <StyledTypography numberOfLines={props.numberOfLines} ellipsizeMode='tail' fontFamily={FontStyle.F_PRIMARY_B} fontSize={FontStyle.F_SIZE_XS} color={props.color}>
      {props.children}
    </StyledTypography>
  );
};

export const BODY3_M = (props: TypographyProps) => {
  return (
    <StyledTypography numberOfLines={props.numberOfLines} ellipsizeMode='tail' fontFamily={FontStyle.F_PRIMARY_M} fontSize={FontStyle.F_SIZE_XS} color={props.color}>
      {props.children}
    </StyledTypography>
  );
};

export const BODY4_B = (props: TypographyProps) => {
  return (
    <StyledTypography numberOfLines={props.numberOfLines} ellipsizeMode='tail' fontFamily={FontStyle.F_PRIMARY_B} fontSize={FontStyle.F_SIZE_XXS} color={props.color}>
      {props.children}
    </StyledTypography>
  );
};

export const BODY4_M = (props: TypographyProps) => {
  return (
    <StyledTypography numberOfLines={props.numberOfLines} ellipsizeMode='tail' fontFamily={FontStyle.F_PRIMARY_M} fontSize={FontStyle.F_SIZE_XXS} color={props.color}>
      {props.children}
    </StyledTypography>
  );
};

export const Detail0_M = (props: TypographyProps) => {
  return (
    <StyledTypography numberOfLines={props.numberOfLines} ellipsizeMode='tail' fontFamily={FontStyle.F_PRIMARY_B} fontSize={FontStyle.F_SIZE_XXXS} color={props.color}>
      {props.children}
    </StyledTypography>
  );
};

export const Detail1_M = (props: TypographyProps) => {
  return (
    <StyledTypography numberOfLines={props.numberOfLines} ellipsizeMode='tail' fontFamily={FontStyle.F_PRIMARY_M} fontSize={FontStyle.F_SIZE_XXXXS} color={props.color}>
      {props.children}
    </StyledTypography>
  );
};

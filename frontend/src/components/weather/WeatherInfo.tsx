import styled from 'styled-components/native';
import React from 'react';
import * as Color from '../../config/color/Color';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import * as Typo from '../../components/typography/Typography';

// 스타일드 컴포넌트 정의
const StyledView = styled.View`
  height: ${heightPercent * 20 }px;
  border-left-width: ${widthPercent * 3 }px;
  border-left-color: ${Color.GREEN100};
  padding-left: ${widthPercent * 3 }px;;
`;


// 컴포넌트 정의
interface WeatherInfoProps {
  content1: string;
  content2: string;
}

const WeatherInfo = (props:WeatherInfoProps) => {
  return (
    <StyledView>
      <Typo.Detail1_M >{props.content1}</Typo.Detail1_M>
      <Typo.Detail1_M >{props.content2}</Typo.Detail1_M>
    </StyledView>
  );
};

export default WeatherInfo;




import * as FontStyle from '../../config/fontStyle/fontStyle';
import styled from 'styled-components/native';
import React from 'react';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import ProfileImage from '../profileImg/ProfileImg';
import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import { getTimeSincePost } from '../../util/BasicUtil';

const StyledView = styled.View`
  flex-direction: row;
`;

const Container = styled.View`
  margin-left: 7px;
  flex-direction: column;
  justify-content: space-around;
`;

interface ProfileImageProps {
  url?: string;
  name: string;
  date: string;
}

// date 나중에 생각
const ProfileCard = (props: ProfileImageProps) => {
  return (
    <StyledView>
      <ProfileImage url={props.url} width={widthPercent * 30} height={heightPercent * 30} />
      <Container>
        <Typo.BODY3_M color={Color.BLACK}>{props.name}</Typo.BODY3_M>
        <Typo.Detail1_M color={Color.GRAY400}>{getTimeSincePost(props.date)}</Typo.Detail1_M>
      </Container>
    </StyledView>
  );
};

export default ProfileCard;

import styled from 'styled-components/native';
import React, { useState } from 'react';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import ProfileImage from '../profileImg/ProfileImg';
import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import { getTimeSincePost } from '../../util/BasicUtil';
import { Divider } from '../basic/Divider';

const StyledView = styled.View`
  flex-direction: row;
`;

const ColumContainer = styled.View`
  margin-left: 7px;
  flex-direction: column;
  justify-content: space-around;
`;

const RowContainer = styled.View`
  margin-left: 5px;
  flex-direction: row;
  justify-content: space-around;
`;

interface ProfileCardProps {
  url?: string;
  name: string;
  date: string;
}

interface ProfileProps {
  url?: string;
  name: string;
  date: string;
  location: string;
  children?: React.ReactNode;
}

const CertificationBusiness = () => {
  const [certification, setCertification] = useState(false);

  return <>{certification ? <Typo.BODY4_M color={Color.GREEN500}>인증된 사업자</Typo.BODY4_M> : <Typo.BODY4_M color={Color.RED300}>미인증 사업자</Typo.BODY4_M>}</>;
};

// date 나중에 생각
export const ProfileCard = (props: ProfileCardProps) => {
  return (
    <StyledView>
      <ProfileImage url={props.url} width={widthPercent * 30} height={heightPercent * 30} />
      <ColumContainer>
        <Typo.BODY3_M color={Color.BLACK}>{props.name}</Typo.BODY3_M>
        <Typo.Detail1_M color={Color.GRAY400}>{getTimeSincePost(props.date)}</Typo.Detail1_M>
      </ColumContainer>
    </StyledView>
  );
};

export const Profile = (props: ProfileProps) => {
  return (
    <StyledView>
      <ProfileImage url={props.url} width={widthPercent * 45} height={heightPercent * 45} />
      <ColumContainer>
        <RowContainer>
          <Typo.BODY3_M color={Color.BLACK}>{props.name}</Typo.BODY3_M>
          <Typo.BODY4_M color={Color.GRAY400}>{props.location}</Typo.BODY4_M>
        </RowContainer>
        <CertificationBusiness />
      </ColumContainer>
    </StyledView>
  );
};

export const ChattingListItem = (props: ProfileProps) => {
  return (
    <StyledView>
      <ProfileImage url={props.url} width={widthPercent * 45} height={heightPercent * 45} />
      <ColumContainer>
        <RowContainer>
          <Typo.BODY3_M color={Color.BLACK}>{props.name}</Typo.BODY3_M>
          <Typo.Detail1_M color={Color.GRAY400}>
            {getTimeSincePost(props.date)} · {props.location}
          </Typo.Detail1_M>
        </RowContainer>
        <Typo.BODY4_M>{props.children}</Typo.BODY4_M>
        <Divider />
      </ColumContainer>
    </StyledView>
  );
};

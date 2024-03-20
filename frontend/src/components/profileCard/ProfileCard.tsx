import styled from 'styled-components/native';
import React from 'react';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import ProfileImage from '../profileImg/ProfileImg';
import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import { getTimeSincePost } from '../../util/BasicUtil';
import { Divider } from '../basic/Divider';
import { TouchableOpacity, View } from 'react-native';
import { Spacer } from '../basic/Spacer';

const StyledView = styled.View`
  flex-direction: row;
`;

const ColumContainer = styled.View`
  margin-left: 7px;
  flex-direction: column;
  justify-content: space-around;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

interface ProfileCardProps {
  url?: string;
  name: string;
  date: string;
  size?: string;
}

interface ProfileProps {
  onPress?: () => void;
  url?: string;
  name: string;
  date: string;
  location: string;
  children?: React.ReactNode;
  certification: boolean;
}

interface CertificationBusinessProps {
  certification: boolean;
}

const CertificationBusiness = ({ certification }: CertificationBusinessProps) => {
  return <>{certification ? <Typo.BODY4_M color={Color.GREEN500}>인증된 사업자</Typo.BODY4_M> : <Typo.BODY4_M color={Color.RED300}>미인증 사업자</Typo.BODY4_M>}</>;
};

// date 나중에 생각
export const ProfileCard = (props: ProfileCardProps) => {
  return (
    <StyledView>
      <ProfileImage url={props.url} width={props.size ? widthPercent * 45 : widthPercent * 30} height={props.size ? heightPercent * 45 : heightPercent * 30} />
      {props.size ? (
        <ColumContainer>
          <Typo.BODY2_M color={Color.BLACK}>{props.name}</Typo.BODY2_M>
          <Typo.BODY4_M color={Color.GRAY400}>{props.date}</Typo.BODY4_M>
        </ColumContainer>
      ) : (
        <ColumContainer>
          <Typo.BODY3_M color={Color.BLACK}>{props.name}</Typo.BODY3_M>
          <Typo.Detail1_M color={Color.GRAY400}>{getTimeSincePost(props.date)}</Typo.Detail1_M>
        </ColumContainer>
      )}
    </StyledView>
  );
};

interface BussinessProfileCardProps {
  url?: string;
  name: string;
  location: string;
  Certified: boolean;
}

export const BussinessProfileCard = (props: BussinessProfileCardProps) => {
  return (
    <StyledView>
      <ProfileImage url={props.url} width={widthPercent * 30} height={heightPercent * 30} />
      <Spacer horizontal space={widthPercent * 8}></Spacer>
      <ColumContainer>
        <View style={{ flexDirection: 'row' }}>
          <Typo.BODY3_M color={Color.BLACK}>{props.name}</Typo.BODY3_M>
          <Spacer space={widthPercent * 5} horizontal></Spacer>
          <Typo.BODY4_M color={Color.GRAY400}>{props.location}</Typo.BODY4_M>
        </View>
        <Spacer space={heightPercent * 3}></Spacer>
        {props.Certified === true ? <Typo.BODY4_M color={Color.GREEN600}>인증된 사용자</Typo.BODY4_M> : <Typo.BODY4_M color={Color.RED100}>인증되지 않은 사용자</Typo.BODY4_M>}
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
          <Typo.BODY3_M color={Color.BLACK}>{props.name} </Typo.BODY3_M>
          <Typo.BODY4_M color={Color.GRAY400}>{props.location}</Typo.BODY4_M>
        </RowContainer>
        <CertificationBusiness certification={props.certification} />
      </ColumContainer>
    </StyledView>
  );
};

export const ChattingListItem = (props: ProfileProps) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <StyledView style={{ paddingHorizontal: widthPercent * 20, paddingVertical: heightPercent * 12 }}>
        <ProfileImage url={props.url} width={widthPercent * 45} height={heightPercent * 45} />
        <ColumContainer>
          <RowContainer>
            <Typo.BODY3_M color={Color.BLACK}>{props.name} </Typo.BODY3_M>
            <Typo.Detail1_M color={Color.GRAY400}>
              {getTimeSincePost(props.date)} · {props.location}
            </Typo.Detail1_M>
          </RowContainer>
          <View style={{ width: widthPercent * 200 }}>{props.children}</View>
        </ColumContainer>
      </StyledView>
      <Divider />
    </TouchableOpacity>
  );
};

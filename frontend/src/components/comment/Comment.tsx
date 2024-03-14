import React from 'react';
import styled from 'styled-components/native';
import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { Card } from '../card/Card';
import { ProfileCard } from '../profileCard/ProfileCard';
import More from '../../../assets/icons/more_black.svg';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../recoil/atoms/userInfoState';

interface CommentProps {
  data: {
    id: number;
    user_id: number;
    profileImg_url: string;
    name: string;
    date: string;
    content: string;
    group: number;
    recomment?: {
      id: number;
      user_id: number;
      profileImg_url: string;
      name: string;
      date: string;
      content: string;
      group: number;
    }[];
  };
}

export const Comment = (props: CommentProps) => {
  const userInfo = useRecoilValue(userInfoState);

  const onPressMore = (userId: number) => {
    if (userId === userInfo.user_id) {
      console.log;
      console.log('수정/삭제 포함된 모달 열거야');
    } else {
      console.log('답글 달기만 있는 모달 열거야');
    }
  };

  return (
    <CommentContainer>
      <ProfileContainer>
        <ProfileCard url={props.data.profileImg_url} name={props.data.name} date={props.data.date} />
        <More width={widthPercent * 16} height={heightPercent * 16} onPress={() => onPressMore(props.data.user_id)} />
      </ProfileContainer>
      <Card backgroundColor={Color.GRAY100} width={widthPercent * 280} height={heightPercent * 50}>
        <TextContainer>
          <Typo.BODY4_M>{props.data.content}</Typo.BODY4_M>
        </TextContainer>
      </Card>
      {props.data.recomment &&
        props.data.recomment.map((item) => (
          <RecommentContainer key={item.id}>
            <ProfileContainer>
              <ProfileCard url={props.data.profileImg_url} name={item.name} date={item.date} />
              <More width={widthPercent * 16} height={heightPercent * 16} onPress={() => onPressMore(item.user_id)} />
            </ProfileContainer>
            <Card backgroundColor={Color.GRAY100} width={widthPercent * 280} height={heightPercent * 50}>
              <TextContainer>
                <Typo.BODY4_M>{item.content}</Typo.BODY4_M>
              </TextContainer>
            </Card>
          </RecommentContainer>
        ))}
    </CommentContainer>
  );
};

const CommentContainer = styled.View`
  row-gap: ${heightPercent * 10}px;
  margin-top: ${heightPercent * 10}px;
`;

const ProfileContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TextContainer = styled.View`
  margin-left: ${widthPercent * 8}px;
`;

const RecommentContainer = styled.View`
  margin-left: ${widthPercent * 20}px;
  row-gap: ${heightPercent * 10}px;
`;

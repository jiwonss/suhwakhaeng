import React, { useState } from 'react';
import styled from 'styled-components/native';
import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { Card } from '../card/Card';
import { ProfileCard } from '../profileCard/ProfileCard';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../recoil/atoms/userInfoState';
import { Alert, TouchableOpacity, View } from 'react-native';
import { Icon } from '../icon/Icon';

interface CommentProps {
  data: {
    id: number;
    userId: number;
    profileImg_url: string;
    name: string;
    date: string;
    content: string;
    group: number;
    recomment?: {
      id: number;
      userId: number;
      profileImg_url: string;
      name: string;
      date: string;
      content: string;
      group: number;
    }[];
  };
  selectId: number;
  setSelectId: React.Dispatch<React.SetStateAction<number>>;
  focusOnInput: () => void;
}

const CommentContainer = styled.View<{ isSelected: boolean }>`
  padding: ${widthPercent * 8}px;
  padding: ${widthPercent * 8}px;
  row-gap: ${heightPercent * 10}px;
  background-color: ${(props) => (props.isSelected ? Color.GRAY100 : Color.WHITE)};
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

export const Comment = (props: CommentProps) => {
  const userInfo = useRecoilValue(userInfoState);

  return (
    <CommentContainer isSelected={props.data.id === props.selectId}>
      <ProfileContainer>
        <ProfileCard url={props.data.profileImg_url} name={props.data.name} date={props.data.date} />
        <View style={{ flexDirection: 'row', gap: widthPercent * 10 }}>
          <TouchableOpacity
            onPress={() => {
              props.setSelectId(props.data.id);
              props.focusOnInput();
            }}
          >
            <Icon name={'chatbox-ellipses'} size={widthPercent * 16} iconColor={Color.GRAY500} />
          </TouchableOpacity>
          {userInfo.userId == props.data.userId && (
            <TouchableOpacity onPress={() => {}}>
              <Icon name={'trash'} size={widthPercent * 16} iconColor={Color.GRAY500} />
            </TouchableOpacity>
          )}
        </View>
      </ProfileContainer>
      <Card backgroundColor={Color.GRAY200} width={widthPercent * 280} height={heightPercent * 50}>
        <TextContainer>
          <Typo.BODY4_M>{props.data.content}</Typo.BODY4_M>
        </TextContainer>
      </Card>
      {props.data.recomment &&
        props.data.recomment.map((item) => (
          <RecommentContainer key={item.id}>
            <ProfileContainer>
              <ProfileCard url={props.data.profileImg_url} name={item.name} date={item.date} />
              <View style={{ flexDirection: 'row', gap: widthPercent * 10 }}>
                {userInfo.userId == item.userId && (
                  <TouchableOpacity onPress={() => {}}>
                    <Icon name={'trash'} size={widthPercent * 16} iconColor={Color.GRAY500} />
                  </TouchableOpacity>
                )}
              </View>
            </ProfileContainer>
            <Card backgroundColor={Color.GRAY200} width={widthPercent * 280} height={heightPercent * 50}>
              <TextContainer>
                <Typo.BODY4_M>{item.content}</Typo.BODY4_M>
              </TextContainer>
            </Card>
          </RecommentContainer>
        ))}
    </CommentContainer>
  );
};

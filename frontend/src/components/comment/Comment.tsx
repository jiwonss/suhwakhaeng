import React from 'react';
import styled from 'styled-components/native';
import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { Card } from '../card/Card';
import { ProfileCard } from '../profileCard/ProfileCard';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../recoil/atoms/userInfoState';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from '../icon/Icon';
import { deleteComment } from '../../apis/services/community/community';

interface CommentType {
  comment: {
    user: {
      userId: number;
      nickname: string;
      profileImage: string;
    };
    commentId: number;
    createdAt: string;
    content: string;
  };
  recomment: [
    {
      user: {
        userId: number;
        nickname: string;
        profileImage: string;
      };
      commentId: number;
      createdAt: string;
      content: string;
    },
  ];
}

interface CommentProps {
  data: CommentType;
  communityId: number;
  selectId: number;
  setSelectId: React.Dispatch<React.SetStateAction<number>>;
  focusOnInput: () => void;
  getNewComment: () => Promise<void>;
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
  margin-top: ${heightPercent * 10}px;
  margin-left: ${widthPercent * 20}px;
  row-gap: ${heightPercent * 10}px;
`;

export const Comment = (props: CommentProps) => {
  const userInfo = useRecoilValue(userInfoState);

  // 댓글 삭제 눌렀을 때
  const onPressDelete = async (commentId: number) => {
    await deleteComment(commentId, props.communityId);
    await props.getNewComment();
  };

  return (
    <CommentContainer isSelected={props.data.comment.commentId === props.selectId}>
      <ProfileContainer>
        <ProfileCard url={props.data.comment.user.profileImage} name={props.data.comment.user.nickname} date={props.data.comment.createdAt} />
        <View style={{ flexDirection: 'row', gap: widthPercent * 10 }}>
          <TouchableOpacity
            onPress={() => {
              props.setSelectId(props.data.comment.commentId);
              props.focusOnInput();
            }}
          >
            <Icon name={'chatbox-ellipses'} size={widthPercent * 16} iconColor={Color.GRAY500} />
          </TouchableOpacity>
          {Number(userInfo.userId) == props.data.comment.user.userId && (
            <TouchableOpacity onPress={() => onPressDelete(props.data.comment.commentId)}>
              <Icon name={'trash'} size={widthPercent * 16} iconColor={Color.GRAY500} />
            </TouchableOpacity>
          )}
        </View>
      </ProfileContainer>
      <Card backgroundColor={Color.GRAY200} width={widthPercent * 280}>
        <TextContainer>
          <Typo.BODY4_M>{props.data.comment.content}</Typo.BODY4_M>
        </TextContainer>
      </Card>
      {props.data.recomment &&
        props.data.recomment.map((item) => (
          <RecommentContainer key={item.commentId}>
            <ProfileContainer>
              <ProfileCard url={item.user.profileImage} name={item.user.nickname} date={item.createdAt} />
              <View style={{ flexDirection: 'row', gap: widthPercent * 10 }}>
                {Number(userInfo.userId) == item.user.userId && (
                  <TouchableOpacity onPress={() => onPressDelete(item.commentId)}>
                    <Icon name={'trash'} size={widthPercent * 16} iconColor={Color.GRAY500} />
                  </TouchableOpacity>
                )}
              </View>
            </ProfileContainer>
            <Card backgroundColor={Color.GRAY200} width={widthPercent * 280}>
              <TextContainer>
                <Typo.BODY4_M>{item.content}</Typo.BODY4_M>
              </TextContainer>
            </Card>
          </RecommentContainer>
        ))}
    </CommentContainer>
  );
};

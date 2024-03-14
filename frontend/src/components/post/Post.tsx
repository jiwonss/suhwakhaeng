import React, { useState } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import styled from 'styled-components/native';
import { getTimeSincePost } from '../../util/BasicUtil';
import { ProfileCard } from '../profileCard/ProfileCard';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { LocalImageLoader, UriImageLoader } from '../image/ImageLoader';
import Favorite from '../../../assets/icons/favorite.svg';
import FavoriteBorder from '../../../assets/icons/favorite_border.svg';
import Comment from '../../../assets/icons/comment.svg';

interface PostProps {
  postData: {
    name: string;
    date: string;
    classification: string;
    content: string;
    likeNumber: number;
    commentNumber: number;
    imgUrl_one?: string;
    imgUrl_two?: string;
    imgUrl_three?: string;
    imgUrl_four?: string;
  };
  isPreview?: boolean;
  onPress: () => void;
}

// 이미지 부분 추후 수정
// 게시글 분류 태그 추후 수정
/**
 * 게시글 컴포넌트
 * - name: 작성자 이름
 * - date: 작성일
 * - classification: 게시글 분류
 * - content: 작성 내용
 * - likeNumber: 좋아요수
 * - commentNumber: 댓글 수
 * - isPreview: 미리보기 여부(글목록에서 조회하는 경우: true / 글 상세보기인 경우: false)
 * - onPress: 게시글 눌렀을 때 발생할 이벤트(ex. 페이지 이동)
 * - imgUrl: 이미지 링크(대표사진)
 * @param props
 * @returns
 */
const Post = (props: PostProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const toggleLike = () => {
    if (!isFavorite) {
      setIsFavorite(true);
      // 좋아요 1 증가
    } else {
      setIsFavorite(false);
      // 좋아요 1 감소
    }
  };

  return (
    <PostContainer>
      <ProfileContainer>
        <ProfileCard name={props.postData.name} date={props.postData.date} />
        {/* 게시글분류태그 수정해야함 */}
        <Typo.BODY3_M>{props.postData.classification}</Typo.BODY3_M>
      </ProfileContainer>
      <ContentContainer>
        <TouchableOpacity onPress={props.onPress}>
          <TextContainer>
            {props.isPreview ? <Typo.BODY4_M numberOfLines={4}>{props.postData.content}</Typo.BODY4_M> : <Typo.BODY4_M>{props.postData.content}</Typo.BODY4_M>}
          </TextContainer>
          {props.postData.imgUrl_one &&
            (props.isPreview ? (
              <ImgeContainer>
                {/* 이미지 부분 수정해야함 */}
                <Typo.BODY4_M>{props.postData.imgUrl_one}</Typo.BODY4_M>
              </ImgeContainer>
            ) : (
              <ImgeContainer>
                {/* 이미지 부분 수정해야함 */}
                <Typo.BODY4_M>{props.postData.imgUrl_one}</Typo.BODY4_M>
                {props.postData.imgUrl_two && <Typo.BODY4_M>{props.postData.imgUrl_two}</Typo.BODY4_M>}
                {props.postData.imgUrl_three && <Typo.BODY4_M>{props.postData.imgUrl_three}</Typo.BODY4_M>}
                {props.postData.imgUrl_four && <Typo.BODY4_M>{props.postData.imgUrl_four}</Typo.BODY4_M>}
              </ImgeContainer>
            ))}
        </TouchableOpacity>
        <ReactionContainer>
          <ReactionElemContainer>
            {isFavorite ? (
              <Favorite width={widthPercent * 20} height={heightPercent * 20} onPress={toggleLike} />
            ) : (
              <FavoriteBorder width={widthPercent * 20} height={heightPercent * 20} onPress={toggleLike} />
            )}
            <Typo.BODY4_M color={Color.GRAY400}>{props.postData.likeNumber}</Typo.BODY4_M>
          </ReactionElemContainer>
          <ReactionElemContainer>
            <Comment width={widthPercent * 20} height={heightPercent * 20} />
            <Typo.BODY4_M color={Color.GRAY400}>{props.postData.commentNumber}</Typo.BODY4_M>
          </ReactionElemContainer>
        </ReactionContainer>
      </ContentContainer>
    </PostContainer>
  );
};

/// ************ styled component 영역 ************
const PostContainer = styled.View`
  padding: 0px ${widthPercent * 15}px;
  border-bottom-width: 1px;
  border-bottom-color: ${Color.GRAY200};
`;

const ProfileContainer = styled.View`
  padding: ${widthPercent * 12}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ContentContainer = styled.View`
  margin: 10px 20px;
`;

const TextContainer = styled.View`
  width: ${widthPercent * 220}px;
`;

const ImgeContainer = styled.View`
  margin-top: ${heightPercent * 20}px;
`;
const ReactionContainer = styled.View`
  margin-top: ${heightPercent * 10}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: ${widthPercent * 10}px;
`;

const ReactionElemContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: ${widthPercent * 4}px;
`;

export default Post;

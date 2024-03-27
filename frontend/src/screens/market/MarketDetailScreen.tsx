import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import styled from 'styled-components/native';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import Header from '../../components/header/Header';
import { LocalImageLoader, UriImageLoader } from '../../components/image/ImageLoader';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { ProfileCard } from '../../components/profileCard/ProfileCard';
import { BasicTag } from '../../components/classificationTag/ClassificationTag';
import { addComma } from '../../util/BasicUtil';
import { StackNavigationProp } from '@react-navigation/stack';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { BasicButton, LikeButton } from '../../components/button/Buttons';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../recoil/atoms/userInfoState';
import { MoreModal } from '../../modules/marketModules/MarketDetailModules';
import { deleteIsLiked, deleteMarketPost, getIsLiked, getMarketPostDetail, updateIsLiked } from '../../apis/services/market/market';
import { changeCategoryName } from '../../util/MarketUtil';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';

interface MarketDetailProps {
  route: {
    params: { id: number };
  };
}

type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const MarketDetailScreen = (props: MarketDetailProps) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation<RootStackNavigationProp>();

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // 게시글 데이터 관련
  const [postUserInfo, setPostUserInfo] = useState<{ userId: number; nickname: string; profileImage: string; sido: string | null; gugun: string | null }>({
    userId: 0,
    nickname: '',
    profileImage: '',
    sido: null,
    gugun: null,
  });

  const [postDetailInfo, setPostDetailInfo] = useState<{
    postId: number | null;
    title: string;
    price: number;
    content: string;
    cate: string;
    image1: string;
    image2: string | null;
    image3: string | null;
    image4: string | null;
    x: number | null;
    y: number | null;
    roadNameAddress: string;
  }>({ postId: null, title: '', price: 0, content: '', cate: '', image1: '', image2: null, image3: null, image4: null, x: null, y: null, roadNameAddress: '' });

  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    const getPostDetail = async () => {
      const params = { tradeId: props.route.params.id };
      const response = await getMarketPostDetail(params);
      const isLikedResponse = await getIsLiked(params);
      console.log(response.dataBody.tradeDetailInfo);

      setPostUserInfo({
        ...postUserInfo,
        userId: response.dataBody.userInfo.userId,
        nickname: response.dataBody.userInfo.nickname,
        profileImage: response.dataBody.userInfo.profileImage,
        sido: response.dataBody.userInfo.sido,
        gugun: response.dataBody.userInfo.gugun,
      });
      setPostDetailInfo({
        ...postDetailInfo,
        postId: response.dataBody.tradeDetailInfo.id,
        title: response.dataBody.tradeDetailInfo.title,
        content: response.dataBody.tradeDetailInfo.content,
        cate: response.dataBody.tradeDetailInfo.cate,
        price: response.dataBody.tradeDetailInfo.price,
        image1: response.dataBody.tradeDetailInfo.image1,
        image2: response.dataBody.tradeDetailInfo.image2,
        image3: response.dataBody.tradeDetailInfo.image3,
        image4: response.dataBody.tradeDetailInfo.image4,
        x: response.dataBody.tradeDetailInfo.axisLocation.x,
        y: response.dataBody.tradeDetailInfo.axisLocation.y,
        roadNameAddress: response.dataBody.tradeDetailInfo.axisLocation.roadNameAddress,
      });

      setIsLoaded(true);

      setIsLiked(isLikedResponse.dataBody.isLiked);
    };

    getPostDetail();
  }, [isFocused]);

  // 좋아요 처리 관련
  const toggleIsLiked = async () => {
    if (isLiked) {
      // 좋아요 상태일 때 누른 경우
      await deleteIsLiked({ tradeId: props.route.params.id });
      setIsLiked(false);
    } else {
      await updateIsLiked({ tradeId: props.route.params.id });
      setIsLiked(true);
    }
  };

  const userInfo = useRecoilValue(userInfoState);

  // 모달 관련
  const [moreModalVisible, setMoreModalVisible] = useState<boolean>(false);
  const onPressMore = () => {
    if (userInfo.userId == String(postUserInfo.userId)) {
      setMoreModalVisible(true);
    }
  };

  const deletePost = async (postId: number) => {
    // TODO: 삭제 후 목록(MarketScreen)으로 이동
    const response = await deleteMarketPost({ tradeId: props.route.params.id });

    if (response.dataHeader.successCode === 0) {
      alert('삭제되었습니다');
    }
    navigation.navigate('MarketScreen');
  };

  const modifyPost = (postId: number) => {
    // TODO: 게시글 수정 화면(MarketModifyScreen)으로 이동
    navigation.navigate('MarketModifyScreen', { id: postId, address: '', x: 0, y: 0 });
  };

  return (
    <Container>
      <Header type='default' firstIcon='back' secondIcon='more' onPressMore={onPressMore} />
      <ScrollView style={{ marginBottom: heightPercent * 60 }}>
        {isLoaded ? (
          postDetailInfo.image1 ? (
            <UriImageLoader style={{ width: '100%', height: heightPercent * 250 }} resizeMode='contain' uri={postDetailInfo.image1} />
          ) : (
            <LocalImageLoader source={require('../../../assets/imgs/favicon.png')} style={{ width: '100%', height: heightPercent * 250 }} resizeMode='contain' />
          )
        ) : (
          <View style={{ width: '100%', height: heightPercent * 250 }} />
        )}
        <ProfileContainer>
          <ProfileCard
            url={postUserInfo.profileImage}
            name={postUserInfo.nickname}
            date={postUserInfo.sido ? `${postUserInfo.sido} ${postUserInfo.gugun}` : '지역 등록 전'}
            size='big'
          />
        </ProfileContainer>
        <PostContainer style={{ rowGap: heightPercent * 4 }}>
          <BasicTag>
            <Typo.Detail1_M color={Color.WHITE}>{changeCategoryName(postDetailInfo.cate)}</Typo.Detail1_M>
          </BasicTag>
          <Typo.BODY1_M>{postDetailInfo.title}</Typo.BODY1_M>
          <Typo.BODY3_M>{addComma(postDetailInfo.price)}원</Typo.BODY3_M>
        </PostContainer>
        <PostContainer style={{ rowGap: heightPercent * 10 }}>
          <Typo.BODY4_M>{postDetailInfo.content}</Typo.BODY4_M>
          <Typo.BODY4_M>{postDetailInfo.roadNameAddress}</Typo.BODY4_M>
          <Typo.BODY4_M>{postDetailInfo.x}</Typo.BODY4_M>
          <Typo.BODY4_M>{postDetailInfo.y}</Typo.BODY4_M>
          {postDetailInfo.image1 && <UriImageLoader uri={postDetailInfo.image1} resizeMode='contain' style={{ width: widthPercent * 300, height: heightPercent * 200 }} />}
          {postDetailInfo.image2 && <UriImageLoader uri={postDetailInfo.image2} resizeMode='contain' style={{ width: widthPercent * 300, height: heightPercent * 200 }} />}
          {postDetailInfo.image3 && <UriImageLoader uri={postDetailInfo.image3} resizeMode='contain' style={{ width: widthPercent * 300, height: heightPercent * 200 }} />}
          {postDetailInfo.image4 && <UriImageLoader uri={postDetailInfo.image4} resizeMode='contain' style={{ width: widthPercent * 300, height: heightPercent * 200 }} />}

          {/* 지도 나중에 추가... */}
          {postDetailInfo.roadNameAddress && <Typo.BODY3_B color={Color.RED200}>{postDetailInfo.roadNameAddress}</Typo.BODY3_B>}
        </PostContainer>
      </ScrollView>
      <ButtonContainer>
        <LikeButton isLiked={isLiked} setIsLiked={setIsLiked} onPress={toggleIsLiked} />
        {userInfo.userId == String(postUserInfo.userId) ? (
          <BasicButton
            onPress={() => {
              console.log('내 대화목록으로 이동');
            }}
            width={widthPercent * 260}
            height={heightPercent * 45}
            borderColor={Color.GREEN500}
            borderRadius={10}
          >
            <Typo.BODY3_M color={Color.WHITE}>대화 중인 채팅방으로 이동</Typo.BODY3_M>
          </BasicButton>
        ) : (
          <BasicButton
            onPress={() => {
              console.log('채팅방 생성');
            }}
            width={widthPercent * 260}
            height={heightPercent * 45}
            borderColor={Color.GREEN500}
            borderRadius={10}
          >
            <Typo.BODY3_M color={Color.WHITE}>채팅 걸기</Typo.BODY3_M>
          </BasicButton>
        )}
      </ButtonContainer>
      <MoreModal isVisible={moreModalVisible} setIsVisible={setMoreModalVisible} postId={props.route.params.id} onDelete={deletePost} onModify={modifyPost} />
    </Container>
  );
};

/** Styled Component 영역 */
const Container = styled.View`
  flex: 1;
  background-color: ${Color.WHITE};
  position: relative;
`;

const ProfileContainer = styled.View`
  padding: ${heightPercent * 20}px ${widthPercent * 20}px;
  border-bottom-width: 0.8px;
  border-color: ${Color.GRAY200};
`;

const PostContainer = styled.View`
  padding: ${heightPercent * 20}px ${widthPercent * 30}px;
  border-bottom-width: 0.8px;
  border-color: ${Color.GRAY200};
`;

const ButtonContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  column-gap: ${widthPercent * 10}px;
  bottom: ${heightPercent * 10}px;
`;

export default MarketDetailScreen;

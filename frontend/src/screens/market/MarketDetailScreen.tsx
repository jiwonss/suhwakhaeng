import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
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
import { useNavigation } from '@react-navigation/native';
import { BasicButton, LikeButton } from '../../components/button/Buttons';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../recoil/atoms/userInfoState';
import { MoreModal } from '../../modules/marketModules/MarketDetailModules';

interface MarketDetailProps {
  route: {
    params: { id: number };
  };
}

type RootStackParamList = {
  MarketModifyScreen: { id: number };
  MarketDetailScreen: { id: number };
  MarketScreen: undefined;
};

type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const MarketDetailScreen = (props: MarketDetailProps) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  useEffect(() => {
    // console.log('게시글 상세 내용 로드하자');
  }, []);

  const userInfo = useRecoilValue(userInfoState);

  const postData = {
    userId: '1',
    name: '김농민',
    date: '2024-03-12 11:02:02',
    classification: '작물',
    title: '감자 1kg',
    price: '1000',
    content: '싱싱한 햇감자 팝니다.. 서구 금호동으로 오세요 \n아아아',
    x: 37.59523, // 주소 x 좌표
    y: 127.086, // 주소 y 좌표
    address: '광주광역시 서구',
    imgUrl_one: '',
    imgUrl_two: '',
    imgUrl_three: '',
    imgUrl_four: '',
  };

  // 모달 관련
  const [moreModalVisible, setMoreModalVisible] = useState<boolean>(false);
  const onPressMore = () => {
    if (userInfo.userId === postData.userId) {
      setMoreModalVisible(true);
    }
  };

  const deletePost = (postId: number) => {
    console.log(`${postId}번 게시글 삭제합니다`);
    // TODO: 삭제 후 목록(MarketScreen)으로 이동
  };

  const modifyPost = (postId: number) => {
    console.log(`${postId}번 게시글 수정합니다`);
    // TODO: 게시글 수정 화면(MarketModifyScreen)으로 이동
    navigation.navigate('MarketModifyScreen', { id: postId });
  };

  return (
    <Container>
      <Header type='default' firstIcon='back' secondIcon='more' onPressMore={onPressMore} />
      <ScrollView>
        <LocalImageLoader style={{ width: '100%', height: heightPercent * 250 }} resizeMode='contain' source={require('../../../assets/imgs/favicon.png')} />
        <ProfileContainer>
          <ProfileCard name={postData.name} date={postData.address} size='big' />
        </ProfileContainer>
        <PostContainer style={{ rowGap: heightPercent * 4 }}>
          <BasicTag>
            <Typo.Detail1_M color={Color.WHITE}>{postData.classification}</Typo.Detail1_M>
          </BasicTag>
          <Typo.BODY1_M>{postData.title}</Typo.BODY1_M>
          <Typo.BODY3_M>{addComma(postData.price)}원</Typo.BODY3_M>
        </PostContainer>
        <PostContainer style={{ rowGap: heightPercent * 10 }}>
          <Typo.BODY4_M>{postData.content}</Typo.BODY4_M>
          {postData.imgUrl_one && <UriImageLoader uri={postData.imgUrl_one} />}
          {postData.imgUrl_two && <UriImageLoader uri={postData.imgUrl_two} />}
          {postData.imgUrl_three && <UriImageLoader uri={postData.imgUrl_three} />}
          {postData.imgUrl_four && <UriImageLoader uri={postData.imgUrl_four} />}
          {/* 지도 나중에 추가... */}
          {postData.address && <Typo.BODY3_B color={Color.RED200}>*지도 추가 예정 {postData.address}</Typo.BODY3_B>}
        </PostContainer>
      </ScrollView>
      <ButtonContainer>
        <LikeButton onPress={() => {}} />
        {userInfo.userId === postData.userId ? (
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

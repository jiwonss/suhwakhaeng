import { NavigationProp, useIsFocused, useNavigation } from '@react-navigation/native';
import { Fragment, useEffect, useId, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Bag3D from '../../../assets/icons/bag3D.svg';
import Calendar3D from '../../../assets/icons/calendar3D.svg';
import Coin3D from '../../../assets/icons/coin3D.svg';
import Leaf3D from '../../../assets/icons/leaf3D.svg';
import { Spacer } from '../../components/basic/Spacer';
import CustomRadioButton from '../../components/cutomRadioButton/CutomRadioButton';
import Header from '../../components/header/Header';
import MenuButton from '../../components/menuButton/MenuButton';
import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';
import { getPostList, updateIsLiked } from '../../apis/services/community/community';
import Post from '../../components/post/Post';
import { BasicButton } from '../../components/button/Buttons';
import styled from 'styled-components/native';
import FloatingActionButton from '../../components/floatingActionButton/FloatingActionButton';
import { changeCategoryName } from '../../util/MarketUtil';

const ContentContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: ${heightPercent * 80}px;
  row-gap: ${heightPercent * 20}px;
`;

const MainScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [category, setCategory] = useState<string>('');
  const [postCnt, setPostCnt] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const radioData = [
    {
      content: '전체',
      event: () => {
        setActiveIndex(0);
        setCategory('');
        setPostCnt(0);
      },
      active: activeIndex === 0,
    },
    {
      content: '자유',
      event: () => {
        setActiveIndex(1);
        setCategory('FREEDOM');
        setPostCnt(0);
      },
      active: activeIndex === 1,
    },
    {
      content: '꿀팁',
      event: () => {
        setActiveIndex(2);
        setCategory('TIP');
        setPostCnt(0);
      },
      active: activeIndex === 2,
    },
    {
      content: '나눔',
      event: () => {
        setActiveIndex(3);
        setCategory('SHARE');
        setPostCnt(0);
      },
      active: activeIndex === 3,
    },
    {
      content: '질문',
      event: () => {
        setActiveIndex(4);
        setCategory('QUESTION');
        setPostCnt(0);
      },
      active: activeIndex === 4,
    },
  ];

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onPressSearch = () => {
    navigation.navigate('SearchPostScreen');
  };

  //글 등록 버튼

  const onPressRegist = () => {
    navigation.navigate('CreatePostScreen', { cate: category });
    setCategory('');
    setActiveIndex(0);
  };

  const buttonData = [
    {
      title: '게시글 등록',
      event: onPressRegist,
      color: `${Color.GREEN500}`,
    },
  ];

  // 게시글 목록 데이터
  const [postData, setPostData] = useState<
    {
      user: {
        nickname: string;
        profileImage: string;
        userId: number;
      };
      communityId: number;
      communityContent: string;
      thumbnail: string;
      cate: string;
      isLiked: boolean;
      likeCount: number;
      commentCount: number;
      createdAt: string;
    }[]
  >([]);

  const getPost = async () => {
    const response = await getPostList({ id: postCnt, keyword: '', cate: category });
    setPostData(response.dataBody);
    setPostCnt(response.dataBody[response.dataBody.length - 1].communityId);
    setIsLoading(true);
  };

  const getMorePost = async () => {
    if (postCnt <= 1) {
    } else {
      const params = { id: postCnt, keyword: '', cate: category };
      const response = await getPostList(params);
      setPostData((prevData) => [...prevData, ...response.dataBody]);
      setPostCnt(response.dataBody[response.dataBody.length - 1].communityId);
    }
  };

  useEffect(() => {
    getPost();
  }, [activeIndex]);

  const renderItem = ({ item }) => {
    return (
      <Fragment key={item.communityId}>
        <Spacer horizontal={false} space={10} />
        <Post
          onPress={() => {
            navigation.navigate('DetailPostScreen', { id: item.communityId, previousScreen: 'MainScreen' });
          }}
          onPressLikeButton={() => {}}
          isPreview={true}
          postData={{
            name: item.user.nickname,
            date: item.createdAt,
            classification: changeCategoryName(item.cate),
            isLiked: item.isLiked,
            content: item.communityContent,
            likeNumber: item.likeCount,
            commentNumber: item.commentCount,
            profileImg: item.user.profileImage,
            imgUrl_one: item.thumbnail,
          }}
        />
      </Fragment>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <Header type={'leftTitle'} onPressSearch={onPressSearch} />
      <FlatList
        ListHeaderComponent={
          <>
            <Spacer horizontal={false} space={19} />
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Spacer horizontal={true} space={20} />
              <Typo.BODY4_M color={Color.BLACK}>
                내가 키우는 농작물, <Typo.BODY4_M color={Color.GREEN600}>수확행</Typo.BODY4_M>에서 관리 해보세요!
              </Typo.BODY4_M>
            </View>
            <Spacer horizontal={false} space={19} />

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
              {/* 바로 카메라 촬영으로 들어간 뒤에 촬영되면 진단결과로 넘어가게 수정하기 */}
              <MenuButton size='small' title='병해 진단' borderColor={Color.GREEN50} onPressButton={() => navigation.navigate('DiseasePlantScreen')}>
                <Leaf3D width={widthPercent * 36} height={heightPercent * 36} />
              </MenuButton>
              <Spacer horizontal={true} space={20} />
              <MenuButton size='small' title='영농일지' onPressButton={() => navigation.navigate('FarmScreen', { activeIndex: 0 })}>
                <Calendar3D width={widthPercent * 36} height={heightPercent * 36} />
              </MenuButton>
              <Spacer horizontal={true} space={20} />
              <MenuButton size='small' title='영농장부' onPressButton={() => navigation.navigate('FarmScreen', { activeIndex: 1 })}>
                <Bag3D width={widthPercent * 36} height={heightPercent * 36} />
              </MenuButton>
              <Spacer horizontal={true} space={20} />
              <MenuButton size='small' title='정부 보조금' onPressButton={() => navigation.navigate('GovernmentScreen')}>
                <Coin3D width={widthPercent * 36} height={heightPercent * 36} />
              </MenuButton>
            </View>
            <Spacer horizontal={false} space={10} />
            <CustomRadioButton data={radioData} />
          </>
        }
        ListEmptyComponent={
          isLoading ? (
            <ContentContainer>
              <Typo.BODY2_M>아직 등록된 글이 없습니다.</Typo.BODY2_M>
              <BasicButton onPress={onPressRegist} width={widthPercent * 90} height={heightPercent * 45} borderColor={Color.GREEN500} borderRadius={10}>
                <Typo.BODY4_M color={Color.WHITE}>글 쓰러 가기</Typo.BODY4_M>
              </BasicButton>
            </ContentContainer>
          ) : (
            <ContentContainer>
              <ActivityIndicator />
            </ContentContainer>
          )
        }
        data={postData}
        renderItem={renderItem}
        keyExtractor={(item) => item.communityId.toString()}
        onEndReached={getMorePost}
        onEndReachedThreshold={0.8}
        // onRefresh={onRefresh}
        // refreshing={refreshing}
      />
      <FloatingActionButton data={buttonData} />
    </SafeAreaView>
  );
};

export default MainScreen;

import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import Header from '../../components/header/Header';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import { NavigationProp, useIsFocused, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';
import styled from 'styled-components/native';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import CustomRadioButton from '../../components/cutomRadioButton/CutomRadioButton';
import Post from '../../components/post/Post';
import { getPostList } from '../../apis/services/community/community';
import { changeCategoryName } from '../../util/MarketUtil';

const Container = styled.View`
  flex: 1;
  background-color: ${Color.WHITE};
`;

const ButtonContainer = styled.View`
  padding: ${heightPercent * 10}px ${widthPercent * 20}px;
`;

const SearchPostScreen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const radioData = [
    {
      content: '전체',
      event: () => {
        setActiveIndex(0);
        setCategory('');
      },
      active: activeIndex === 0,
    },
    {
      content: '자유',
      event: () => {
        setActiveIndex(1);
        setCategory('FREEDOM');
      },
      active: activeIndex === 1,
    },
    {
      content: '꿀팁',
      event: () => {
        setActiveIndex(2);
        setCategory('TIP');
      },
      active: activeIndex === 2,
    },
    {
      content: '나눔',
      event: () => {
        setActiveIndex(3);
        setCategory('SHARE');
      },
      active: activeIndex === 3,
    },
    {
      content: '질문',
      event: () => {
        setActiveIndex(4);
        setCategory('QUESTION');
      },
      active: activeIndex === 4,
    },
  ];

  const [searchValue, setSearchValue] = useState<string>('');
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

  const onPressPost = (postId: number) => {
    navigation.navigate('DetailPostScreen', { id: postId });
  };

  const onSubmitSearch = async () => {
    // TODO: 검색어 입력 완료시 검색 결과 받아오기
    if (searchValue) {
      const params = { id: 0, keyword: searchValue, cate: '' };
      const response = await getPostList(params);
      setPostData(response.dataBody);
    }
  };

  useEffect(() => {
    const getPost = async () => {
      // const params = { tradeId: tradeId, keyword: searchValue, cate: category };
      // const response = await getMarketPostList(params);
      // setPostData(response.dataBody);
    };

    if (searchValue) {
      getPost();
    }
  }, [isFocused]);

  useEffect(() => {
    const getPost = async () => {
      const params = { id: 0, keyword: searchValue, cate: category };
      const response = await getPostList(params);
      setPostData(response.dataBody);
    };

    if (searchValue) {
      getPost();
    }
  }, [activeIndex]);

  useEffect(() => {
    // 검색어 변경시 검색 결과 초기화
    setPostData([]);
  }, [searchValue]);

  return (
    <Container>
      <Header type='search' value={searchValue} setValue={setSearchValue} onSubmitSearch={onSubmitSearch} />
      <ButtonContainer>
        <CustomRadioButton data={radioData} />
      </ButtonContainer>
      {postData.length !== 0 ? (
        <>
          <ScrollView style={{ flex: 1 }}>
            {postData.map((data) => (
              <Post
                key={data.communityId}
                onPress={() => onPressPost(data.communityId)}
                postData={{
                  name: data.user.nickname,
                  date: data.createdAt,
                  classification: changeCategoryName(data.cate),
                  content: data.communityContent,
                  isLiked: data.isLiked,
                  likeNumber: data.likeCount,
                  commentNumber: data.commentCount,
                  profileImg: data.user.profileImage,
                  imgUrl_one: data.thumbnail,
                }}
                isPreview={true}
              />
            ))}
          </ScrollView>
        </>
      ) : (
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: heightPercent * 50 }}>
          <Typo.BODY3_M>검색 결과가 없습니다</Typo.BODY3_M>
        </View>
      )}
    </Container>
  );
};

export default SearchPostScreen;

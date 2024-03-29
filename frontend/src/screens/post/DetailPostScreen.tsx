import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import Header from '../../components/header/Header';
import Post, { PostProps } from '../../components/post/Post';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';
import { SlideModal } from '../../components/modal/Modal';
import { BasicButton } from '../../components/button/Buttons';
import { Spacer } from '../../components/basic/Spacer';
import { getPostDetail } from '../../apis/services/community/community';
import { changeCategoryName } from '../../util/MarketUtil';

interface DetaliPostProps {
  route: {
    params: {
      id: number;
    };
  };
}

const DetailPostScreen = (props: DetaliPostProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [postData, setPostData] = useState<{
    user: {
      nickname: string;
      profileImage: string;
      userId: number;
    };
    communityId: number;
    communityContent: string;
    cate: string;
    isLiked: boolean;
    likeCount: number;
    commentCount: number;
    createdAt: string;
    image1?: string;
    image2?: string;
    image3?: string;
    image4?: string;
  }>({
    user: {
      nickname: '',
      profileImage: '',
      userId: 0,
    },
    communityId: 0,
    communityContent: '',
    cate: '',
    isLiked: false,
    likeCount: 0,
    commentCount: 0,
    createdAt: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
  });

  useEffect(() => {
    const getDetail = async () => {
      const response = await getPostDetail({ communityId: props.route.params.id });
      setPostData(response.dataBody);
    };

    getDetail();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <Header type={'default'} firstIcon='back' secondIcon={'more'} onPressMore={() => setModalVisible(true)} />
      <Post
        onPress={() => console.log('')}
        postData={{
          name: postData.user.nickname,
          date: postData.createdAt,
          classification: changeCategoryName(postData.cate),
          content: postData.communityContent,
          likeNumber: postData.likeCount,
          commentNumber: postData.commentCount,
          profileImg: postData.user.profileImage,
          imgUrl_one: postData.image1,
          imgUrl_two: postData.image2,
          imgUrl_three: postData.image3,
          imgUrl_four: postData.image4,
        }}
      />
      <SlideModal isVisible={modalVisible} setIsVisible={setModalVisible}>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <BasicButton
            onPress={() => {
              console.log('수정 페이지로 이동');
              // navigation.navigate('UpdatePostScreen', { postData });
              setModalVisible(false);
            }}
            width={300}
            height={50}
            backgroundColor={Color.WHITE}
            borderColor={Color.GRAY500}
            borderRadius={10}
          >
            <Typo.BODY3_M color={Color.GREEN500}>수정하기</Typo.BODY3_M>
          </BasicButton>
          <Spacer space={12} />
          <BasicButton
            onPress={() => {
              Alert.alert('삭제', '정말 삭제하시겠습니까?', [
                { text: '아니오', onPress: () => setModalVisible(false), style: 'cancel' },
                { text: '예', onPress: () => console.log('삭제 로직 실행'), style: 'destructive' },
              ]);
              setModalVisible(false);
            }}
            width={300}
            height={50}
            backgroundColor={Color.GREEN500}
            borderColor={Color.GRAY500}
            borderRadius={10}
          >
            <Typo.BODY3_M color={Color.WHITE}>삭제하기</Typo.BODY3_M>
          </BasicButton>
        </View>
      </SlideModal>
    </ScrollView>
  );
};

export default DetailPostScreen;

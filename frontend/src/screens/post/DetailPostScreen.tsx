import React, { useState } from 'react';
import { Alert, ScrollView, View, Text } from 'react-native';
import Header from '../../components/header/Header';
import Post, { PostProps } from '../../components/post/Post';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';
import { SlideModal } from '../../components/modal/Modal';
import { BasicButton } from '../../components/button/Buttons';
import { Spacer } from '../../components/basic/Spacer';

const DetailPostScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [modalVisible, setModalVisible] = useState(false);

  const postData: PostProps['postData'] = {
    name: '김농부',
    date: '2024-03-10 9:46:56',
    classification: '자유',
    content: '부직포 벗긴 밭에 풀이 너무 많아 뽑기를 포기하고 ‘트리부닐’을 살포했습니다.',
    likeNumber: 0,
    commentNumber: 0,
    imgUrl_one: require('../../../assets/imgs/kakaoButton.png'),
    imgUrl_two: require('../../../assets/imgs/favicon.png'),
    imgUrl_three: require('../../../assets/imgs/favicon.png'),
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <Header type={'default'} firstIcon='back' secondIcon={'more'} onPressMore={() => setModalVisible(true)} />
      <Post postData={postData} onPress={() => console.log('')} />
      <SlideModal isVisible={modalVisible} setIsVisible={setModalVisible}>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <BasicButton
            onPress={() => {
              console.log('수정 페이지로 이동');
              navigation.navigate('UpdatePostScreen', { postData });
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

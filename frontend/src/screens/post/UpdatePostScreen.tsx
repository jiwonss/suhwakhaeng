import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import styled from 'styled-components/native';
import { Spacer } from '../../components/basic/Spacer';
import { BasicButton } from '../../components/button/Buttons';
import CustomRadioButton from '../../components/cutomRadioButton/CutomRadioButton';
import Header from '../../components/header/Header';
import { MultiLineInputBox } from '../../components/inputBox/Input';
import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';
import { useRoute } from '@react-navigation/core';
import { PostProps } from '../../components/post/Post';
import ImgThumbnail from '../../components/imgThumbnail/ImgThumbnail';
import ImgUploader from '../../components/imgUploader/ImgUploader';

const Container = styled.View`
  margin-left: ${20 * widthPercent}px;
  margin-right: ${20 * widthPercent}px;
  margin-bottom: ${20 * heightPercent}px;
  row-gap: ${5 * heightPercent}px;
`;

const UpdatePostScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { postData } = route.params as { postData: PostProps['postData'] };

  const [activeIndex, setActiveIndex] = useState(0);
  const [postContent, setPostContent] = useState(postData.content);
  const [Urls, setUrls] = useState<string[]>([
    typeof postData.imgUrl_one === 'string' ? postData.imgUrl_one : '',
    typeof postData.imgUrl_two === 'string' ? postData.imgUrl_two : '',
    typeof postData.imgUrl_three === 'string' ? postData.imgUrl_three : '',
  ]);
  const Data = [
    { content: '자유', event: () => setActiveIndex(0), active: activeIndex === 0 },
    { content: '꿀팁', event: () => setActiveIndex(1), active: activeIndex === 1 },
    { content: '나눔', event: () => setActiveIndex(2), active: activeIndex === 2 },
    { content: '질문', event: () => setActiveIndex(3), active: activeIndex === 3 },
  ];

  const onSubmit = () => {
    setPostContent(postContent);
    // back으로 보내는 API 코드 작성
    // try시 navigation.goBack()
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
      <ScrollView style={{ flex: 1, backgroundColor: Color.WHITE }}>
        <Header type={'default'} firstIcon='back' title={'게시글 수정'} />
        <Spacer space={20} />
        <Container>
          <Typo.BODY4_M>분류 선택</Typo.BODY4_M>
          <View style={{ alignItems: 'center' }}>
            <CustomRadioButton data={Data} width={60} />
          </View>
        </Container>
        <Container>
          <Typo.BODY4_M>내용</Typo.BODY4_M>
          <MultiLineInputBox value={postContent} onChangeText={setPostContent} placeholder={'내용을 작성하세요'} />
        </Container>
        <Container>
          <Typo.BODY4_M>사진</Typo.BODY4_M>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', padding: widthPercent * 10 }}>
            <ImgUploader data={Urls} setData={setUrls}></ImgUploader>
            {Urls.map((url, index) => (
              <React.Fragment key={index}>
                <ImgThumbnail url={url} width={70} height={70}></ImgThumbnail>
                {index !== Urls.length - 1 && <Spacer horizontal space={widthPercent * 10} />}
              </React.Fragment>
            ))}
          </ScrollView>
        </Container>
      </ScrollView>
      <Container>
        <BasicButton borderColor={Color.GREEN500} borderRadius={10} height={45} onPress={onSubmit}>
          <Typo.BODY3_M color={Color.WHITE}>작성완료</Typo.BODY3_M>
        </BasicButton>
      </Container>
    </View>
  );
};

export default UpdatePostScreen;

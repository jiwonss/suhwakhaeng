import React, { useEffect, useState } from 'react';
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
import ImgThumbnail from '../../components/imgThumbnail/ImgThumbnail';
import ImgUploader from '../../components/imgUploader/ImgUploader';
import { getPostDetail, updatePost } from '../../apis/services/community/community';
import { uploadImagesToFirebaseStorage } from '../../util/BasicUtil';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../recoil/atoms/userInfoState';

interface UpdatePostProps {
  route: {
    params: {
      id: number;
    };
  };
}

const Container = styled.View`
  margin-left: ${20 * widthPercent}px;
  margin-right: ${20 * widthPercent}px;
  margin-bottom: ${20 * heightPercent}px;
  row-gap: ${5 * heightPercent}px;
`;

const UpdatePostScreen = (props: UpdatePostProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const userInfo = useRecoilValue(userInfoState);
  const [postData, setPostData] = useState<{
    communityId: number;
    cate: string;
    content: string;
    image1: string;
    image2: string;
    image3: string;
    image4: string;
  }>({
    communityId: 0,
    cate: '',
    content: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
  });
  const [category, setCategory] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [imgUrls, setImgUrls] = useState<string[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const onChangeType = () => {
    alert('분류는 변경할 수 없습니다');
  };
  const Data = [
    { content: '자유', event: onChangeType, active: activeIndex === 0 },
    { content: '꿀팁', event: onChangeType, active: activeIndex === 1 },
    { content: '나눔', event: onChangeType, active: activeIndex === 2 },
    { content: '질문', event: onChangeType, active: activeIndex === 3 },
  ];

  const onSubmit = async () => {
    const newImgUrls = await uploadImagesToFirebaseStorage(imgUrls, `커뮤니티//${userInfo.userId}//${props.route.params.id}`);
    console.log(newImgUrls);
    const params = { communityId: props.route.params.id };
    const data = {
      cate: category,
      content: content,
      image1: newImgUrls[0],
      image2: newImgUrls[1],
      image3: newImgUrls[2],
      image4: newImgUrls[3],
    };
    const response = await updatePost(params, data);
    if (response.dataHeader.successCode == 0) {
      alert('수정되었습니다.');
    }
    navigation.goBack();
  };

  useEffect(() => {
    const getDetail = async () => {
      const response = await getPostDetail({ communityId: props.route.params.id });
      setContent(response.dataBody.communityContent);
      setCategory(response.dataBody.cate);
      switch (response.dataBody.cate) {
        case 'FREEDOM':
          setActiveIndex(0);
          break;
        case 'TIP':
          setActiveIndex(1);
          break;
        case 'SHARE':
          setActiveIndex(2);
          break;
        case 'QUESTION':
          setActiveIndex(3);
          break;
      }
      if (response.dataBody.image1) {
        setImgUrls([...imgUrls, response.dataBody.image1]);
      }
      if (response.dataBody.image2) {
        setImgUrls([...imgUrls, response.dataBody.image1, response.dataBody.image2]);
      }
      if (response.dataBody.image3) {
        setImgUrls([...imgUrls, response.dataBody.image1, response.dataBody.image2, response.dataBody.image3]);
      }
      if (response.dataBody.image4) {
        setImgUrls([...imgUrls, response.dataBody.image1, response.dataBody.image2, response.dataBody.image3, response.dataBody.image4]);
      }
    };

    getDetail();
  }, []);

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
          <MultiLineInputBox value={content} onChangeText={setContent} placeholder={'내용을 작성하세요'} />
        </Container>
        <Container>
          <Typo.BODY4_M>사진</Typo.BODY4_M>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', padding: widthPercent * 10 }}>
            <ImgUploader data={imgUrls} setData={setImgUrls} />
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

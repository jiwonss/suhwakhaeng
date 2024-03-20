import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Color from '../../config/color/Color';
import Header from '../../components/header/Header';
import CustomRadioButton from '../../components/cutomRadioButton/CutomRadioButton';
import { useState } from 'react';
import styled from 'styled-components/native';
import Post from '../../components/post/Post';
import { Spacer } from '../../components/basic/Spacer';
import { heightPercent } from '../../config/dimension/Dimension';
import MarketPost from '../../components/marketPost/MarketPost';
import * as Typo from '../../components/typography/Typography';

const StyledView = styled.View`
  width: 50%;
  margin: 0 auto;
`;

const NoPost = styled.View`
  margin-top: ${heightPercent * 95}px;
  align-items: center;
  flex: 1;
`;

const MyPostScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const Data = [
    { content: '게시글', event: () => setActiveIndex(0), active: activeIndex === 0 },
    { content: '거래', event: () => setActiveIndex(1), active: activeIndex === 1 },
  ];

  const data: string[] = [];
  const data2: string[] = [];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: Color.WHITE }}>
        {activeIndex === 0 ? <Header type='default' firstIcon='back' title='내 글 목록'></Header> : <Header type='default' firstIcon='back' title='관심 상품'></Header>}
        <StyledView>
          <CustomRadioButton data={Data} />
        </StyledView>
        <Spacer space={heightPercent * 10}></Spacer>
        {activeIndex === 0 &&
          (data.length !== 0 ? (
            <Post
              postData={{
                name: '김농민',
                date: '11시간전',
                classification: '자유',
                content: '부직포 벗긴 밭에 풀이 너무 많아 뽑기를 포기하고 "트리부닐"을 살포했습니다. 멸칭이 있어서 제초가 어려워 두둑배 갈라서 멸칭을 제거했습니다.',
                likeNumber: 12,
                commentNumber: 8,
                imgUrl_one: undefined,
                imgUrl_two: undefined,
                imgUrl_three: undefined,
                imgUrl_four: undefined,
              }}
              onPress={function (): void {
                throw new Error('Function not implemented.');
              }}
            ></Post>
          ) : (
            <NoPost>
              <Typo.BODY3_B>아직 작성한 글이 없어요</Typo.BODY3_B>
            </NoPost>
          ))}
        {activeIndex === 1 &&
          (data2.length !== 0 ? (
            <MarketPost title={'햇감자 5000원 팔아요'} price={5000} likeNumber={8}></MarketPost>
          ) : (
            <NoPost>
              <Typo.BODY3_B>관심 상품이 없어요</Typo.BODY3_B>
              <Spacer space={heightPercent * 10}></Spacer>
              <Typo.BODY4_M color={Color.GRAY400}>장터에서 관심가는 상품에 하트를 눌러보세요</Typo.BODY4_M>
            </NoPost>
          ))}
      </View>
    </SafeAreaView>
  );
};

export default MyPostScreen;

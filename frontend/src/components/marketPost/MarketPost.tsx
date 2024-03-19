import styled from 'styled-components/native';
import React, { useState } from 'react';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import ImgThumbnail from '../imgThumbnail/ImgThumbnail';
import { TouchableOpacity, View } from 'react-native';
import Favorite from '../../../assets/icons/favorite.svg';
import FavoriteBorder from '../../../assets/icons/favorite_border.svg';
import { BasicTag } from '../classificationTag/ClassificationTag';
import { getTimeSincePost, addComma } from '../../util/BasicUtil';

const StyledView = styled.TouchableOpacity`
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${Color.GRAY200};
  padding: ${heightPercent * 15}px ${widthPercent * 25}px;
`;

const StyledContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  margin-left: ${widthPercent * 25}px;
`;

const StyledBox = styled.View`
  width: ${widthPercent * 30}px;
  height: ${heightPercent * 15}px;
  background-color: ${Color.GREEN200};
`;

interface MarketPostProps {
  imgUrl?: string;
  classification?: string; // 분류에 적용
  title: string;
  price: number;
  location?: string;
  likeNumber: number;
  date: string;
  onPress: () => void;
  isFavorite: boolean;
}

const MarketPost = (props: MarketPostProps) => {
  // const [isFavorite, setIsFavorite] = useState(false);

  // const toggleFavorite = () => {
  //   setIsFavorite(!isFavorite);
  // };

  // styledBox 는 나중에 고치기 -> 컴포넌트 만들어지면 추가
  return (
    <StyledView onPress={props.onPress}>
      <ImgThumbnail url={props.imgUrl} width={80} height={80}></ImgThumbnail>
      <StyledContainer>
        <BasicTag>
          <Typo.Detail1_M color={Color.WHITE}>{props.classification}</Typo.Detail1_M>
        </BasicTag>
        <Typo.BODY3_M>{props.title}</Typo.BODY3_M>
        <Typo.BODY4_M>{addComma(props.price)}원</Typo.BODY4_M>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typo.Detail1_M color={Color.GRAY400}>
            {props.location} · {getTimeSincePost(props.date)}
          </Typo.Detail1_M>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: widthPercent * 5 }}>
            {props.isFavorite ? <Favorite width={widthPercent * 12} height={heightPercent * 12} /> : <FavoriteBorder width={widthPercent * 12} height={heightPercent * 12} />}
            <Typo.Detail1_M color={Color.GRAY400}>{props.likeNumber}</Typo.Detail1_M>
          </View>
        </View>
      </StyledContainer>
    </StyledView>
  );
};

export default MarketPost;

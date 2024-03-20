import styled from 'styled-components/native';
import React from 'react';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import ImgThumbnail from '../imgThumbnail/ImgThumbnail';
import { Spacer } from '../basic/Spacer';
import * as ImagePicker from 'expo-image-picker';
import { Alert, ScrollView } from 'react-native';
import Xbutton from '../../../assets/icons/xButton.svg';
import { storage } from '@react-native-firebase/storage';

const Container = styled.View`
  width: ${widthPercent * 70}px;
  height: ${heightPercent * 70}px;
  position: relative;
`;

const StyledView = styled.TouchableOpacity`
  width: ${widthPercent * 70}px; /* 이미지 컨테이너의 너비 */
  height: ${heightPercent * 70}px; /* 이미지 컨테이너의 높이 */
  border: 0px solid ${Color.GRAY400};
  border-radius: ${widthPercent * 10}px;
  background-color: ${Color.GRAY200};
  overflow: hidden; /* borderRadius를 적용하기 위해 overflow를 hidden으로 설정 */
  justify-content: center;
  align-items: center;
`;

const RemoveButton = styled.TouchableOpacity`
  position: absolute;
  z-index: 1;
  right: ${widthPercent * -5}px;
  top: ${widthPercent * -5}px;
  width: ${widthPercent * 15}px;
  height: ${heightPercent * 15}px;
`;

interface ImgUploaderProps {
  data: string[];
  setData: any;
}

const ImgUploader = ({ data, setData }: ImgUploaderProps) => {
  const handleAddPress = async () => {
    if (data.length >= 4) {
      Alert.alert(
        '알림',
        '이미지는 최대 4개까지만 추가할 수 있습니다.',
        [{ text: '확인', onPress: () => console.log('확인') }]
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      // assets 속성이 없는 경우 result.uri 직접 사용
      const newImageUrl = result.assets[0].uri;
      console.log(newImageUrl);

      // 이미지가 선택되었을 경우에만 추가
      setData([...data, newImageUrl]);
      console.log(data);
    }
  };

  const handleRemovePress = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  return (
    <ScrollView contentContainerStyle={{ height: heightPercent * 80, alignItems: 'center', paddingRight: widthPercent * 10 }} horizontal showsHorizontalScrollIndicator={false}>
      <StyledView onPress={handleAddPress}>
        <Typo.BODY0_M color={Color.BLACK}>+</Typo.BODY0_M>
      </StyledView>
      {data.map((url, index) => (
        <>
          <Spacer horizontal space={widthPercent * 10}></Spacer>
          <Container>
            <ImgThumbnail url={url} width={70} height={70}></ImgThumbnail>
            <RemoveButton onPress={() => handleRemovePress(index)}>
              <Xbutton width={widthPercent * 15} height={heightPercent * 15} />
            </RemoveButton>
          </Container>
        </>
      ))}
    </ScrollView>
  );
};

export default ImgUploader;

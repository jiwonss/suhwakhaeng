import { PopupModal, SlideModal } from '../../components/modal/Modal';
import styled from 'styled-components/native';
import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import { View } from 'react-native';
import { Spacer } from '../../components/basic/Spacer';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { BasicButton } from '../../components/button/Buttons';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { uploadImagesToFirebaseStorage } from '../../util/BasicUtil';
import { registBusinessCert } from '../../apis/services/user/user';

interface NotBusinessModalProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClickCertButton: () => void;
}

// styled component
const Container = styled.View`
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: ${heightPercent * 14}px;
`;

const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  column-gap: ${widthPercent * 10}px;
`;

export const NotBusinessModal = (props: NotBusinessModalProps) => {
  return (
    <PopupModal isVisible={props.isVisible} setIsVisible={props.setIsVisible}>
      <Container>
        <Typo.BODY3_M>판매글 등록은 사업자 등록 후 가능해요</Typo.BODY3_M>
        <Spacer space={heightPercent * 4} />
        <Typo.Detail1_M color={Color.GRAY500}>신뢰 있는 장터를 만들어 가기 위해, 인증된 사업자만 작성할 수 있어요.</Typo.Detail1_M>
      </Container>
      <ButtonContainer>
        <BasicButton onPress={() => props.setIsVisible(false)} borderColor={Color.GRAY200} backgroundColor={Color.GRAY200} borderRadius={10} width={widthPercent * 100}>
          <Typo.BODY4_M>취소</Typo.BODY4_M>
        </BasicButton>
        <BasicButton
          onPress={() => {
            props.setIsVisible(false);
            props.onClickCertButton();
          }}
          borderColor={Color.GREEN500}
          backgroundColor={Color.GREEN500}
          borderRadius={10}
          width={widthPercent * 100}
        >
          <Typo.BODY4_M color={Color.WHITE}>사업자 등록</Typo.BODY4_M>
        </BasicButton>
      </ButtonContainer>
    </PopupModal>
  );
};

interface RegistBusinessModal {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
}

export const RegistBusinessModal = (props: RegistBusinessModal) => {
  const [imgUrl, setImgUrl] = useState<string>('');

  const uploadBusinessImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      // assets 속성이 없는 경우 result.uri 직접 사용
      const newImageUrl = result.assets[0].uri;

      // 이미지가 선택되었을 경우에만 추가
      setImgUrl(newImageUrl);
    }

    const imageUrls: string[] = [imgUrl];
    const newImageUrls = await uploadImagesToFirebaseStorage(imageUrls, `사업자등록//${props.userId}`);

    props.setIsVisible(false);

    if (newImageUrls) {
      const response = await registBusinessCert({ businessImage: newImageUrls[0] });
      if (response.dataHeader.successCode === 0) {
        alert('성공적으로 업로드 되었습니다.\n관리자 승인까지 기다려주세요.');
      }
    }
  };

  return (
    <SlideModal isVisible={props.isVisible} setIsVisible={props.setIsVisible}>
      <BasicButton onPress={uploadBusinessImage} width={widthPercent * 300} height={heightPercent * 45} borderColor={Color.GREEN500} borderRadius={10}>
        <Typo.BODY3_M color={Color.WHITE}>사업자 등록증 업로드</Typo.BODY3_M>
      </BasicButton>
      <Spacer space={heightPercent * 10} />
      <BasicButton
        onPress={() => {
          props.setIsVisible(false);
        }}
        width={widthPercent * 300}
        height={heightPercent * 45}
        borderColor={Color.GREEN500}
        borderRadius={10}
        backgroundColor={Color.WHITE}
      >
        <Typo.BODY3_M color={Color.GREEN500}>취소</Typo.BODY3_M>
      </BasicButton>
    </SlideModal>
  );
};

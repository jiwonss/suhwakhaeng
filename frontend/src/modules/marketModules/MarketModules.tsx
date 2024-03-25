import { PopupModal } from '../../components/modal/Modal';
import styled from 'styled-components/native';
import * as Typo from '../../components/typography/Typography';
import * as Color from '../../config/color/Color';
import { View } from 'react-native';
import { Spacer } from '../../components/basic/Spacer';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { BasicButton } from '../../components/button/Buttons';

interface NotBusinessModalProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClickCert?: () => void;
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
        <BasicButton onPress={() => props.onClickCert} borderColor={Color.GREEN500} backgroundColor={Color.GREEN500} borderRadius={10} width={widthPercent * 100}>
          <Typo.BODY4_M color={Color.WHITE}>사업자 등록</Typo.BODY4_M>
        </BasicButton>
      </ButtonContainer>
    </PopupModal>
  );
};

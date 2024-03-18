import { Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import * as Color from '../../config/color/Color';
import styled from 'styled-components/native';

interface ModalProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const PopupContainer = styled.View`
  width: ${widthPercent * 300}px;
  padding: ${widthPercent * 20}px;
  background-color: ${Color.WHITE};
  border-radius: 10px;
`;

const PopupDimmer = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(128, 128, 128, 0.2);
`;

export const PopupModal = (props: ModalProps) => {
  return (
    <Modal animationType='fade' transparent={true} visible={props.isVisible}>
      <>
        <PopupDimmer
          onPress={() => {
            props.setIsVisible(false);
          }}
        >
          <TouchableWithoutFeedback>
            <PopupContainer>
              <TouchableOpacity
                onPress={() => {
                  props.setIsVisible(false);
                }}
              />
              {props.children}
            </PopupContainer>
          </TouchableWithoutFeedback>
        </PopupDimmer>
      </>
    </Modal>
  );
};

const SlideDimmer = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: cetner;
`;

const SlideContainer = styled.View`
  width: 100%;
  background-color: ${Color.WHITE};
  position: absolute;
  bottom: 0;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  display: flex;
  align-items: center;
  padding: ${widthPercent * 10}px;
`;

const SlideBar = styled.View`
  margin-top: ${heightPercent * 12}px;
  margin-bottom: ${heightPercent * 12}px;
  width: ${widthPercent * 40}px;
  border-bottom-width: ${widthPercent * 4}px;
  border-radius: 4px;
  border-color: ${Color.GRAY300};
`;

export const SlideModal = (props: ModalProps) => {
  return (
    <Modal animationType='slide' transparent={true} visible={props.isVisible}>
      <SlideDimmer onPress={() => props.setIsVisible(false)} />
      <SlideContainer>
        <SlideBar />
        {props.children}
      </SlideContainer>
    </Modal>
  );
};

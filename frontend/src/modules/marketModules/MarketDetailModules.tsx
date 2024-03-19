import React from 'react';
import { SlideModal } from '../../components/modal/Modal';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import { BasicButton } from '../../components/button/Buttons';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { Spacer } from '../../components/basic/Spacer';

interface MoreModalProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: (postId: number) => void;
  onModify: (postId: number) => void;
  postId: number;
}

export const MoreModal = (props: MoreModalProps) => {
  return (
    <SlideModal isVisible={props.isVisible} setIsVisible={props.setIsVisible}>
      <BasicButton
        onPress={() => props.onModify(props.postId)}
        width={widthPercent * 300}
        height={heightPercent * 45}
        borderColor={Color.GREEN500}
        borderRadius={10}
        backgroundColor={Color.WHITE}
      >
        <Typo.BODY3_M color={Color.GREEN500}>수정하기</Typo.BODY3_M>
      </BasicButton>
      <Spacer space={heightPercent * 10} />
      <BasicButton onPress={() => props.onDelete(props.postId)} width={widthPercent * 300} height={heightPercent * 45} borderColor={Color.GREEN500} borderRadius={10}>
        <Typo.BODY3_M color={Color.WHITE}>삭제하기</Typo.BODY3_M>
      </BasicButton>
    </SlideModal>
  );
};

import * as React from 'react';
import LikeActive from '../../../assets/icons/likeActive.svg';
import LikeDefault from '../../../assets/icons/likeDefault.svg';
import { LikeButtonStyle } from './ButtonStyle';
import { TouchableOpacity, View } from 'react-native';

interface SvgComponentProps {
  onPress: () => void;
}

const LikeButton = () => {
  const [isActive, setIsActive] = React.useState(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  // 좋아요 활성화
  const LikeActiveComponent: React.FC<SvgComponentProps> = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={{ alignItems: 'center', justifyContent: 'center' }}>
      <LikeActive width='46' height='46' />
    </TouchableOpacity>
  );

  // 좋아요 비활성화
  const LikeDefaultComponent: React.FC<SvgComponentProps> = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={{ alignItems: 'center', justifyContent: 'center' }}>
      <LikeDefault width='46' height='46' />
    </TouchableOpacity>
  );

  return (
    <LikeButtonStyle>
      <View style={{ width: 46, height: 46, alignItems: 'center', justifyContent: 'center' }}>
        {isActive ? <LikeActiveComponent onPress={toggleActive} /> : <LikeDefaultComponent onPress={toggleActive} />}
      </View>
    </LikeButtonStyle>
  );
};

export default LikeButton;

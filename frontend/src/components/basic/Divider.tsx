import { View } from 'react-native';
import * as Color from '../../config/color/Color';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';

interface DividerProps {
  borderWidth?: number;
  marginHorizontal?: number;
  borderColor?: string;
}

/**
 * view와 같은 컴포넌트를 구분짓는 divider입니다.
 * @returns
 * @author 김수린
 */
export const Divider = (props: DividerProps) => {
  return (
    <View
      style={{
        alignSelf: 'stretch',
        borderWidth: heightPercent * (props.borderWidth || 0.5),
        marginHorizontal: widthPercent * (props.marginHorizontal || 10),
        borderColor: Color.GRAY300,
      }}
    />
  );
};

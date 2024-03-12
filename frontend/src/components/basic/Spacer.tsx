import { DimensionValue, View } from 'react-native';

interface SpaceProps {
  space: DimensionValue;
  horizontal?: boolean;
}

/**
 * View의 margin을 선언한 컴포넌트입니다. 좀 더 편한 space를 위합니다.
 * @param props
 * @returns
 * @author 김수린
 */
export const Spacer = (props: SpaceProps) => {
  if (props.horizontal) {
    return <View style={{ marginLeft: props.space }} />;
  }

  return <View style={{ marginTop: props.space }} />;
};

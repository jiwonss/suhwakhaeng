import { Image, ImageResizeMode, ImageSourcePropType, ImageStyle, StyleProp, View } from 'react-native';

interface UriImageProps {
  uri: string;
  style?: StyleProp<ImageStyle>;
  resizeMode?: ImageResizeMode;
}

interface LocalImageProps {
  source: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
  resizeMode?: ImageResizeMode;
}

/**
 * uri로 이미지를 가져오는 로더입니다.
 * @param props
 * - uri는 uri주소가 들어와야합니다.
 * - style로 width, height를 지정해야합니다.
 * @returns
 * @author 김수린
 */
export const UriImageLoader = (props: UriImageProps) => {
  return (
    <View>
      <Image source={{ uri: props.uri } as ImageSourcePropType} style={props.style} resizeMode={props.resizeMode} />
    </View>
  );
};

/**
 * 로컬에 있는 이미지를 가져오는 로더입니다.
 * @param props
 * - source는 require('path')가 들어와야합니다.
 * @returns
 * @author 김수린
 */
export const LocalImageLoader = (props: LocalImageProps) => {
  return (
    <View>
      <Image source={props.source} style={props.style} resizeMode={props.resizeMode} />
    </View>
  );
};

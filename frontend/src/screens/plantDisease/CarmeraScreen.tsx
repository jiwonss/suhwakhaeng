import React, { useEffect } from 'react';
import { View, Image, Alert } from 'react-native';
import { launchCamera, CameraOptions, MediaType } from 'react-native-image-picker';
import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';
import { useRoute } from '@react-navigation/core';

const CameraScreen = () => {
  const [photo, setPhoto] = React.useState<{ uri: string } | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'CameraScreen'>>();
  const { value } = route.params;

  useEffect(() => {
    const options: CameraOptions = {
      saveToPhotos: true,
      mediaType: 'photo' as MediaType,
    };

    launchCamera(options, (response) => {
      // 사용자가 카메라 UI에서 취소 버튼을 눌렀을 경우.
      if (response.didCancel) {
        console.log('User cancelled image picker');
        navigation.goBack();
      }
      // 카메라 사용 중 에러가 발생한 경우
      else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
        Alert.alert('Error', 'There was an error opening the camera');
      }
      // 카메라에서 사진을 성공적으로 촬영했고, 그 사진의 URI가 존재할 경우
      else if (response.assets && response.assets.length > 0 && response.assets[0].uri) {
        const source = { uri: response.assets[0].uri };
        console.log(source); // {"uri": "file:///data/user/0/com.suhwakhaeng/cache/rn_image_picker_lib_temp_bd2f65b0-b754-4627-a227-39393f76db41.jpg"}
        if (value == 1) {
          navigation.navigate('DetailDiseasePlantScreen', { photo: source });
        }
      }
    });
  }, [navigation]);

  // const sendImageToServer = (base64Image) => {
  //   axios
  //     .post('http://localhost:8080/crop/disease', {
  //       image: base64Image,
  //     })
  //     .then((response) => {
  //       console.log('Image uploaded successfully', response.data);
  //       // 성공적으로 업로드되었다는 메시지를 표시하거나 다른 처리를 수행합니다.
  //     })
  //     .catch((error) => {
  //       console.error('Error uploading image', error);
  //       // 에러 처리
  //     });
  // };

  return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>{photo && <Image source={photo} style={{ width: 300, height: 300 }} />}</View>;
};

export default CameraScreen;

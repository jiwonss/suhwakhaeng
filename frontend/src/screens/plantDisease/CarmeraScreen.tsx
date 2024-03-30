import React, { useEffect } from 'react';
import { Alert, Image, View } from 'react-native';
import { CameraOptions, launchCamera, MediaType } from 'react-native-image-picker';
import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';
import { useRoute } from '@react-navigation/core';
import { sendPlantDiseaseImage } from '../../apis/services/diagnosis/PlantDisease';
import { uploadImagesToFirebaseStorage } from '../../util/BasicUtil';

const CameraScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'CameraScreen'>>();
  const [photo, setPhoto] = React.useState<{ uri: string } | null>(null);
  const { value } = route.params;

  useEffect(() => {
    const options: CameraOptions = {
      saveToPhotos: true,
      mediaType: 'photo' as MediaType,
    };

    launchCamera(options, async (response) => {
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
      // 카메라에서 사진을 성공적으로 촬영했고, 그 사진의 URI가 존재하면서 value가 1일 경우
      else if (response.assets && response.assets.length > 0 && response.assets[0].uri && value == 1) {
        try {
          const screenName = 'diseasePlant';
          const imageUri = response.assets[0].uri;
          const imageUrls = [imageUri]; // 파이어베이스에 업로드할 이미지 URI 배열
          setPhoto({ uri: imageUri }); // 여기서 setPhoto를 사용하여 photo 상태를 업데이트


          // 이미지를 파이어베이스 스토리지에 업로드하고 다운로드 URL get
          const downloadUrls = await uploadImagesToFirebaseStorage(imageUrls, screenName);
          if (downloadUrls.length > 0) {
            const firebaseUrl = downloadUrls[0];
            console.log('Firebase URL:', firebaseUrl);

            // 업로드된 이미지의 URL을 사용하여 질병 진단 API 호출
            const diagnosisResult = await sendPlantDiseaseImage(firebaseUrl);
            console.log('Diagnosis result:', diagnosisResult);

            // 결과 화면으로 네비게이션
            navigation.navigate('DetailDiseasePlantScreen', { photo: { uri: firebaseUrl }, diagnosisResult });
          }
        } catch (error) {
          console.error(error);
          Alert.alert('Error', '에러발생');
        }
      }
    });
  }, [navigation, value]);

  return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>{photo &&
    <Image source={photo} style={{ width: 300, height: 300 }} />}</View>;
};

export default CameraScreen;

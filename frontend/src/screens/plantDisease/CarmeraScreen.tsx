// react-native-vision-camera 버전
import React, { useEffect, useRef, useState } from 'react';
import { Alert, View } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';
import { sendPlantDiseaseImage } from '../../apis/services/diagnosis/PlantDisease';
import { uploadImagesToFirebaseStorage } from '../../util/BasicUtil';
import { BasicButton } from '../../components/button/Buttons';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import Spinner from '../../components/spinner/Spinner';

const CameraScreen = () => {
  // 상태 및 참조 초기화
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  const [photo, setPhoto] = useState<{ uri: string } | null>(null);
  const cameraRef = useRef<Camera>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isLoading, setIsLoading] = useState(false); // 진단 결과 로딩 상태 관리

  // 카메라 권한 요청
  useEffect(() => {
    (async () => {
      if (!hasPermission) {
        const permissionResult = await requestPermission();
        if (!permissionResult) {
          Alert.alert('카메라 권한 요청', '앱에서 카메라를 사용하기 위해서는 권한이 필요합니다.');
        }
      }
    })();
  }, [hasPermission, requestPermission]);

  // 사진 촬영
  const takePhoto = async () => {
    if (!device || !cameraRef.current) return;
    setIsLoading(true); // 사진 촬영 시작 시 로딩 상태 활성화

    try {
      const capturedPhoto = await cameraRef.current.takePhoto();
      const imageUri = `file://${capturedPhoto.path}`;
      setPhoto({ uri: imageUri });

      // 파이어베이스 스토리지에 사진 업로드
      const screenName = 'diseasePlant';
      const imageUrls = [imageUri];
      const downloadUrls = await uploadImagesToFirebaseStorage(imageUrls, screenName);
      if (downloadUrls.length > 0) {
        const firebaseUrl = downloadUrls[0];
        console.log('Firebase URL:', firebaseUrl);

        // 업로드된 이미지 URL로 질병 진단 API 호출
        const diagnosisResult = await sendPlantDiseaseImage(firebaseUrl, navigation);
        console.log('진단 결과1:', diagnosisResult);
      }
    } catch (error) {
      console.error(error);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      Alert.alert('Error', '에러 발생: ' + error.message);
    }
  };

  const renderLoadingLayer = () => (
    <View style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2, // 확실히 화면 위에 표시되도록 z-index 설정
    }}>
      <Spinner size="large" color={Color.GREEN600}>
        <Typo.BODY2_M color={Color.WHITE}>작물의 건강을 체크 중입니다...</Typo.BODY2_M>
      </Spinner>
    </View>
  );


  return (
    <View style={{ flex: 1 }}>
      {device && (
        <Camera
          ref={cameraRef}
          style={{ flex: 1 }}
          device={device}
          isActive={true}
          photo={true}
        />
      )}
      <BasicButton onPress={takePhoto} borderColor={Color.WHITE} borderRadius={50}>
        <Typo.BODY4_M>촬영</Typo.BODY4_M>
      </BasicButton>
      {isLoading && renderLoadingLayer()}
    </View>
  );
};

export default CameraScreen;


// // react-native-image-picker 버전
// import React, { useEffect } from 'react';
// import { Alert, Image, View } from 'react-native';
// import { CameraOptions, launchCamera, MediaType } from 'react-native-image-picker';
// import { NavigationProp, useNavigation } from '@react-navigation/native';
// import { RootStackParamList } from '../../stacks/mainStack/MainStack';
// import { sendPlantDiseaseImage } from '../../apis/services/diagnosis/PlantDisease';
// import { uploadImagesToFirebaseStorage } from '../../util/BasicUtil';
//
// const CameraScreen = () => {
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();
//   const [photo, setPhoto] = React.useState<{ uri: string } | null>(null);
//
//   useEffect(() => {
//     const options: CameraOptions = {
//       saveToPhotos: true,
//       mediaType: 'photo' as MediaType,
//     };
//
//     launchCamera(options, async (response) => {
//       // 사용자가 카메라 UI에서 취소 버튼을 눌렀을 경우.
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//         navigation.goBack();
//       }
//       // 카메라 사용 중 에러가 발생한 경우
//       else if (response.errorMessage) {
//         console.log('ImagePicker Error: ', response.errorMessage);
//         Alert.alert('Error', 'There was an error opening the camera');
//       }
//       // 카메라에서 사진을 성공적으로 촬영했고, 그 사진의 URI가 존재하는 경우
//       else if (response.assets && response.assets.length > 0 && response.assets[0].uri) {
//         try {
//           const screenName = 'diseasePlant';
//           const imageUri = response.assets[0].uri;
//           const imageUrls = [imageUri]; // 파이어베이스에 업로드할 이미지 URI 배열
//           setPhoto({ uri: imageUri }); // 여기서 setPhoto를 사용하여 photo 상태를 업데이트
//
//
//           // 이미지를 파이어베이스 스토리지에 업로드하고 다운로드 URL get
//           const downloadUrls = await uploadImagesToFirebaseStorage(imageUrls, screenName);
//           if (downloadUrls.length > 0) {
//             const firebaseUrl = downloadUrls[0];
//             console.log('Firebase URL:', firebaseUrl);
//
//             // 업로드된 이미지의 URL을 사용하여 질병 진단 API 호출
//             const diagnosisResult = await sendPlantDiseaseImage(firebaseUrl);
//             console.log('Diagnosis result:', diagnosisResult);
//
//             // 결과 화면으로 네비게이션
//             navigation.navigate('DetailDiseasePlantScreen', { photo: { uri: firebaseUrl }, diagnosisResult });
//           }
//         } catch (error) {
//           console.error(error);
//           Alert.alert('Error', '에러발생');
//         }
//       }
//     });
//   }, [navigation]);
//
//   return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>{photo &&
//     <Image source={photo} style={{ width: 300, height: 300 }} />}</View>;
// };
//
// export default CameraScreen;

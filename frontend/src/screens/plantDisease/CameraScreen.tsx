import React, { useCallback, useEffect, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { CameraOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../stacks/mainStack/MainStack';
import { sendPlantDiseaseImage } from '../../apis/services/diagnosis/PlantDisease';
import { uploadImagesToFirebaseStorage } from '../../util/BasicUtil';
import * as Color from '../../config/color/Color';
import * as Typo from '../../components/typography/Typography';
import Spinner from '../../components/spinner/Spinner';
import MenuButton from '../../components/menuButton/MenuButton';
import Gallery from '../../../assets/icons/gallery.svg';
import { heightPercent, widthPercent } from '../../config/dimension/Dimension';
import { Spacer } from '../../components/basic/Spacer';
import Camera from '../../../assets/icons/camera_color.svg';
import styled from 'styled-components/native';
import Header from '../../components/header/Header';

const Container = styled.View`
  margin-left: ${20 * widthPercent}px;
  margin-right: ${20 * widthPercent}px;
  margin-bottom: ${20 * heightPercent}px;
  row-gap: ${5 * heightPercent}px;
`;
const ImageContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: ${5 * heightPercent}px;
  margin-bottom: ${20 * heightPercent}px;
`;

const CameraScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [photo, setPhoto] = useState<{ uri: string } | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ uri: string } | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(false);
      setSelectedImage(null);
    }, [])
  );

  // 카메라 및 저장소 접근 권한 요청
  const requestPermissions = async () => {
    await request(PERMISSIONS.ANDROID.CAMERA);
    await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
  };

  // 컴포넌트가 마운트될 때 권한 요청
  useEffect(() => {
    (async () => {
      const cameraPermissionStatus = await request(PERMISSIONS.ANDROID.CAMERA);
      const storagePermissionStatus = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

      // 권한이 허용되지 않았다면, 사용자에게 권한 요청 다시 요청
      if (cameraPermissionStatus !== RESULTS.GRANTED || storagePermissionStatus !== RESULTS.GRANTED) {
        await requestPermissions();
      }
    })();
  }, []);

  // 카메라로 사진을 찍거나 갤러리에서 사진 선택하는 함수
  const handleImagePick = async (useCamera: boolean) => {
    setIsLoading(true);

    const options: CameraOptions = {
      saveToPhotos: true,
      mediaType: 'photo',
    };

    // 카메라 또는 갤러리를 통해 사진을 선택
    const result = useCamera ? await launchCamera(options) : await launchImageLibrary(options);

    if (result.didCancel) {
      console.log('User cancelled image picker');
      setIsLoading(false);
    } else if (result.errorMessage) {
      console.log('ImagePicker Error: ', result.errorMessage);
      setIsLoading(false);
    } else if (result.assets && result.assets.length > 0 && result.assets[0].uri) {
      const imageUri = result.assets[0].uri;
      setPhoto({ uri: imageUri }); // 사진 상태 업데이트
      setIsLoading(false);

      // 파이어베이스에 업로드할 이미지 URI 배열을 생성
      const imageUrls = [imageUri];

      try {
        setIsLoading(true);
        // 이미지를 파이어베이스 스토리지에 업로드하고 다운로드 URL get
        const downloadUrls = await uploadImagesToFirebaseStorage(imageUrls, 'diseasePlant');
        if (downloadUrls.length > 0) {
          const firebaseUrl = downloadUrls[0];
          console.log('Firebase URL:', firebaseUrl);

          // 업로드된 이미지의 URL을 사용하여 질병 진단 API를호출
          const diagnosisResult = await sendPlantDiseaseImage(firebaseUrl, navigation);
          console.log('Diagnosis result:', diagnosisResult);
        }
      } catch (error) {
        console.error('ㅇㅇㄴㅁ', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const renderLoadingLayer = () => (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: Color.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
      }}
    >
      <Spinner size='large' color={Color.GREEN600}>
        <Typo.BODY2_M color={Color.BLACK}>작물의 건강을 체크 중입니다...</Typo.BODY2_M>
      </Spinner>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Header type={'default'} title={'작물 병원'} firstIcon={'back'} onPressFirstIcon={navigation.goBack} />
        <Container>
          <Typo.BODY1_M>
            <Typo.BODY1_M color={Color.GREEN600}>작물 진단</Typo.BODY1_M> 결과는 아래와 같이 확인 할 수있어요.
          </Typo.BODY1_M>
          <ImageContainer>
            <Image source={selectedImage ? { uri: selectedImage.uri } : require('../../../assets/imgs/diagnosisExample.png')} />
          </ImageContainer>
        </Container>
        <Container>
          <Typo.BODY1_M>
            <Typo.BODY1_M color={Color.GREEN600}>작물 진단</Typo.BODY1_M>을 위한 방법을 선택 해주세요
          </Typo.BODY1_M>
        </Container>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <MenuButton size='big' title='카메라로 진단' borderColor={Color.GREEN50} onPressButton={() => handleImagePick(true)}>
            <Camera width={widthPercent * 40} height={heightPercent * 40} />
          </MenuButton>
          <Spacer horizontal={true} space={40} />
          <MenuButton size='big' title='사진으로 진단' onPressButton={() => handleImagePick(false)}>
            <Gallery width={widthPercent * 40} height={heightPercent * 40} />
          </MenuButton>
        </View>
        <Spacer space={40} />
      </ScrollView>
      {isLoading && renderLoadingLayer()}
    </View>
  );
};
export default CameraScreen;

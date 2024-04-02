import aiInstance from '../../utils/aiInstance';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../stacks/mainStack/MainStack';
import { Alert } from 'react-native';

// 사진 URL을 서버로 전송하는 함수
export const sendPlantDiseaseImage = async (imageUrl: string, navigation: NavigationProp<RootStackParamList>) => {

  try {
    console.log('이미지 주소:', imageUrl);
    const response = await aiInstance.post('crop/disease', {
      image: imageUrl,
    });
    if (response?.data) {
      console.log('반환값:', response.data);
      navigation.navigate('DetailDiseasePlantScreen', { photo: { uri: imageUrl }, diagnosisResult: response.data });

    } else {
      Alert.alert('작물진단 실패', '해당 사진을 인식할 수 없습니다. 다른 사진을 시도해보세요.');
      navigation.navigate('DiseasePlantScreen');
    }
  } catch (error) {
    console.error('API 호출 중 에러 발생:', error);
  }
};

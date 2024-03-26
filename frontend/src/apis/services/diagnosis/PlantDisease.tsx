import instance from '../../utils/basicInstance';

// 사진 URL을 서버로 전송하는 함수
export const sendPlantDiseaseImage = async (imageUrl: string) => {
  const response = await instance.post('crop/disease', {
    image: imageUrl, // image 필드에 직접 URL 문자열을 전송
  });
  return response.data;
};

// import instance from '../../utils/basicInstance';
import tokenInstance from '../../utils/tokenInstance';

interface MyCropsResponse {
  dataHeader: {
    successCode: number;
    resultCode: null | number;
    resultMessage: null | string;
  };
  dataBody: Array<{
    myCropsId: number;
    myCropsName: string;
    cropsName: string;
    cropsVarietyName: string;
    location: {
      sido: string;
      gugun: string;
      dong: string;
    };
  }>;
}

//작물 목록 조회
export const getCropsData = async () => {
  const response = await tokenInstance.get('common/crops');
  return response.data;
};

// 작물에 대한 품종 목록 조회
export const getCropVarieties = async (cropId: number) => {
  const response = await tokenInstance.get(`common/crops/${cropId}/variety`);
  return response.data;
};

// 내 작물 정보 등록
export const postMyCropInfo = async (cropInfo: {
  area: number;
  areaUnit: string;
  yield: number;
  cropsVarietyId: number | undefined;
  name: string;
  location: { gugun: string | undefined; sido: string | undefined; dong: string | undefined };
}) => {
  const response = await tokenInstance.post('common/my-crops', cropInfo);
  return response.data;
};

// 내 작물 리스트 조회
export const getMyCropListInfo = async (): Promise<MyCropsResponse> => {
  const response = await tokenInstance.get('common/my-crops');
  return response.data;
};

// 내 작물 삭제
export const deleteMyCropInfo = async (myCropsId: number) => {
  const response = await tokenInstance.delete(`common/my-crops/${myCropsId}`);
  return response.data;
};

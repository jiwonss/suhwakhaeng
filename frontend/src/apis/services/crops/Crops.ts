// import instance from '../../utils/basicInstance';
import tokenInstance from '../../utils/tokenInstance';

interface PatchMyCropInfoType {
  area: number;
  name: string;
  areaUnit: string;
  yield: number;
  location?: {
    sido?: string;
    gugun?: string;
    dong?: string;
  };
}

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

// 품종별 작물 상세 정보 조회
export const getCropVarietyInfo = async (cropsId: number, cropsVarietyId: number) => {
  console.log('들어왔냐?', cropsId, cropsVarietyId);
  const response = await tokenInstance.get(`common/crops/${cropsId}/variety/${cropsVarietyId}`);
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

// 내 특정 작물 상세 조회
export const getMyCropInfo = async (myCropsId: number) => {
  const response = await tokenInstance.get(`/common/my-crops/${myCropsId}`);
  return response.data;
};

// 내 특정 작물 수정
export const patchMyCropInfo = async (myCropsId: number, updateData: PatchMyCropInfoType) => {
  const response = await tokenInstance.patch(`/common/my-crops/${myCropsId}`, updateData);
  return response.data;
};

// 내 작물 삭제
export const deleteMyCropInfo = async (myCropsId: number) => {
  const response = await tokenInstance.delete(`common/my-crops/${myCropsId}`);
  return response.data;
};

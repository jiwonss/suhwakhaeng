// import instance from '../../utils/basicInstance';
import tokenInstance from '../../utils/tokenInstance';

export const getCropsData = async () => {
  const response = await tokenInstance.get('common/crops');
  return response.data;
};

export const getCropVarieties = async (cropId: number) => {
  const response = await tokenInstance.get(`common/crops/${cropId}/variety`);
  return response.data;
};

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

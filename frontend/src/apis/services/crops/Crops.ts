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

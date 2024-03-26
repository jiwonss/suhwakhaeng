import instance from '../../utils/basicInstance';

export const fetchCropsData = async () => {
  const response = await instance.get('common/crops');
  return response.data;
};

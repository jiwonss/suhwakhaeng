import tokenInstance from '../../utils/tokenInstance';

export const getBusiness = async (params: { lastId: number }) => {
  const response = await tokenInstance.get('common/admin/business', { params: params });
  return response.data;
};

export const allowBusiness = async (businessId: number) => {
  const response = await tokenInstance.patch(`/common/admin/business/${businessId}`);
  return response.data;
};


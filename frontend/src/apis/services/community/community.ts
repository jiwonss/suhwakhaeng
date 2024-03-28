import tokenInstance from '../../utils/tokenInstance';

const communityUrl = 'common/community';

export const getPostList = async (params: { id: number; keyword: string; cate: string }) => {
  const response = await tokenInstance.get(`${communityUrl}?keyword=${params.keyword}&cate=${params.cate}&id=${params.id}`);
  return response.data;
};

export const registPost = async (params: { cate: string; content: string; image1?: string; image2?: string; image3?: string; image4?: string }) => {
  const response = await tokenInstance.post(`${communityUrl}`, params);
  return response.data;
};

export const getPostDetail = async (params: { communityId: number }) => {
  const response = await tokenInstance.get(`${communityUrl}/${params.communityId}`);
  return response.data;
};

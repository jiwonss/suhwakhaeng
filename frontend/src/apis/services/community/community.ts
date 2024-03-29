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

export const getMyPostList = async (params: { lastId: number }) => {
  const response = await tokenInstance.get(`${communityUrl}/my/list?lastId=${params.lastId}`);
  return response.data;
};

export const updateIsLiked = async (params: { communityId: number }) => {
  const response = await tokenInstance.post(`${communityUrl}/like/${params.communityId}`);
  return response.data;
};

export const deleteIsLiked = async (params: { communityId: number }) => {
  const response = await tokenInstance.delete(`${communityUrl}/like/${params.communityId}`);
  return response.data;
};

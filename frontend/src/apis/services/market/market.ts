import tokenInstance from '../../utils/tokenInstance';

const marketUrl = 'common/trades';

export const getMarketPostList = async (params: { tradeId: number; keyword: string; cate: string }) => {
  const response = await tokenInstance.get(`${marketUrl}/list?tradeId=${params.tradeId}&keyword=${params.keyword}&cate=${params.cate}`);
  return response.data;
};

export const registMarketPost = async (params: {
  cate: string;
  title: string;
  price: number;
  content: string;
  image1?: string;
  image2?: string;
  image3?: string;
  image4?: string;
  x?: string;
  y?: string;
  roadNameAddress?: string;
}) => {
  const response = await tokenInstance.post(`${marketUrl}`, params);
  return response.data;
};

export const getMarketPostDetail = async (params: { tradeId: number }) => {
  const response = await tokenInstance.get(`${marketUrl}/${params.tradeId}`);
  return response.data;
};

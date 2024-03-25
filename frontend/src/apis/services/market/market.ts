import tokenInstance from '../../utils/tokenInstance';

const marketUrl = 'common/trades';

export const getMarketPostList = async (params: { tradeId: number; keyword: string; cate: string }) => {
  const response = await tokenInstance.get(`${marketUrl}/list?tradeId=${params.tradeId}&keyword=${params.keyword}&cate=${params.cate}`);
  return response.data;
};

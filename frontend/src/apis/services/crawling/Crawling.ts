import tokenInstance from '../../utils/tokenInstance';

export const getGovernmentSponsorList = async (params: { keyword: string; area: string; page: number; size: number }) => {
  const response = await tokenInstance.get(
    `/crawling/government?keyword=${params.keyword}&area=${params.area}&page=${params.page === 0 ? '' : params.page}&size=${params.size === 0 ? '' : params.size}`
  );
  return response.data;
};

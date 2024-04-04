import tokenInstance from '../utils/tokenInstance';

export const getDiaryList = async (params: { myCropId: string | null; startDate: string; finDate: string }) => {
  const response = await tokenInstance.get('common/diary/list', { params: params });
  return response.data;
};

export const getCropsSimple = async () => {
  const response = await tokenInstance.get('common/my-crops/simple');
  return response.data;
};

export const deleteDiary = async (diaryId: number) => {
  const response = await tokenInstance.delete(`common/diary/${diaryId}`);
  return response.data;
};

export const createDiary = async (params: {
  myCropsId: number;
  content: string;
  memo: string;
  image: string;
  date: string;
}) => {
  const response = await tokenInstance.post('common/diary', params);
  return response.data;
};

export const getLedgerList = async (params: { myCropsId: string | null; startDate: string; endDate: string }) => {
  const response = await tokenInstance.get('common/account-book', { params: params });
  return response.data;
};

export const getLedgerDetail = async (accountBookId: number) => {
  const response = await tokenInstance.get(`/common/account-book/${accountBookId}`);
  return response.data;
};

export const CreateLedger = async (params: {
  myCropsId: number;
  finance: string;
  title: string;
  content: string;
  amount: number;
  image: string;
  date: string;
}) => {
  const response = await tokenInstance.post('common/account-book', params);
  return response.data;
};

export const deleteLedger = async (accountBookId: number) => {
  const response = await tokenInstance.delete(`common/account-book/${accountBookId}`);
  return response.data;
};
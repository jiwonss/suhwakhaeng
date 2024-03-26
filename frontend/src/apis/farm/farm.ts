import tokenInstance from '../utils/tokenInstance';

const userUrl = 'diary';

export const getDiaryList = async (params: { myCropId: string | null; startDate: string; finDate: string }) => {
  const response = await tokenInstance.get(`${userUrl}/list`, { params: params });
  return response.data;
};

export const createDiary = async () => {
  const response = await tokenInstance.post(`${userUrl}`);
  return response.data;
};

export const deleteDiary = async (id: string) => {
  const response = await tokenInstance.delete(`${userUrl}/${id}`);
  return response.data;
};

// export const modifyUserInfo = async (params: {
//   profileImage: string;
//   nickname: string;
//   role: string;
//   profileContent: string;
//   sido: string;
//   gugun: string;
//   dong: string;
//   roadNameAddress: string;
// }) => {
//   const response = await tokenInstance.patch(`${userUrl}/my-profile`, params);
//   return response.data;
// };

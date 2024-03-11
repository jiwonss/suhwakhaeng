import instance from '../../utils/basicInstance';

const authUrl = '/auth';

// 사용 예시
export const userLogin = async (params: { id: string; password: string }) => {
  const response = await instance.post(`${authUrl}/login`, params);

  return response;
};

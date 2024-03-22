import instance from '../../utils/basicInstance';
import tokenInstance from '../../utils/tokenInstance';

const authUrl = 'common/oauth';
const oauthServerType = 'KAKAO';

// 사용 예시
export const userLogin = async (params: { token: string }) => {
  const response = await instance.post(`${authUrl}/${oauthServerType}/login`, params);
  return response.data;
};

const userUrl = 'common/users';

export const getUserInfo = async () => {
  const response = await tokenInstance.get(`${userUrl}/my-profile`);
  return response.data;
};

export const reIssueToken = async (params: { accessToken: string; refreshToken: string }) => {
  const response = await instance.post(`${authUrl}/reissue`, params);
  return response.data;
};

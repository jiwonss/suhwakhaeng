import instance from '../../utils/basicInstance';
import tokenInstance from '../../utils/tokenInstance';

const authUrl = 'common/oauth';
const oauthServerType = 'KAKAO';

// 사용 예시
export const userLogin = async (params: { oauthToken: string; deviceToken: string }) => {
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

export const modifyUserInfo = async (params: {
  profileImage: string;
  nickname: string;
  role: string;
  profileContent: string;
  sido: string;
  gugun: string;
  dong: string;
  roadNameAddress: string;
}) => {
  const response = await tokenInstance.patch(`${userUrl}/my-profile`, params);
  return response.data;
};

export const registBusinessCert = async (params: { businessImage: string }) => {
  const response = await tokenInstance.post(`${userUrl}/business`, params);
  return response.data;
};

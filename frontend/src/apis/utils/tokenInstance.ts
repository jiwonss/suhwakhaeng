import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { getTokens, setTokens } from '../../util/TokenUtil';

const BASE_URL = 'http://10.0.2.2:8000/';

export const tokenInstance = axios.create({
  baseURL: `${BASE_URL}`,
});

const setCommonHeaders = async (config: any) => {
  // console.log(`Bearer ${await EncryptedStorage.getItem('accessToken')}`);
  config.headers['Content-Type'] = 'application/json';
  config.headers['Authorization'] = `Bearer ${await EncryptedStorage.getItem('accessToken')}`;
  return config;
};

const reIssueAccessTokenAndRetry = async (config: AxiosRequestConfig) => {
  const tokenData = getTokens();
  try {
    const response = await axios.post(`${BASE_URL}/common/reissue`, tokenData, { headers: { 'Content-Type': 'application/json' } });
    if (response.status === 201) {
      // const newAccessToken = response.data.dataBody.accessToken;
      // const newRefreshToken = response.datsa.dataBody.refreshToken;

      setTokens(response.data.dataBody);
    }
  } catch {}
};

// const handleResponseError = async (error: AxiosError) => {
//   if (!error.response) return Promise.reject(error);
//   const { status, data } = error.response as { status: number; data: any };
//   console.log('status :', status, data);

//   switch (status) {
//     case 400:
//       // alert('이미 매칭에 참여 중입니다');
//       break;
//     case 401:
//     // TODO
//     // 로그아웃 로직타기
//     case 500:
//       alert('시스템 에러, 관리자에게 문의 바랍니다.');
//       break;
//     default:
//       console.error(error);
//       return Promise.reject(error);
//   }
// };

// const handleResponseSuccess = (response: AxiosResponse<any>) => {
//   console.log('Success response: ' + response.config.url);
//   return response;
// };

const handleRequestError = (error: AxiosError) => {
  console.error('handleRequestError :', error);
  return Promise.reject(error);
};

tokenInstance.interceptors.request.use(setCommonHeaders, handleRequestError);
// tokenInstance.interceptors.response.use(handleResponseSuccess, handleResponseError);

export default tokenInstance;

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { getTokens, removeTokens, setTokens } from '../../util/TokenUtil';
import { useRecoilState } from 'recoil';
import { tokenState } from '../../recoil/atoms/tokenState';
import { getUserInfo, userLogout } from '../services/user/user';

// const BASE_URL = 'http://10.0.2.2:8000/';
const BASE_URL = 'http://13.209.182.136:8000/';

export const tokenInstance = axios.create({
  baseURL: `${BASE_URL}`,
});

const setCommonHeaders = async (config: any) => {
  config.headers['Content-Type'] = 'application/json';
  config.headers['Authorization'] = `Bearer ${await EncryptedStorage.getItem('accessToken')}`;
  // config.headers['Authorization'] =
  // `Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3MTE2NzY2OTQsImV4cCI6MTcxNDI2ODY5NH0.VD8eH7ZmfDRoyxAlXcrK9kJCU_uSuJRLyeZDVk5JQOsYFNiAZgW39ioCfgjNUiKst1KOJiybLtZPX4nPIOP_xQ`;
  return config;
};

const reIssueAccessTokenAndRetry = async (config: AxiosRequestConfig) => {
  const tokenData = await getTokens();
  const deviceToken = await EncryptedStorage.getItem('deviceToken');
  // 1. 재발급 시도
  if (tokenData.accessToken && tokenData.refreshToken && deviceToken) {
    const response = await axios.post(`http://13.209.182.136:8000/common/oauth/reissue`, tokenData);
    console.log('재발급 응답: ', response.data);
    // 2-1. 리프레시 토큰 역시 실패
    if (response.data.dataHeader.successCode === 1) {
      console.log('토큰 재발급 실패');
      alert('토큰 갱신에 실패했습니다. 다시 로그인 해주세요.');
      // userLogout({ refreshToken: tokenData.refreshToken, deviceToken: deviceToken });
      removeTokens();
    }
    // 2-2. 리프레시 토큰 성공
    else if (response.data.dataHeader.successCode === 0) {
      setTokens(response.data.dataBody); // 토큰 재 세팅
      const newConfig: AxiosRequestConfig = {
        ...config,
        headers: { ...config.headers, Authorization: `Bearer ${response.data.dataBody.accessToken}` },
      };
      return tokenInstance(newConfig);
    }
  }
};

const handleResponseError = async (error: AxiosError) => {
  if (!error.response) return Promise.reject(error);
  const { status, config } = error.response;
  console.log('status :', status);

  switch (status) {
    case 400:
      break;
    case 401:
      return await reIssueAccessTokenAndRetry(config);
    case 500:
      // alert('관리자에게 문의 바랍니다.');
      break;
    default:
      console.error(error);
      return Promise.reject(error);
  }
};

const handleResponseSuccess = (response: AxiosResponse<any>) => {
  console.log('Success response: ' + response.config.url);
  return response;
};

const handleRequestError = (error: AxiosError) => {
  console.error('handleRequestError :', error);
  return Promise.reject(error);
};

tokenInstance.interceptors.request.use(setCommonHeaders, handleRequestError);
tokenInstance.interceptors.response.use(handleResponseSuccess, handleResponseError);

export default tokenInstance;

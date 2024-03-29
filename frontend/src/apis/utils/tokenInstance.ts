import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { getTokens, removeTokens, setTokens } from '../../util/TokenUtil';

const BASE_URL = 'http://10.0.2.2:8000/';
// const BASE_URL = 'http://13.209.182.136:8000/';

export const tokenInstance = axios.create({
  baseURL: `${BASE_URL}`,
});

const setCommonHeaders = async (config: any) => {
  config.headers['Content-Type'] = 'application/json';
  // config.headers['Authorization'] = `Bearer ${await EncryptedStorage.getItem('accessToken')}`;
  config.headers['Authorization'] =
    `Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIxIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3MTE2NzY2OTQsImV4cCI6MTcxNDI2ODY5NH0.VD8eH7ZmfDRoyxAlXcrK9kJCU_uSuJRLyeZDVk5JQOsYFNiAZgW39ioCfgjNUiKst1KOJiybLtZPX4nPIOP_xQ`;
  return config;
};

const reIssueAccessTokenAndRetry = async (config: AxiosRequestConfig) => {
  const tokenData = getTokens();
  try {
    const response = await axios.post(`${BASE_URL}/common/reissue`, tokenData, { headers: { 'Content-Type': 'application/json' } });
    if (response.status === 201) {
      setTokens(response.data.dataBody); // 토큰 재 세팅
      axios(config); // 재요청
    }
    console.error('reIssueAccessTokenAndRetry error: ', response);
    return Promise.reject(response);
  } catch (error: any) {
    console.error(error.response.data);
    if (error.response.status === 401) {
      alert('토큰 갱신에 실패했습니다. 다시 로그인 해주세요.');
      removeTokens();
      return Promise.reject(error);
    }
  }
};

const handleResponseError = async (error: AxiosError) => {
  if (!error.response) return Promise.reject(error);
  const { status, config } = error.response;
  console.log('status :', status);

  switch (status) {
    case 400:
      // alert('이미 매칭에 참여 중입니다');
      break;
    case 401:
      return await reIssueAccessTokenAndRetry(config);

    case 500:
      alert('관리자에게 문의 바랍니다.');
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
